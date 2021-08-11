<template>
<!--pages/active/activeDetail.wxml-->
<div>
    <div class="venue">
        <div class="banner">
            <img :src="activeArray.headimg" />
        </div>
        <div class="content">
            <div class="brief">
                <div class="line border-bottom">
                    <div class="left">
                        <div class="name">{{activeArray.title}}</div>
                        <div class="info-group">
                            <div>活动时间：{{activeArray.actBeginTimeString}}</div>
                            <div class="ml">报名人数：{{activeArray.nowNumLimit}}/{{activeArray.entryNumLimit}}</div>
                        </div>
                        <div class="info-group">
                            <div>报名时间：{{activeArray.entryBeginTimeString}}</div>
                        </div>
                    </div>
                    <div class='split'></div>
                    <div class="grade small" v-if="activeArray.score==null"><span>暂无评分</span></div>
                    <div class="grade" v-else><span>{{activeArray.score}}</span>分</div>
                </div>
                <div class="line">
                    <div class="address">{{activeArray.address}}</div>
                    <div class="location" bindtap="openLocation">
                        <div class="location-icon"></div>
                        <div class="address-info">距离您{{activeArray.distance}}km ></div>
                    </div>
                </div>
            </div>

            <div class="introduce">
                <div class="title">活动详情</div>
                <div class="detail">{{activeArray.content}}</div>
                <div class="contact">
                    <div class="person">
                        <div class="person-icon"></div>
                        <div>联系人：{{activeArray.contactPerson}}</div>
                    </div>
                    <div class="call">
                        <div class="call-icon"></div>
                        <div bindtap="callContact" :data-phone="activeArray.contactPhone">联系电话：{{activeArray.contactPhone}}</div>
                    </div>
                </div>

            </div>
            <div class="judge">
                <div class="title">活动评价</div>
                <div class="judge-item" v-for="(item,index) in PjArray" :key="index">
                    <div class="line">
                        <div class="left">
                            <div class="avater">
                                <img :src="item.userLogo" />
                            </div>
                            <div class="info">
                                <div class="name">{{item.userName}}</div>
                                <div class="time">{{item.commentTime}}</div>
                            </div>
                        </div>
                        <div class="right">
                            <div class="star-group">
                                <div v-if="item.commentNumber>0" class="star"></div>
                                <div v-else class="unstar">
                                </div>
                                <div v-if="item.commentNumber>1" class="star"></div>
                                <div v-else class="unstar">
                                </div>
                                <div v-if="item.commentNumber>2" class="star"></div>
                                <div v-else class="unstar">
                                </div>
                                <div v-if="item.commentNumber>3" class="star"></div>
                                <div v-else class="unstar">
                                </div>
                                <div v-if="item.commentNumber>4" class="star"></div>
                                <div v-else class="unstar">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="text">{{item.commentContent}}</div>
                    <div class="reback" v-if="item.commentResp">
                        <div class="recall-icon"></div>
                        <div class="info">{{item.commentResp}}</div>
                    </div>
                </div>
            </div>

            <div class="registration-list">
                <div class="title">报名人员</div>
                <div class="list">
                    <div class="grid" v-for="(item2,index) in bmNUmArray" :key="index">
                        <div class="avater" v-if="item2.userLogo!=''&&item2.userLogo!=null">
                            <img :src="item2.userLogo" />
                        </div>
                        <div v-else>
                            <div class="avater">
                                <img src="https://red.manbu.xyz/red/avater.png" />
                            </div>
                        </div>
                        <div class="name">{{item2.userName||item2.wxUserName}}</div>
                    </div>
                </div>
            </div>
            <div class="bottom-fixed" v-if="operName=='立即报名'">
                <van-button class="confirm-btn" @click="Bmnow">{{operName}}</van-button>
            </div>
            <div class="bottom-fixed" v-else>
                <van-button style="background:#BFBDC4" class="confirm-btn">{{operName}}</van-button>
            </div>

        </div>
    </div>

    <div class="confirm-modal" v-if="Bmten=='1'">
        <div class="confirm-content">
            <div class="title">报名信息</div>
            <div class="line">
                <div class="left">
                    <div class="icon1"></div>
                    <span>姓名</span>
                </div>
                <van-field type="text" style="color:#000;" class="input" v-model="joinName" placeholder="请输入姓名" />
            </div>
            <div class="line" style="margin-bottom:.20rem">
                <div class="left">
                    <div class="icon2"></div>
                    <span>联系方式</span>
                </div>
                <van-field type="text" class="input" v-model="joinPhone" bindinput="changePhone" placeholder="请输入联系电话" maxlength="11" />
            </div>

            <div v-if="ques">
                <van-button class="confirm-btn" @click="submit">确定</van-button>
            </div>
            <div v-else>
                <van-button class="confirm-btn" style="background:#BFBDC4">确定</van-button>
            </div>

            <div class="close" @click="closeHandler"></div>
        </div>
    </div>
