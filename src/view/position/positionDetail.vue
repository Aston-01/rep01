<template>
  <!--pages/position/positionDetail.wxml-->
  <div class="position">
    <div class="banner">
      <img :src="sqArray.positionImage" />
    </div>
    <div class="position-info">
      <div class="title">{{sqArray.positionName}}</div>
      <div class="line">
        <div class="address">{{sqArray.positionAddress}}</div>
        <div class="location" bindtap="openLocation">
          <div class="location-icon"></div>
          <div class="address-info">距离{{sqArray.distance}}km ></div>
        </div>
      </div>
      <div class="tab-nav">
        <div class="nav" v-bind:class="tabIndex === 0?'selected':''" @click="setTabIndex(0)">
          <div class="name">场馆预约</div>
          <div class="border"></div>
        </div>
        <div class="nav" v-bind:class="tabIndex === 1?'selected':''" @click="setTabIndex(1)">
          <div class="name">活动报名</div>
          <div class="border"></div>
        </div>
      </div>
    </div>
    <div class="tab-content">
      <div class="content" v-bind:class="tabIndex === 0?'active':''">
        <div class="whitebg all">
          <div
            class="box"
            v-for="(item,index) in venveList"
            :key="index"
            bindtap="geVenueDetail"
            :data-id="item.id"
          >
            <div class="box-img">
              <img :src="item.venueImage" />
            </div>
            <div class="box-right">
              <div class="font-strong">{{item.venueName}}</div>
              <div class="font-normal">
                <div class="location-icon"></div>
                <div class="address-info">{{item.venueAddress}}</div>
              </div>
              <div class="right-bottom">
                <div class="font-small">距离您{{item.distance}}km</div>
                <div class="grade small" v-if="item.score==null">
                  <text>暂无评分</text>
                </div>
                <div class="grade" v-else>
                  <text>{{item.score}}</text>分
                </div>
                <van-button
                  class="applybtn"
                  catchtap="goReservation"
                  :data-id="item.id"
                  :data-venuename="item.venueName"
                >立即预约</van-button>
              </div>
            </div>
          </div>
        </div>
        <van-button class="more-info" bindtap="goMore">查看更多</van-button>
      </div>
      <div class="content" v-bind:class="tabIndex === 1?'active':''">
        <div class="whitebg all">
          <div class="box" v-for="(item,index) in activeArray" :key="index">
            <div class="box-img">
              <img :src="item.headimg" />
            </div>
            <div class="box-right" bindtap="goActiveDetail" :data-item="item.id">
              <div class="font-strong">{{item.title}}</div>
              <div class="font-time">
                <div>{{item.actBeginTimeString}}</div>
                <div class="wrubtn" v-if="item.entryNumLimit==item.nowNumLimit">已约满</div>
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
        <van-button class="more-info" bindtap="goMore">查看更多</van-button>
      </div>
    </div>

    <div class="whitebg">
      <div class="active-zx">
        <div class="title">
          <div class="title-left">
            <div class="title-icon4"></div>
            <div class="title-name">活动资讯</div>
          </div>
          <div class="more" bindtap="getNewsMore">更多></div>
        </div>

        <div
          class="box"
          v-for="(item,index) in newsArray"
          :key="index"
          bindtap="geNewsDetail"
          :data-id="item.id"
        >
          <div class="box-img">
            <img :src="item.headimg" />
          </div>
          <div class="box-right">
            <div class="font-strong">{{item.title}}</div>

            <div class="font-normal">{{item.positionName}}</div>
            <div class="font-normal flex-div">
              <div class="time">{{item.createTime}}</div>
              <div class="hits">
                <div class="eye-icon"></div>
                {{item.readnum}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import * as api from "@/api/content";
// import * as common from "@/api/common";

export default {
  data() {
    return {
      la: 0,
      lo: 0,
      positionId: "",
      tabIndex: 0,
      sqArray: {},
      venveList: [],
      activeArray: [],
      newsArray: []
    };
  },
  created() {
    let routerData = this.$route.params;
    if(JSON.stringify(routerData) === '{}'){
      this.$router.push("index");
    }
    this.positionId = routerData.id;
    this.getLocation();

    this.getSqTs(routerData.id);
    this.getVenu(routerData.id);
    this.getNewsList(routerData.id);
  },
  methods: {
      setTabIndex(number){
          this.tabIndex = number;
      },
    getLocation() {
      let that = this;
      if (navigator.geolocation) {
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(
          function(r) {
            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
              //   alert("您的位置：" + r.point.lng + "," + r.point.lat);
              that.la = r.point.lat;
              that.lo = r.point.lng;
            } else {
              console.log("failed" + this.getStatus());
            }
          },
          {
            enableHighAccuracy: true
          }
        );
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    },
    getSqTs: function(id) {
      var that = this;
      var data = {
        id: id,
        latitude: this.la,
        longitude: this.lo
      };
      api.positionInfo(data).then(res => {
        
        if (res.code == 200) {
          if (res.data.length > 0) {
            that.sqArray= res.data[0]
          }
        } else {
          Toast(res.msg);
        }
      });
    },
    getNewsList: function(positionId) {
      var xxs = this;
     
      var data = { positionId: positionId, nowTips: 1 };
      api.positionNewsList(data)
        .then(res => {
          xxs.newsArray=res.data
        })
        
    },
    getVenu: function(positionId) {
      //场馆详情
      var that = this;
      //获取场馆
      var data = { positionId: positionId, la: this.la, lo: this.lo };
      api.getVenue(data).then(res => {
        that.venveList = res.data;
      });
    },
    getActive: function(positionId) {
      var xxs = this;
      var data = { positionId: positionId, la: this.la, lo: this.lo };
      api.getActivity(data).then(res => {
        if (res.data.length > 0) {
          xxs.activeArray = res.data;
        } else {
          xxs.activeArray = [];
        }
      });
    }
  }
};
</script>

<style scoped>
/* pages/position/positionDetail.wxss */
page {
  background-color: #f4f4f4;
  font-size: 0.24rem;
}

.banner {
  width: 100%;
  height: 3.65rem;
}

.banner img {
  width: 100%;
  height: 3.65rem;
}

.line {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0.1rem 0;
}

.line .name {
  color: #000;
  font-size: 0.28rem;
  padding: 0.1rem 0;
}

.line .time {
  color: #2a272e;
  font-size: 0.24rem;
}

.line .info-group {
  background-color: #fef8ec;
  display: flex;
  flex-direction: row;
  padding: 0.06rem 0.1rem;
  border-radius: 0.2rem;
  margin: 0.1rem 0;
}

.address {
  color: #2a272e;
  font-size: 0.24rem;
}

.location {
  display: flex;
  flex-direction: row;
  font-size: 0.18rem;
  align-items: center;
}

.grade {
  color: #f78e32;
}

.grade text {
  font-size: 0.32rem;
  font-weight: bold;
}

.active-zx .title {
  color: #000;
  font-size: 0.28rem;
  /* margin-bottom: .10rem; */
}

.location-icon {
  width: 0.18rem;
  height: 0.26rem;
  background: url(https://red.manbu.xyz/red/v-location.png);
  background-size: 0.18rem 0.26rem;
  margin-right: 0.1rem;
}

.position-info {
  width: 96%;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 0.2rem 0.1rem 0;
  background: #fff;
  border-radius: 0.2rem;
  margin-top: -1.3rem;
  position: relative;
  z-index: 9;
}

.whitebg {
  width: 96%;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 0.2rem 0.2rem 0;
  background: #fff;
  border-radius: 0.2rem;
}

.wrubtn {
  width: 1.17rem;
  height: 0.4rem;
  background: #bfbdc4;
  background-size: 1.17rem 0.4rem;
  margin-right: 0.1rem;
  color: #fff;
  font-size: 0.24rem;
  text-align: center;
  line-height: 0.4rem;
}

/* pages/venue/venue.wxss */
.search-wrap {
  display: flex;
  flex-direction: row;
  background-color: #1769f5;
  padding: 0.1rem 0.2rem;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  box-sizing: border-box;
}

.search-box {
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #c8dbfd;
  width: 70%;
  padding: 0.1rem 0.2rem;
  border-radius: 0.3rem;
  justify-content: space-between;
}

.pick-wrap {
  width: 25%;
  color: #fff;
  font-size: 0.24rem;
}

.search-icon {
  width: 0.27rem;
  height: 0.27rem;
  background: url(https://red.manbu.xyz/red/search.png);
  background-size: 0.27rem 0.27rem;
}

.search-btn {
  width: 1rem;
  height: 0.5rem;
  background-color: #5d98fb;
  color: #fff;
  text-align: center;
  line-height: 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.24rem;
}

.venue {
  padding-top: 0.2rem;
}

.box-list {
  width: 100%;
  padding: 0 0.3rem;
  box-sizing: border-box;
}

.box {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 0.2rem;
  padding-bottom: 0.2rem;
  border-bottom: 1px solid #eeeeee;
}

.box:last-child {
  border-bottom: 0;
}

.box-img {
  width: 2.11rem;
  height: 1.62rem;
  border-radius: 0.1rem;
  overflow: hidden;
}

.box-img img {
  width: 2.11rem;
  height: 1.62rem;
}

.box-right {
  margin-left: 0.2rem;

  flex: 1;
  overflow: hidden;
}

.bottom-group {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.font-strong {
  font-size: 0.36rem;
  color: #1c3248;
  font-weight: bold;
}

.box .font-strong {
  color: #000000;
  font-size: 0.28rem;
}

.font-normal {
  font-size: 0.24rem;
  color: #b8b8b8;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 0.1rem;
}

.location-icon {
  width: 0.18rem;
  height: 0.26rem;
  background: url(https://red.manbu.xyz/red/location.png);
  background-size: 0.18rem 0.26rem;
  margin-right: 0.1rem;
}

.font-small {
  color: #1c3248;
  font-size: 0.18rem;
  display: table;
  padding: 0.1rem 0.2rem;
  border-radius: 0.3rem;
  background: #f5f5f5;
  margin-top: 0.1rem;
}

.font-time {
  color: #f6a86c;
  font-size: 0.24rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 0.1rem;
}

.restbtn:not([size="mini"]) {
  width: 1.17rem;
  height: 0.4rem;
  background: url(https://red.manbu.xyz/red/restbtn.png);
  background-size: 1.17rem 0.4rem;
  margin-right: 0.1rem;
  color: #fff;
  font-size: 0.24rem;
  text-align: center;
  line-height: 0.4rem;
}

.select-item {
  display: flex;
  flex-direction: row;
  height: 0.7rem;
  align-items: center;
}

.select-item .item {
  /* width: 50%; */
  display: flex;
  flex-direction: row;
  padding: 0 0 0 0.15rem;
}

.item text {
  font-size: 0.24rem;
  color: #000;
}

.item .option {
  color: #bababa;
  font-size: 0.24rem;
}

.option-group {
  display: flex;
  margin-left: 0.1rem;
}

.option {
  padding: 0 0.1rem;
  border-right: 1px solid #eee;
}

.option:last-child {
  border-right: none;
}

.option.selected {
  color: #34b4fe;
}

.right-bottom {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 0.8rem;
}

.grade {
  margin-left: 0.1rem;
  color: #f78e32;
  font-size: 0.24rem;
}

.grade text {
  font-size: 0.32rem;
  font-weight: bold;
}

.applybtn:not([size="mini"]) {
  width: 1.17rem;
  height: 0.4rem;
  line-height: 0.4rem;
  margin-right: 0.1rem;
  color: #3281f7;
  font-size: 0.24rem;
  text-align: center;
  line-height: 0.4rem;
  padding: 0;
  border: 1px solid #3281f7;
}

.tab-nav {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 0.2rem 0;
}

.tab-nav .nav {
  color: rgba(42, 39, 46, 1);
  font-size: 0.24rem;
  width: 45%;
  text-align: center;
  font-weight: bold;
}

.tab-nav .nav.selected {
  color: rgba(23, 105, 245, 1);
}

.tab-nav .nav.selected .border {
  background-color: rgba(23, 105, 245, 1);
  height: 0.04rem;
  width: 50%;
  margin: 0 auto;
  margin-top: 0.1rem;
}

.tab-content {
  width: 100%;
  box-sizing: border-box;
  margin: 0.4rem auto;
  /* background: #fff; */

  /* border-radius: .20rem; */
}

.tab-content .content {
  display: none;
}

.tab-content .content.active {
  display: block;
}

.whitebg.all {
  padding: 0.2rem 0.2rem;
}

.position-info .line {
  padding-bottom: 0.2rem;
  border-bottom: 1px solid rgba(238, 238, 238, 1);
}

.active-zx {
  width: 100%;
  margin: 0 auto;
  padding-bottom: 0.5rem;
}

.active-zx .title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 0.4rem;
  padding: 0.2rem 0;
}

.active-zx .title-icon1 {
  width: 0.36rem;
  height: 0.36rem;
  background: url(https://red.manbu.xyz/red/tszd.png);
  background-size: 0.36rem 0.36rem;
}

.active-zx .title-icon2 {
  width: 0.36rem;
  height: 0.36rem;
  background: url(https://red.manbu.xyz/red/rmcg.png);
  background-size: 0.36rem 0.36rem;
}

.active-zx .title-icon3 {
  width: 0.36rem;
  height: 0.36rem;
  background: url(https://red.manbu.xyz/red/rmhd.png);
  background-size: 0.36rem 0.36rem;
}

.active-zx .title-icon4 {
  width: 0.36rem;
  height: 0.36rem;
  background: url(https://red.manbu.xyz/red/hdzx.png);
  background-size: 0.36rem 0.36rem;
}

.active-zx .title-left {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}

.active-zx .title-name {
  font-size: 0.3rem;
  color: #363636;
  font-weight: bold;
  margin-left: 0.1rem;
}

.flex-view {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.eye-icon {
  width: 0.24rem;
  height: 0.19rem;
  background: url(https://red.manbu.xyz/red/eye.png);
  background-size: 0.24rem 0.19rem;
  margin-right: 0.1rem;
}

.hits {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.more-info:not([size="mini"]) {
  background-color: #fff;
  color: rgba(42, 39, 46, 1);
  width: 96%;
  margin: 0.2rem auto 0;
  height: 0.82rem;
  line-height: 0.82rem;
  font-size: 0.24rem;
  padding: 0;
  display: block;
}

.position-info .title {
  font-size: 0.28rem;
  color: #000;
  font-weight: bold;
}

.grade.small text {
  font-size: 0.24rem;
}
.flex-div{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-right: 0.3rem;
}
</style>
