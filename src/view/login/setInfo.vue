<template>
<div class="setinfo-container">
    <div class="main">
        <div class="line">
            <span>归属街道</span>

            <van-field readonly clickable :value="value" placeholder="选择归属街道" @click="showPicker = true" />
            <van-popup v-model="showPicker" round position="bottom">
                <van-picker show-toolbar :columns="objectArray" @cancel="showPicker = false" @confirm="bindPickerChange" />
            </van-popup>
        </div>
        <div class="line">
            <span>学历</span>
            <van-field readonly clickable :value="value2" placeholder="选择学历" @click="showPicker2 = true" />
            <van-popup v-model="showPicker2" round position="bottom">
                <van-picker show-toolbar :columns="objectArray2" @cancel="showPicker2 = false" @confirm="bindPickerChange2" />
            </van-popup>
        </div>
        <div class="line">
            <span>是否党员</span>
            <van-switch v-model="switch1Checked" size="20" />
            <!-- <switch color="#1989fa" checked="{{switch1Checked}}" bindchange="switch1Change" /> -->
        </div>
    </div>
    <div class="label-warp">
        <div class="title">选择你感兴趣的活动标签</div>
        <div class="title-small">根据您的喜好为您推荐专属活动</div>
        <div class="label-list">
            <div class="label" v-for="(itemName,key,index) in signList" @click="pickLabel(itemName)" v-bind:key="index">
                <div>{{itemName.name}}</div>
                <div v-if="itemName.selected" class="selecked"></div>
            </div>
        </div>
    </div>
    <div class="bottom-fixed">
        <van-button class="confirm-btn" @click="submitInfo">进入主页</van-button>
    </div>
</div>
</template>

<script>
import * as common from "@/api/common";
import {
    Local
} from '@/utils/storage';
import {
    formatTime
} from '@/utils/utils';
import {
    Toast
} from 'vant';

export default {
    data() {
        return {
            labelNumber: 0,
            objectArray: [],
            index: 0,
            objectArray2: [],
            index2: 0,
            signList: [],
            switch1Checked: false,
            avatarUrl: "https://red.manbu.xyz/red/avater.png",
            nickName: "",
            showPicker: false,
            showPicker2: false,
            value: '',
            value2: '',
        };
    },
    mounted() {
        this.getStreet(110);
        this.getEducation();
    },
    methods: {
        pickLabel(e) {
            console.log(e, "000000");
            let id = e.id;
            let num = this.labelNumber;
            // console.log(id);
            let signList = this.signList;
            for (var i = 0; i < signList.length; i++) {
                if (signList[i].id == id) {
                    console.log(signList[i]);
                    if (signList[i].selected != true) {
                        signList[i].selected = true;
                        num++;
                    } else {
                        signList[i].selected = false;
                        num--;
                    }
                }
            }
            this.labelNumber = num;

        },
        submitInfo() {
            var demandIds = '';
            var signList = this.signList;
            for (var i = 0; i < signList.length; i++) {
                if (signList[i].selected == true) {
                    demandIds += signList[i].id + ","
                }
            }
            demandIds = demandIds.substr(0, demandIds.length - 1)
            var data = {
                deptId: this.objectArray[this.index].id,
                userEducation: this.objectArray2[this.index2].id,
                isParty: this.switch1Checked == true ? 1 : 0,
                demandIds: demandIds,
                userPhone: Local.get('userPhone'),
                userLogo: this.avatarUrl,
                userName: this.nickName,
                timestamp: formatTime(new Date())
            }
            var index2 = this.value2;
            if (0 == index2) {
                Toast(" 请选择学历")
                return;
            }
            var num = this.labelNumber;
            if (0 == num) {
                Toast("请至少选择一个标签")
                return;
            }
            common.register(data).then(res => {
               
                Local.set('token', res.msg)
                this.$router.push("/index");
            });
        },
        getStreet(id) {
            var reqParam = {
                name: "street",
                id: id
            };
            common.getStreet(reqParam).then(res => {
                let arr = res;
                arr.forEach(element => {
                    element.text = element.name
                });
                this.objectArray = arr;
            });
        },
        getEducation() {
            var reqParam = {
                name: 'education_type',
                id: 'sys_dict_data'
            };
            common.getEducation(reqParam).then(res => {
                let arr = res;
                arr.forEach(element => {
                    element.text = element.name
                });
                this.objectArray2 = arr;
            });
        },
        getDemand: function (id) {

            var reqParam = {
                name: 'demand',
                id: id
            };
            common.getStreet(reqParam).then(res => {
                this.signList = res
                console.log(res);
            });
        },
        bindPickerChange(e) {
            this.showPicker = false;
            this.value = e.name;
            this.labelNumber = 0;
            this.getDemand(e.id);
        },
        bindPickerChange2(e) {
            this.showPicker2 = false;
            this.value2 = e.name;
        },
    }
};
</script>

<style>
.pick-wrap {
    width: 60%;
}

