<template>
<div class="container">
    <div class="search-wrap">
        <div class="p-r">
            <van-field readonly class="input-index" clickable :label="streetValue" :value="streetValue" placeholder="选择街道" @click="showPicker = true" />
            <van-popup v-model="showPicker" round position="bottom">
                <van-picker show-toolbar :columns="objectArray" @cancel="showPicker = false" @confirm="onConfirm" />
            </van-popup>

            <div class="down-arrow"></div>
        </div>

        <div class="search-box">
            <div class="search-icon"></div>
            <!-- <input class="weui-input" placeholder-style="color:#90949f;font-size:24rpx;" placeholder="输入搜索内容" readonly="goSearch"/> -->
            <van-field class="weui-input" @click="goSearch" />
            <div class="search-btn" @click="goSearch">搜索</div>
        </div>
    </div>
    <div class="page-section page-section-spacing swiper">
        <van-swipe class='swiper' :autoplay="3000">
            <van-swipe-item v-for="(image, index) in background" :key="index" @click="goDirect">
                <div class="swiper-item">
                    <img class="swiper-img" :src="image.image" />
                </div>
            </van-swipe-item>
        </van-swipe>
    </div>

    <div class="page-section page-section-spacing swiper">
        <div v-if="isMode=='1'">
            <div class="title-wrap">
                <div class="title">
                    <div class="title-left">
                        <div class="title-icon_new"></div>
                        <div class="title-name">村社阵地</div>
                        <div class="count">共<text>{{frontCount}}</text>个</div>
                    </div>
                </div>
            </div>

            <van-swipe class='swiper' :autoplay="3000">
                <van-swipe-item v-for="(item,index) in sqAllList" :key='index'>
                    <div class="street-group">
                        <div class="street-section" v-for="(it,id) in item" :key="id" @click="goZd(it)">
                            <div class="first-name">{{it.position_name_one}}</div>
                            <div class="name">{{it.communityName}}</div>
                        </div>
                    </div>
                </van-swipe-item>
            </van-swipe>

        </div>
        <div v-if="isMode=='2'">
            <div class="title-wrap">
                <div class="title">
                    <div class="title-left">
                        <div class="title-icon_new"></div>
                        <div class="title-name">村社阵地</div>
                        <div class="count">共<text>{{frontCount}}</text>个</div>
                    </div>
                </div>
            </div>

            <van-swipe class='swiper' :autoplay="3000">
                <van-swipe-item v-for="(item,index) in sqAllList" :key='index'>
                    <div class="street-group">
                        <div class="street-section" v-for="(it,id) in item" :key="id" @click="goZd(it)">
                            <div class="first-name">{{it.position_name_one}}</div>
                            <div class="name">{{it.communityName}}</div>
                        </div>
                    </div>
                </van-swipe-item>
            </van-swipe>

            <!-- <swiper autoplay="{{autoplay3}}" interval="{{interval3}}" duration="{{duration3}}" class="swiper-height" indicator-dots="{{indicatorDots3}}">
                <swiper-item wx:for="{{sqAllList}}" wx:for-item="item">
                    <div class="street-group">
                        <div class="street-section" wx:for="{{item}}" wx:for-item="item2" wx:key="*this" bindtap="goZd" data-id='{{item2.id}}'>
                            <div class="first-name">{{item2.position_name_one}}</div>
                            <div class="name">{{item2.communityName}}</div>
                        </div>
                    </div>
                </swiper-item>
        </swiper>-->
        </div>
    </div>

    <div class="news-wrap">
        <div class="news-icon"></div>
        <div class="news-swiper">
            <!-- <swiper class="news" indicator-dots="{{false}}" autoplay="true" interval="{{interval2}}" duration="{{duration2}}" vertical="true">
                <block wx:for="{{infosList}}" wx:for-item="item" wx:key="*this">
                    <swiper-item>
                        <div class="news-item" bindtap="geNewsDetail" data-id='{{item.id}}'>
                            <rich-text nodes="{{item.title}}"></rich-text>
                        </div>
                    </swiper-item>
                </block>
        </swiper>-->
        </div>
    </div>
    <!-- 特色阵地 -->
    <div class="front">
        <div class="title">
            <div class="title-left">
                <div class="title-icon1"></div>
                <div class="title-name">特色阵地</div>
                <div class="count">
                    共
                    <text>{{frontCount}}</text>个
                </div>
            </div>
            <div class="more" @click="getMore">{{tsContent}}</div>
        </div>
        <div class="content-wrap" v-for="(item,index) in TsArray" :key="index" @click="goZd(item)" :data-id="item.id">
            <div class="font-strong">{{item.positionName}}</div>
            <div class="font-normal">
                <div class="location-icon"></div>
                <div class="address-info">{{item.positionAddress}}</div>
            </div>
            <div class="font-small">距离您{{item.distance}}km</div>
        </div>
    </div>

    <!-- 热门场馆 -->
    <div class="whitebg">
        <div class="stadium">
            <div class="title">
                <div class="title-left">
                    <div class="title-icon2"></div>
                    <div class="title-name">热门场馆</div>
                </div>
                <div class="more" bindtap="getVenueMore">更多></div>
            </div>
            <div class="box-list">
                <div class="box" v-for="(item,index) in venveList" :key="index">
                    <div class="box-img">
                        <img mode="scaleToFill" :src="item.venueImage" />
                    </div>
                    <div class="box-right" @click="geVenueDetail" :data-id="item.id">
                        <div class="font-strong">{{item.venueName}}</div>
                        <div class="font-normal">
                            <div class="location-icon"></div>
                            <div class="address-info">{{item.venueAddress}}</div>
                        </div>
                        <div class="bottom-group">
                            <div class="font-small">距离您{{item.distance}}km</div>
                            <div class="score small" v-if="item.score==null">
                                <text>暂无评分</text>
                            </div>
                            <div class="score" wx:else>
                                <text>{{item.score}}</text>分
                            </div>
                            <div class="orderbtn" catchtap="goReservation" :data-id="item.id" :data-venuename="item.venueName">立即预约</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- 热门活动 -->
    <div class="whitebg">
        <div class="active">
            <div class="title">
                <div class="title-left">
                    <div class="title-icon3"></div>
                    <div class="title-name">热门活动</div>
                </div>
                <div class="more" bindtap="getActiveMore">更多></div>
            </div>
            <div class="box-list">
                <div class="box" v-for="(item,index) in activeArray" :key="index">
                    <div class="box-img">
                        <img mode="scaleToFill" :src="item.headimg" />
                    </div>
                    <div class="box-right" @click="goActiveDetail(item)" :data-item="item.id">
                        <div class="font-strong">{{item.title}}</div>
                        <div class="font-time">
                            <div>{{item.actBeginTimeString}}</div>

                            <div class="restbtn" v-if="item.entryNumLimit==item.nowNumLimit">已约满</div>
                            <div v-else>
                                <div class="restbtn">总{{item.entryNumLimit}}余{{item.overNumLimit}}</div>
                            </div>
                        </div>
                        <div class="font-normal">
                            <div class="location-icon"></div>
                            <div class="address-info">{{item.address}}</div>
                        </div>
                        <div class="font-small">距离您{{item.distance}}km</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- 活动资讯 -->
    <div class="whitebg">
        <div class="active-zx">
            <div class="title">
                <div class="title-left">
                    <div class="title-icon4"></div>
                    <div class="title-name">活动资讯</div>
                </div>
                <div class="more" bindtap="getNewsMore">更多></div>
            </div>
            <div class="news-swiper-wrap">
                <!-- <swiper class="news-list" autoplay="{{autoplay}}" interval="{{interval}}" next-margin="100" duration="{{duration}}" display-multiple-items="{{swiperItems}}">
                    <swiper-item wx:for="{{newsList}}" wx:for-item="item" wx:key="*this">
                        <div class="item" bindtap="geNewsDetail" data-id='{{item.id}}'>
                            <image src="{{item.headimg}}" mode='scaleToFill'></image>
                        </div>
                        <div class="item-title">{{item.title}}</div>
                    </swiper-item>
          </swiper>-->

                <van-swipe :autoplay="3000" class="news-list" :loop="false" :width="150">
                    <van-swipe-item v-for="(image, index) in newsList" :key="index" @click="geNewsDetail(image)">
                        <div class="item"><img :src="image.headimg" /></div>
                        <div class="item-title">{{image.title}}</div>
                    </van-swipe-item>
                </van-swipe>
            </div>
        </div>
    </div>

    <!-- <button class="confirmbtn" bindtap="goPxh">去彭心汇</button> -->