</div>
</template>

<script>
import {
    Button, Toast
} from "vant";
import * as api from "@/api/content";
// import * as common from "@/api/common";

export default {
    data() {
        return {
            activeArray: {},
            la: 0,
            lo: 0,
            Bmten: '0',
            bmNUmArray: [],
            PjArray: [],
            joinName: "",
            joinPhone: "",
            operName: "立即报名",
            ques: true,
        }
    },
    components: {
        [Button.name]: Button
    },
    created() {
        let routerData = this.$route.params;
        console.log('活动信息', routerData);
        console.log(routerData.id);
        var ssx = this;

        ssx.getActive(routerData.id);
        ssx.getactivejoin(routerData.id);
        ssx.getactivecomment(routerData.id);
        ssx.getActiveCheck(routerData.id);
    },
    methods: {
        getActiveCheck: function (id) {
            var xxs = this;
            var data = {
                id: id
            };
            api.activeCheck(data).then((res) => {
                console.log(res);
                xxs.operName = res.msg;
            })
        },
        getActive: function (id) {
            var xxs = this;

            var data = {
                id: id,
                la: this.la,
                lo: this.lo
            };
            api.getActivity(data).then((res) => {
                console.log(res, "000000");
                if (res.data.length > 0) {
                    xxs.activeArray = res.data[0]
                }
            })
        },
        getactivejoin: function (id) {
            var xxs = this;

            var data = {
                activityId: id
            };
            api.activejoin(data).then((res) => {
                console.log(res, '报名----');
                xxs.bmNUmArray = res.data;
            })
        },
        getactivecomment: function (id) {
            var xxs = this;

            var data = {
                activityId: id
            };
            api.activecomment(data).then((res) => {
                xxs.PjArray = res.data;
            })
        },

        Bmnow() {
            this.Bmten = '1'
        },
        submit() {
            this.ques = false;
            var xxs = this;
            
            if (this.joinName == "" || this.joinName == null) {
                Toast('请输入姓名')
                xxs.ques=true;
                return false;
            }
            if (this.joinPhone == "" || this.joinPhone == null) {
                Toast('联系电话为空');
                
                xxs.ques=true;
                return false;
            }

            var data = {
                activityId: this.activeArray.id,
                deptId: this.activeArray.streetId,
                joinName: this.joinName,
                joinPhone: this.joinPhone
            };
            api.addActive(data).then((res) => {
                console.log(res);
                if (res.code == 200) {
                    Toast('报名成功')
                    setTimeout(function () {
                        console.log('跳转---------')
                    }, 2000)
                } else {
                    Toast(res.msg);
                    
                    this.ques=true;
                    
                }
            })
        },
        closeHandler() {
            this.Bmten = '0'
        }
    }
}
</script>

<style scoped>
/* pages/active/activeDetail.wxss */
.venue {
    background-color: #f4f4f4;
    font-size: .24rem;
    padding-bottom: 1.50rem;
}

.star-group {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin: 0 .10rem;
    width: 100%;
}

