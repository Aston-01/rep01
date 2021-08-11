<template>
<!--pages/mine/setup.wxml-->
<div class="set-wrap">
    <div class="top-info">
        <div class="line">
            <span>登录账号</span>
            <div class="info" readonly>{{userPhone}}</div>
        </div>
        <div class="line">
            <span>昵称</span>
        <van-field type="text" v-model="username" placeholder="请输入昵称"></van-field>
        </div>
        <div class="line"><span>头像</span>
            <div>
                <van-uploader v-model="fileList" :after-read="afterRead" :max-count="1"/>
            </div>
        </div>
    </div>
    <div class="bottom-info">
        <div class="line"><span>归属街道</span>
            <!-- <van-picker label="归属街道" class="pick-wrap" bindchange="bindPickerChange" value="{{id}}" range="{{objectArray}}" range-key="name"> -->
                <!-- <div class="picker">
                    {{objectArray[index].name}}
                </div> -->
            <!-- </van-picker> -->
            <van-field
                readonly
                clickable
                :value="streetValue"
                :placeholder="objectList1[index1]"
                @click="showPicker1 = true"
            />
            <van-popup v-model="showPicker1" round position="bottom">
                <van-picker show-toolbar :columns="objectList1" @cancel="showPicker1 = false" @confirm="onConfirm1" />
            </van-popup>
        </div>
        <div class="line" ><span>学历</span>
            <!-- <picker class="pick-wrap" bindchange="bindPickerChange2" value="{{id}}" range="{{objectArray2}}" range-key="name">
                <div class="picker">
                    {{objectArray2[index2].name}}
                </div>
            </picker> -->
            <van-field
                readonly
                clickable
                :value="educationValue"
                :placeholder="objectList2[index2]"
                @click="showPicker2 = true"
            />
            <van-popup v-model="showPicker2" round position="bottom">
                <van-picker show-toolbar :columns="objectList2" @cancel="showPicker2 = false" @confirm="onConfirm2" />
            </van-popup>
        </div>
        <div class="line"><span>党员</span>
            <van-switch v-model="switch1Checked" />
        </div>
    </div>

    <van-button class="confirmbtn" @click="submit">确定</van-button>
</div>
</template>

<script>
import { Uploader,Popup,Picker} from 'vant';
import * as api from "@/api/content";
import * as common from "@/api/common";
import { Toast } from 'vant';
export default {
    created(){
        this.getStreet('110');
        this.getEducation();
        this.getSetInfo();
    },
    components:{
        [Uploader.name]:Uploader,
        [Popup.name]:Popup,
        [Picker.name]:Picker,
    },
    data() {
        return {
            userPhone:"",
            username:"",
            userLogo:"",
            switch1Checked: false,
            backIdCardCorrect:false,
            fileList:[{url:''}],
            objectArray1: [],
            objectArray2: [],
            objectList1:[],
            objectList2:[],
            index1:'',
            index2:'',
            showPicker1:false,
            showPicker2:false,
            streetValue:"",
            educationValue:"",
        }
    },
    methods:{
        putList(array,list){
            for(let i = 0;i<array.length;i++){
                list[i] = array[i].name;
            }
        },
        getStreet(id){
            var that = this;
            var data={name:'street',id:id};
            api.getStreet(data).then((res) => {
                // console.log(res);
                for(let i=0;i<res.length;i++){
                    that.objectArray1[i] = res[i];
                }
                that.putList(that.objectArray1,that.objectList1);
            })
        },
        getEducation(){
            var that=this;
            var data={name:'education_type',id:'sys_dict_data'};
            common.getEducation(data).then((res) => {
            // console.log(res);
                for(let i=0;i<res.length;i++){
                    that.objectArray2[i] = res[i];
                }
                that.putList(that.objectArray2,that.objectList2);
            })
        },
        getSetInfo(){
            var that=this;
            var data={};
            api.getInfo(data).then((res) => {
            // console.log(res);
            if(res.code == 200){

                if('1'==res.data.isParty){
                    that.switch1Checked=true
                }
                for(var i=0;i<that.objectArray1.length;i++){
                    if(res.data.deptId==that.objectArray1[i].id){
                        that.index1 = i;
                    }
                }
                for(var j=0;j<that.objectArray2.length;j++){
                    if(res.data.userEducation==that.objectArray2[j].id){
                        that.index2 = j;
                    }
                }
                that.username=res.data.userName;
                that.userPhone=res.data.userPhone;
                that.fileList[0].url=res.data.userLogo;
            }else{
                Toast(res.msg);
            }
            })
        },
        afterRead(file){
            console.log(file);
        },
        
        submit(){
            this.$router.push({
                path:'/mine',
            });
        },
        onConfirm1(value){
            this.streetValue = value;
            this.showPicker1 = false;
        },
        onConfirm2(value){
            this.educationValue = value;
            this.showPicker2 = false;
        }
    }
}
</script>

<style scoped>
/* pages/mine/setup.wxss */
page {
    background: #f7f7f7;
}

.pick-wrap {
    width: 60%;
}

.top-info,
.bottom-info {
    background: #fff;
    width: 90%;
    padding: .30rem .20rem;
    margin: .20rem auto;
    border-radius: .10rem;
}

.confirmbtn:not([size='mini']) {
    background-color: #1769f5;
    color: #fff;
    margin-top: .70rem;
    width: 90%;
    margin: .70rem auto 0;
    height: .82rem;
    display: block;
}

.line {
    display: flex;
    /* height: .70rem; */
    align-items: center;
    border-bottom: 1px solid #efefef;
    justify-content: flex-start;
    padding: .20rem 0;
}

.line span {
    width: 30%;
    font-size: .26rem;
    color: #2a272e;
}

.line:last-child {
    border-bottom: none;
    height: auto;
}

.upload {
    width: 1.73rem;
    height: 1.71rem;
    background: url(https://red.manbu.xyz/red/upload.png);
    background-size: 1.73rem 1.71rem;
}

.info,
.line picker {
    color: #c0c0c0;
    font-size: .26rem;
}
.van-cell{
    padding: 0;
}
</style>