</div>
</template>

<script src="http://libs.baidu.com/jquery/1.9.1/jquery.min.js"></script> 
<script src="http://api.map.baidu.com/api?v=2.0&ak=f1To0h59nT9TqcHzrKrMEwlbNb0jEGVK"></script>

<script>
import {
    Search,
    Picker,
    Icon,
    Popup,
    Field,
    Swipe,
    SwipeItem,
    Lazyload,
    Tabbar,
    TabbarItem,
    Toast
} from "vant";
import * as api from "@/api/content";
import * as common from "@/api/common";
// import {formatTime} from '@/utils/utils';
import {
    Local
} from "@/utils/storage";

export default {
    components: {
        [Search.name]: Search,
        [Picker.name]: Picker,
        [Icon.name]: Icon,
        [Popup.name]: Popup,
        [Field.name]: Field,
        [Swipe.name]: Swipe,
        [SwipeItem.name]: SwipeItem,
        [Lazyload.name]: Lazyload,
        [Tabbar.name]: Tabbar,
        [TabbarItem.name]: TabbarItem
    },
    data() {
        return {
            showFlag: false,
            motto: "Hello World",
            userInfo: {},
            isMode: "",
            hasUserInfo: false,
            // canIUse: wx.canIUse('button.open-type.getUserInfo'),
            canIUseGetUserProfile: false,
            // canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
            background: [],
            newsList: [],
            infosList: [],
            indicatorDots: true,
            vertical: false,
            autoplay: false,
            interval: 2000,
            duration: 500,
            indicatorDots3: true,
            vertical3: false,
            autoplay3: false,
            interval3: 2000,
            duration3: 500,
            interval2: 1500,
            duration2: 1000,
            index: 0,
            frontCount: 0,
            swiperItems: 2,
            objectArray: [],
            activeArray: [],
            sqArray: [],
            TsArray: [],
            venveList: [],
            tsContent: "展开更多>",
            isShow: false,
            la: 0,
            lo: 0,
            sqAllList: [],
            streetValue: "",
            showPicker: false
        };
    },
    created() {
        this.getLocation();
        let that = this;
        var data = {
            name: "streetone",
            id: 110
        };
        common.getStreet(data).then(res => {
            res.forEach(element => {
                element.text = element.name;
            });
            this.objectArray = res;
            let objArr = res;

            if (res.length > 0) {
                Local.set("street_id_Now", res[0].id);
            }

            api.getInfo({}).then(res => {
                if (res.code == 200) {
                    var deptId = res.data.deptId;
                    for (var j = 0; j < objArr.length; j++) {
                        if (deptId == parseInt(objArr[j].id)) {
                            that.index = j;
                            Local.set("street_id_Now", deptId);
                        }
                    }
                    // console.log(deptId,'00000000');
                    deptId = 103;
                    this.streetValue = '湖滨街道';
                    this.index = 103;

                    that.getActive(deptId);
                    that.getCg(deptId);
                    that.getBanner(deptId);
                    that.getSqTs(deptId, 1, 10);
                    that.getSqTs(deptId, 2, 1);
                    that.getNewsList(deptId, 1);
                    that.getNewsList(deptId, 0);
                } else {
                    Toast(res.msg);
                }
            });

        });
    },
    methods: {
        goSearch: function (e) {
            console.log(e);
            this.$router.push({
                name: "position",
                params: {
                    street_id: this.streetid
                }
            });
        },
        goDirect() {
            console.log("goDirect");
        },
        goZd(e) {
            this.$router.push({
                name: "position",
                params: e
            });
        },
        geVenueDetail(e) {
            console.log(e);
        },
        goActiveDetail(e) {
            this.$router.push({
                name: "activeDetail",
                params: e
            });
        },
        geNewsDetail(e) {
            this.$router.push({
                name: "newsDetail",
                params: e
            });
        },
        getLocation() {
            let that = this;
            if (navigator.geolocation) {
                var geolocation = new BMap.Geolocation();
                geolocation.getCurrentPosition(
                    function (r) {
                        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                            //   alert("您的位置：" + r.point.lng + "," + r.point.lat);
                            that.la = r.point.lat;
                            that.lo = r.point.lng;
                        } else {
                            console.log("failed" + this.getStatus());
                        }
                    }, {
                        enableHighAccuracy: true
                    }
                );
            } else {
                console.log("Geolocation is not supported by this browser.");
            }
        },
        getSqTs(streetId, type, limt) {
            var that = this;
            var data = {
                streetId: streetId,
                // streetId: 138,
                positionTypeOperator: type,
                positionTypes: limt,
                latitude: this.la,
                longitude: this.lo
            };
            api.positionInfo(data).then(res => {
                console.log("---------", res)
                if (1 == type) {
                    var sst = false;
                    if (res.dataAll.length > 1) {
                        sst = true;
                    }
                    that.sqArray = res.data;
                    that.sqAllList = res.dataAll;
                    that.isMode = res.isMode;
                    that.indicatorDots3 = sst;
                } else {
                    that.TsArray = res.data;
                    that.frontCount = res.listSize;
                }
                that.frontCount = res.listSize;
            });
        },

        onConfirm(value) {
            this.value = value;
            this.showPicker = false;
            this.streetValue = value.name;
            var jj = value.id;
            this.getBanner(jj);
            this.getActive(jj);
            this.getCg(jj);
            this.getSqTs(jj, 1, 10);
            this.getSqTs(jj, 2, 1);
            this.getNewsList(jj, 1);
            this.getNewsList(jj, 0);
            this.index = value.value;

            Local.set("street_id_Now", jj);
        },
        showpicker() {
            this.showPicker = true;
        },
        getActive(streetId) {
            var that = this;
            console.log(streetId)
            var data = {
                // streetId: streetId,
                streetId: 138,
                la: this.la,
                lo: this.lo
            };
            api.getActive(data).then(res => {
                if (res.code == 200) {
                    that.activeArray = res.data;
                } else {
                    Toast(res.msg);
                }
            });
        },
        getBanner(streetid) {
            var params = {
                streetid: streetid
            };
            api.getBanner(params).then(res => {
                this.background = res;
            });
        },
        getCg: function (streetId) {
            var data = {
                streetId: streetId,
                la: this.la,
                lo: this.lo
            };
            api.getViewHot(data).then(res => {
                this.venveList = res.data;
            });
        },
        getNewsList: function (streetId, type) {
            var that = this;
            var data = {
                streetId: streetId,
                isTop: 1
            };
            if (1 == type) {
                data = {
                    streetId: streetId
                };
            }
            api.getNewList(data).then(res => {
                if (1 == type) {
                    that.newsList = res.data;
                } else {
                    that.infosList = res.data;
                }
            });
        },
        getMore() {}
    }
};
</script>