.star {
    width: .35rem;
    height: .35rem;
    background: url(https://red.manbu.xyz/red//star-full.png) no-repeat center center;
    background-size: .35rem .35rem;
    margin: 0 .06rem;
}

.unstar {
    width: .35rem;
    height: .35rem;
    background: url(https://red.manbu.xyz/red/star-grey.png) no-repeat center center;
    background-size: .35rem .35rem;
    margin: 0 .10rem;
}

.location-icon {
    width: .18rem;
    height: .26rem;
    background: url(https://red.manbu.xyz/red/v-location.png);
    background-size: .18rem .26rem;
    margin-right: .10rem;
}

.phone-icon {
    width: .18rem;
    height: .26rem;
    background: url(https://red.manbu.xyz/red/v-location.png);
    background-size: .18rem .26rem;
    margin-right: .10rem;
}

.phone-icon {
    width: .23rem;
    height: .22rem;
    background: url(https://red.manbu.xyz/red/v-phone.png);
    background-size: .23rem .22rem;
    margin-right: .10rem;
}

.call-icon {
    width: .23rem;
    height: .22rem;
    background: url(https://red.manbu.xyz/red/v-phone.png);
    background-size: .23rem .22rem;
    margin-right: .10rem;
}

.person-icon {
    width: .21rem;
    height: .20rem;
    background: url(https://red.manbu.xyz/red/v-user.png);
    background-size: .21rem .20rem;
    margin-right: .10rem;
}

.recall-icon {
    width: .25rem;
    height: .20rem;
    background: url(https://red.manbu.xyz/red/v-recall.png) no-repeat center center;
    background-size: .25rem .20rem;
    margin-right: .20rem;
    position: relative;
    top: .10rem;
}

.banner {
    width: 100%;
}

.banner img {
    width: 100%;
    height: 3.56rem;
}

.brief,
.introduce,
.judge,
.registration-list {
    background-color: #fff;
    width: 96%;
    margin: 0 auto .16rem;
    padding: .20rem;
    border-radius: .20rem;
    box-sizing: border-box;
    position: relative;
}

.brief {
    margin-top: -1.00rem;
}

.ml {
    margin-left: .10rem;
}

.line {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: .10rem 0;
}

.line .name {
    color: #000;
    font-size: .26rem;
    padding: .10rem 0;
    font-weight: bold;
}

.line .name2 {
    color: #000;
    font-size: .26rem;
    padding: .06rem .10rem;
    border-radius: .20rem;
    margin: .10rem 0;
}

.line .time {
    color: #2A272E;
    font-size: .24rem;
}

.line .info-group {
    background-color: #FEF8EC;
    display: flex;
    flex-direction: row;
    padding: .06rem .10rem;
    border-radius: .20rem;
    margin: .10rem 0;
}

.address {
    color: #2A272E;
    flex: 1;
}

.location {
    display: flex;
    flex-direction: row;
    font-size: .18rem;
    align-items: center;
}

.grade {
    color: #F78E32;
}

.grade span {
    font-size: .32rem;
    font-weight: bold;
}

.detail {
    color: #2A272E;
    padding: .20rem 0;
}

.contact {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border: .01rem solid #DCDCDC;
    border-radius: .10rem;
    padding: .10rem .14rem;
}

.contact div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    color: #2A272E;
}

.judge-item .left {
    display: flex;
    flex-direction: row;
    width: 66%;
}

.judge-item .right {
    width: 34%;
}

.left .info .name {
    color: #000;
    font-size: .24rem;
}

.avater img {
    width: .80rem;
    height: .80rem;
}

.left .info {
    margin-left: .10rem;
}

.left .time {
    color: #2A272E;
    font-size: .22rem;
}

.reback {
    display: flex;
    flex-direction: row;
    background: #F7F7F7;
    padding: .20rem;
    align-items: flex-start;
    margin-top: .10rem;
}

.reback .info {
    width: 90%;
}

.registration-list .list {
    display: flex;
    text-align: center;
    padding: 0 .15rem .15rem;
    flex-wrap: wrap;
}

.registration-list img {
    width: .90rem;
    height: .90rem;
    border-radius: 50%;
}

.registration-list .grid {
    width: 20%;
    margin-top: .20rem;
}

.registration-list .name {
    color: #2A272E;
    margin-top: .10rem;
}

.confirm-modal {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
}

.confirm-content {
    width: 70%;
    margin: 0 auto;
    background-color: #fff;
    border-radius: .30rem;
    padding: .30rem;
    position: relative;
}

.title {
    color: #000;
    font-size: .28rem;
    font-weight: bold;
    /* text-align: center; */
}

.confirm-content .line {
    height: .90rem;
    border-bottom: 1px solid #e5e5e5;
}

.confirm-content span {
    color: #9a9a9a;
    font-size: .24rem;
}

.confirm-content .input {
    color: #000;
    font-size: .24rem;
    width: 70%;
}

.icon1 {
    width: .40rem;
    height: .31rem;
    background: url(https://red.manbu.xyz/red/alert-icon1.png);
    background-size: .40rem .31rem;
    margin-right: .10rem;
}

.icon2 {
    width: .40rem;
    height: .31rem;
    background: url(https://red.manbu.xyz/red/alert-icon2.png);
    background-size: .40rem .31rem;
    margin-right: .10rem;
}

.close {
    width: .30rem;
    height: .31rem;
    background: url(https://red.manbu.xyz/red/close.png);
    background-size: .30rem .31rem;
    margin-right: .10rem;
    position: absolute;
    right: .30rem;
    top: .30rem;
}

.confirm-content .left {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.confirm-modal .confirm-btn:not([size='mini']) {
    position: relative;
    bottom: 0;

}

.confirm-btn {
    background-color: #1769f5;
    color: #fff;
    width: 90%;
    margin: 0 auto;
    display: block;
    font-size: 0.24rem;
    height: .82rem;
}

.border-bottom {
    border-bottom: 1px solid rgba(238, 238, 238, 1);
}

.split {
    height: .60rem;
    width: 2px;
    background: rgba(238, 238, 238, 1);
}

.van-field {
    background: none;
}

.input .van-field__control {
    color: #000 !important;
}
</style>