.setinfo-container {
    padding: 0.15rem;
    background: #f7f7f7;
}

.main {
    background: #fff;
    padding: 0.2rem;
    border-radius: 0.1rem;
}

.label-warp {
    padding: 0.2rem;
    background-color: #fff;
    margin-top: 0.3rem;
    border-radius: 0.1rem;
}

.main .line {
    height: 0.7rem;
    line-height: 0.7rem;
    border-bottom: 1px solid #efefef;
}

.confirm-btn {
    margin: 0 auto;
    display: block;
    background: #1769f5;
    color: #fff;
}

.line {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.line span {
    color: #2a272e;
    font-size: 0.26rem;
}

.label-warp .title {
    font-size: 0.26rem;
    color: #2a272e;
}

.label-warp .title-small {
    font-size: 0.26rem;
    color: rgba(42, 39, 46, 0.2);
}

.label-warp .label-list {
    width: 100%;
    height: 6rem;
}

picker {
    color: #c0c0c0;
    font-size: 0.26rem;
}

.label-list {
    position: relative;
}

.label {
    width: 1.6rem;
    height: 1.6rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: url(https://red.manbu.xyz/red/bg.png) no-repeat center center;
    background-size: 100% 100%;
    position: absolute;
    left: 0.3rem;
    top: 0.3rem;
    color: #fff;
    font-size: 0.3rem;
    font-weight: bold;
}

.label.id0 {
    background: url(https://red.manbu.xyz/red/bg_new.png) no-repeat center center;
    left: 2.48rem;
    top: 2.31rem;
    transform: scale(1.1);
}

.id1 {
    background: url(https://red.manbu.xyz/red/bg6.png) no-repeat center center;
    left: 3.95rem;
    top: 1.82rem;
    transform: scale(0.8);
}

.id2 {
    background: url(https://red.manbu.xyz/red/bg3.png) no-repeat center center;
    left: 1.2rem;
    top: 1.26rem;
    transform: scale(0.8);
}

.id3 {
    background: url(https://red.manbu.xyz/red/bg.png) no-repeat center center;
    left: 2.57rem;
    right: 0.66rem;
    transform: scale(1);
}

.id4 {
    background: url(https://red.manbu.xyz/red/bg5.png) no-repeat center center;
    left: 4.12rem;
    top: 3.23rem;
    transform: scale(0.6);
}

.id5 {
    background: url(https://red.manbu.xyz/red/bg7.png) no-repeat center center;
    left: 1.23rem;
    top: 3.47rem;
    transform: scale(0.9);
}

.id6 {
    background: url(https://red.manbu.xyz/red/bg.png) no-repeat center center;
    left: 3.08rem;
    top: 4.02rem;
    transform: scale(0.8);
}

.id7 {
    background: url(https://red.manbu.xyz/red/bg6.png) no-repeat center center;
    left: 0.06rem;
    top: 2.42rem;
    transform: scale(0.9);
}

.id8 {
    background: url(https://red.manbu.xyz/red/bg5.png) no-repeat center center;
    left: 5.32rem;
    top: 2.84rem;
    transform: scale(0.7);
}

.id9 {
    background: url(https://red.manbu.xyz/red/bg7.png) no-repeat center center;
    left: 4.33rem;
    top: 4.4rem;
    transform: scale(0.7);
}

.id10 {
    background: url(https://red.manbu.xyz/red/bg6.png) no-repeat center center;
    left: 5.54rem;
    top: 4.1rem;
    transform: scale(0.8);
}

.id11 {
    background: url(https://red.manbu.xyz/red/bg5.png) no-repeat center center;
    left: 0rem;
    top: 0.6rem;
    transform: scale(0.6);
}

.id12 {
    background: url(https://red.manbu.xyz/red/bg3.png) no-repeat center center;
    left: 1.56rem;
    top: 4.62rem;
    transform: scale(0.6);
}

.id13 {
    background: url(https://red.manbu.xyz/red/bg5.png) no-repeat center center;
    left: 5.57rem;
    top: 1.6rem;
    transform: scale(0.7);
}

.id14 {
    background: url(https://red.manbu.xyz/red/bg7.png) no-repeat center center;
    left: 4.4rem;
    top: 0.3rem;
    transform: scale(0.7);
}

.id15 {
    background: url(https://red.manbu.xyz/red/bg7.png) no-repeat center center;
    left: 0;
    top: 4.4rem;
    transform: scale(0.7);
}

.id16 {
    background: url(https://red.manbu.xyz/red/bg6.png) no-repeat center center;
    left: 5.6rem;
    top: 0;
    transform: scale(0.7);
}

.selecked {
    width: 0.3rem;
    height: 0.3rem;
    background-image: url(https://red.manbu.xyz/red/tick.png);
    background-size: 0.3rem 0.3rem;
    position: absolute;
    bottom: 0;
    left: 50%;
    margin-left: -0.15rem;
}

.van-cell {
    padding: 0;
}

.van-field {
    width: 60%;
}
</style>