<style>
.activity-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
}

.button-sq {
    background-color: #fff;
    border: none;
    width: 25%;
    margin: 0;
}

.button-sq img {
    width: 90%;
}

.swiper-img {
    width: 100%;
    height: 200px;
}

.container {
    padding: 0;
}

.topBar {
    background-color: #1769f5;
    color: #fff;
    height: 50px;
    width: 100%;
    text-align: center;
}

.topBar span {
    font-size: 20px;
    margin-left: 3%;
    margin-top: 3%;
    margin-bottom: 3%;
}

.input-index .van-field__control {
    color: #fff;
}

.van-cell.van-cell--clickable.van-field {
    height: 29px;
    padding-top: 3px;
}

.page-section.swiper {
    width: 100%;
    /* height:356rpx; */
}

.swiper-item {
    width: 100%;
    height: 200px;
}

.swiper-item image {
    width: 100%;
    height: 200px;
}

.swiper-height2 {
    height: 200px;
}

.swiper-height {
    background-color: #fff;
    width: 100%;
    display: inline-block;
}

.swiper-height .van-swipe {
    display: inline-block;
}

.search-wrap {
    display: flex;
    flex-direction: row;
    background-color: #1769f5;
    padding: 10px 10px 20px;
    align-items: center;
    width: 100%;
    height: 50px;
    justify-content: space-between;
    box-sizing: border-box;
}

.van-field {
    background-color: #1769f5;
}

.van-cell__title.van-field__label span {
    color: #fff;
}

.van-search {
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: #c8dbfd;
    border-radius: 15px;
    width: 70%;
    justify-content: space-between;
    color: #90949f;
    font-size: 12px;
}

.van-search.van-search--show-action {
    border-radius: 15px;
    padding: 10px 0px 10px 0px;
    height: 35px;
}

.van-search__content.van-search__content--square {
    margin: 0 0 10px 5px;
    background-color: #c8dbfd;
    height: 25px;
    border-radius: 15px;
}

.search-box {
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: #c8dbfd;
    width: 70%;
    padding: 5px 10px;
    border-radius: 15px;
    justify-content: space-between;
}

.pick-wrap {
    width: 100%;
    color: #fff;
    font-size: 12px;
}

.search-icon {
    width: 13px;
    height: 14px;
    background: url(https://red.manbu.xyz/red/search.png);
    background-size: 14px 14px;
}

.search-btn {
    width: 50px;
    height: 25px;
    background-color: #5d98fb;
    color: #fff;
    text-align: center;
    line-height: 25px;
    border-radius: 15px;
    font-size: 12px;
}

.sq-section {
    background-color: #fff;
}

.timeinfo-section {
    background-color: #fff;
    width: 100%;
    height: 38px;
    margin: 0 auto;
    top: 1%;
}

.timeinfo-section img {
    width: 96%;
    height: 100%;
    padding: 0 2% 0 2%;
}

.timeinfo-section .timeinfo-detail {
    position: relative;
    color: #e7b046;
    font-size: 15px;
    margin-left: 28%;
    bottom: 100%;
}

.timeinfo-section .timeinfo-detail .van-swipe {
    height: 20px;
    width: 100%;
}

.swipe-word {
    height: 20px;
    font-size: 15px;
    color: #e7b046;
}

.street-group {
    background: #fff;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    justify-content: flex-start;
    padding-top: 10px;
}

.street-section {
    display: inline-block;
    width: 25%;
    height: 65px;
    padding: 13px 0px;
    margin: 0 0px;
}

.street-section .first-name {
    font-size: 20px;
    text-align: center;
    color: #fff;
    font-weight: bold;
}

.street-section .name {
    width: 100%;
    color: #4f4b4c;
    text-align: center;
    font-size: 12px;
    margin-top: 10px;
}

.street-section {
    background: url(https://red.manbu.xyz/red/namebg5.png) no-repeat center top;
    background-size: 52px 58px;
}

.street-section:nth-child(1) {
    background: url(https://red.manbu.xyz/red/namebg1.png) no-repeat center top;
    background-size: 52px 58px;
}

.street-section:nth-child(2) {
    background: url(https://red.manbu.xyz/red/namebg2.png) no-repeat center top;
    background-size: 52px 58px;
}

.street-section:nth-child(3) {
    background: url(https://red.manbu.xyz/red/namebg3.png) no-repeat center top;
    background-size: 52px 58px;
}

.street-section:nth-child(4) {
    background: url(https://red.manbu.xyz/red/namebg4.png) no-repeat center top;
    background-size: 52px 58px;
}

.street-section:nth-child(5) {
    background: url(https://red.manbu.xyz/red/namebg5.png) no-repeat center top;
    background-size: 52px 58px;
}

.street-section:nth-child(6) {
    background: url(https://red.manbu.xyz/red/namebg6.png) no-repeat center top;
    background-size: 52px 58px;
}

.street-section:nth-child(7) {
    background: url(https://red.manbu.xyz/red/namebg7.png) no-repeat center top;
    background-size: 52px 58px;
}

.street-section:nth-child(8) {
    background: url(https://red.manbu.xyz/red/namebg8.png) no-repeat center top;
    background-size: 52px 58px;
}

.street-section:nth-child(9) {
    background: url(https://red.manbu.xyz/red/namebg1.png) no-repeat center top;
    background-size: 52px 58px;
}

.street-section:nth-child(10) {
    background: url(https://red.manbu.xyz/red/namebg2.png) no-repeat center top;
    background-size: 52px 58px;
}

.street-section:nth-child(11) {
    background: url(https://red.manbu.xyz/red/namebg3.png) no-repeat center top;
    background-size: 52px 58px;
}

.street-section:nth-child(12) {
    background: url(https://red.manbu.xyz/red/namebg4.png) no-repeat center top;
    background-size: 52px 58px;
}

.news-wrap {
    height: 40px;
    width: 94%;
    margin: 0 auto;
    padding: 5px 15px;
    background-color: #fff5d9;
    border-radius: 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
}

.news-swiper {
    width: 70%;
}

.news {
    height: 20px;
}

.news .news-item {
    color: #e7b046;
    font-size: 13px;
    line-height: 20px;
}

.news-icon {
    background: url(https://red.manbu.xyz/red/time-icon.png);
    background-size: 74px 18px;
    width: 74px;
    height: 18px;
}

.front,
.stadium,
.active {
    background-color: #fff;
    width: 100%;
    margin: 0% auto;
}

.title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 20px;
    padding: 10px 10px;
}

.title-icon_new {
    width: 18px;
    height: 18px;
    background: url(https://red.manbu.xyz/red/icon_new.png);
    background-size: 18px 18px;
    border-radius: 50%;
}

.title-icon1 {
    width: 18px;
    height: 18px;
    background: url(https://red.manbu.xyz/red/tszd.png);
    background-size: 18px 18px;
}

.title-icon2 {
    width: 18px;
    height: 18px;
    background: url(https://red.manbu.xyz/red/rmcg.png);
    background-size: 18px 18px;
}

.title-icon3 {
    width: 18px;
    height: 18px;
    background: url(https://red.manbu.xyz/red/rmhd.png);
    background-size: 18px 18px;
}

.title-icon4 {
    width: 18px;
    height: 18px;
    background: url(https://red.manbu.xyz/red/hdzx.png);
    background-size: 18px 18px;
}

.title-left {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
}

.title-name {
    font-size: 15px;
    color: #363636;
    font-weight: bold;
    margin-left: 5px;
}

.count {
    color: #9d9e9e;
    font-size: 12px;
    margin-left: 5px;
}

.count text {
    color: #35b5fe;
    padding: 0 2.5px;
}

.more {
    color: #a4a4a4;
    font-size: 14px;
}

.content-wrap {
    width: 100%;
    height: 103px;
    background: url(https://red.manbu.xyz/red/centerbg.png);
    background-size: 100% 103px;
    padding: 15px;
    box-sizing: border-box;
    border-bottom: 1px solid #dfdfdf;
}

.content-wrap:last-child {
    border-bottom: none;
}

.font-strong {
    font-size: 18px;
    color: #1c3248;
    font-weight: bold;
}

.box .font-strong {
    color: #000000;
    font-size: 14px;
}

.font-normal {
    font-size: 12px;
    color: rgba(28, 50, 72, 0.4);
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.location-icon {
    width: 9px;
    height: 13px;
    background: url(https://red.manbu.xyz/red/location.png);
    background-size: 9px 13px;
    margin-right: 5px;
}

.font-small {
    color: rgba(28, 50, 72, 0.4);
    font-size: 9px;
    display: table;
    padding: 5px 10px;
    border-radius: 15px;
    background: #ddeefe;
    margin-top: 5px;
}

.box {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
}

.box-img {
    width: 105px;
    height: 81px;
    border-radius: 5px;
    overflow: hidden;
}

.box-img image {
    width: 105px;
    height: 81px;
}

.box-right {
    flex: 1;
    margin-left: 10px;
    overflow: hidden;
}

.box:nth-child(1) {
    background: #fff0e9;
    border-radius: 10px;
}

.box:nth-child(2) {
    background: #ecfffd;
    border-radius: 10px;
}

.bottom-group {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.title-wrap {
    width: 100%;
    margin: -8px auto 0px;
    background-color: #fff;
}

.score {
    color: #f78e32;
    font-size: 10px;
}

.score text {
    font-size: 10px;
    font-weight: bold;
}

.score.small text {
    font-size: 12px;
}

.orderbtn {
    color: #3281f7;
    font-size: 11px;
    display: table;
    padding: 3px 8px;
    border: 1px solid #3281f7;
    border-radius: 7.5px;
}

.active .box {
    background: transparent;
    position: relative;
    padding: 5px 0;
    box-sizing: border-box;
}

.font-time {
    color: #f6a86c;
    font-size: 12px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 7.5px;
}

.active .box:nth-child(1) {
    border-bottom: 0;
}

.restbtn {
    width: 59px;
    height: 20px;
    background: url(https://red.manbu.xyz/red/restbtn.png);
    background-size: 59px 20px;
    margin-right: 5px;
    color: #fff;
    font-size: 12px;
    text-align: center;
    line-height: 20px;
}

.active .font-small {
    background: transparent;
    border: 1px solid #b0bbc4;
}

.active-news {
    padding-bottom: 25px;
}

.active-zx {
    width: 100%;
    margin: 0 auto;
}

.whitebg {
    width: 100%;
    background-color: #fff;
    border-top: 8px #f7f7f7 solid;
    margin-top: 2px;
}

.news-list .item {
    height: 100px;
    overflow: hidden;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
}

.news-list img {
    margin: 0 10% 0 10%;
    width: 150px;
    height: 100px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
}

.news-swiper-wrap .item-title {
    font-size: 12px;
    color: #636363;
    margin: 0 10% 0 10%;
}

.news-list {
    height: 170px;
}

.p-r {
    position: relative;
    width: 25%;
    display: inline;
}

.stadium .box {
    padding: 5px 10px;
    box-sizing: border-box;
}

.active .box {
    padding: 0 10px;
    box-sizing: border-box;
}

.news-swiper-wrap swiper-item {
    padding: 0 10px;
}

.weui-input {
    color: #90949f;
    background-color: transparent;
    width: 70%;
}

.van-cell {
    padding: 0;
}

.van-cell.van-cell--clickable.van-field {
    height: 20px;
    padding-top: 0;
}
</style>
