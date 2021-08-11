<template>
 <div class="result">
  <div class="search-wrap">
    <div class="back-arrow" bindtap="goIndex"></div>
    <div class="search-box">
      <div class="search-icon"></div>
      <input class="weui-input" bindinput="bindSc"  v-model="content" placeholder-style="color:#90949f;font-size:.24rem;" placeholder="输入搜索内容" />
      <div class="search-btn" bindtap="getSearch">搜索</div>
    </div>
  </div>
  <div class="search-tab">
   <div class="tab-nav">
    <div v-bind:class="index===0?'nav selected':'nav'" data-index="0" bindtap="setIndex">
      <div class="name">场馆</div>
      <div class="border"></div>
    </div>
    <div v-bind:class="index===1?'nav selected':'nav'"  data-index="1"   bindtap="setIndex">
      <div class="name">活动</div>
      <div class="border"></div>
    </div>
    <div v-bind:class="index===2?'nav selected':'nav'"  data-index="2"   bindtap="setIndex">
      <div class="name">资讯</div>
      <div class="border"></div>
    </div>
   </div>
   <div class="nav-content" >
   <div class="content"  v-if="index === 0">
    <div class="whitebg">
    <div class="stadium">
      <div class="title">
        <div class="title-left">
          <div class="title-icon2"></div>
          <div class="title-name">场馆</div>
        </div>
        <div class="more" bindtap="getVenueMore">更多></div>
      </div>
      <div class="box-list">
        <div class="box" v-for="(item,index) in venveList" :key="index">
          <div class="box-img">
            <image mode="scaleToFill" :src="item.venueImage"></image>
          </div>
          <div class="box-right" bindtap="geVenueDetail" :data-id='item.id'>
            <div class="font-strong">{{item.venueName}}</div>
            <div class="font-normal">
              <div class="location-icon"></div>
              <div class="address-info">{{item.venueAddress}}</div>
            </div>
            <div class="bottom-group">
              <div class="font-small">距离您{{item.distance}}km</div>
              <div class="score small" v-if="item.score==null"><text>暂无评分</text></div>
              <div class="score" v-else><text>{{item.score}}</text>分</div>
              <div class="orderbtn">立即预约</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
   </div>
   <div class="content" v-if="index === 1">
    <div class="whitebg">
    <div class="active">
      <div class="title">
        <div class="title-left">
          <div class="title-icon3"></div>
          <div class="title-name">活动</div>
        </div>
        <div class="more"  bindtap="getActiveMore">更多></div>
      </div>
      <div class="box-list">
        <div class="box" v-for="(item,index) in activeArray" :key="index">
          <div class="box-img">
            <img :src="item.headimg" />
          </div>
          <div class="box-right" bindtap="goActiveDetail" :data-item="item.id">
            <div class="font-strong">{{item.title}}</div>
            <div class="font-time">
              <div> {{item.actBeginTimeString}}</div>
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

    </div>
  </div>
   </div>
   <div class="content"  v-if="index === 2">
    <div class="whitebg">
    <div class="active">
      <div class="title">
        <div class="title-left">
          <div class="title-icon4"></div>
          <div class="title-name">资讯</div>
        </div>
        <div class="more"  bindtap="getNewsMore">更多></div>
      </div>
      <div class="box-list news-list">
    <div class="box" v-for="(item,index) in newsArray" :key="index" bindtap="geNewsDetail" :data-id='item.id'>
      <div class="box-img">
        <img :src="item.headimg" />
      </div>
      <div class="box-right">
        <div class="font-strong">{{item.title}}</div>

        <div class="font-normal">
          {{item.positionName}}
        </div>
        <div class="font-normal flex-div">
          <div class="time">{{item.createTime}} </div>
          <div class="hits">
            <div class="eye-icon"></div>{{item.readnum}}
          </div>
        </div>
      </div>
    </div>
  </div>

    </div>
  </div></div>
   </div>
  </div>
 </div>

</template>
<script>
// import { Toast } from "vant";
// import * as api from "@/api/content";
// import * as common from "@/api/common";
export default {
    data(){
        return{
            index:1,
            streetId:"103",
            la:"",
            lo:"",
            content:"",
            activeArray:[],
            newsArray:[],
        }
    }
}
</script>
<style scoped>
.container{
  padding: 0;
}
.page-section.swiper{
  width: 100%;
  /* height:3.56rem; */
}
.swiper-item{
  width: 100%;
  height: 356px;
}
.swiper-item image{
  width: 100%;
  height: 3.56rem;
}
.search-wrap{
  display: flex;
  flex-direction: row;
  background-color: #1769f5;
  padding: .10rem .20rem;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  box-sizing: border-box;
}
.search-box{
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #c8dbfd;
  width: 85%;
  padding: .10rem .20rem;
  border-radius: .30rem;
  justify-content: space-between;
}
.wrubtn{
  width: 1.17rem;
  height: .40rem;
  background:#BFBDC4;
  background-size: 1.17rem .40rem;
  margin-right: .10rem;
  color: #fff;
  font-size: .24rem;
  text-align: center;
  line-height: .40rem;
}
.search-box input{
  width: 80%;
}
.search-icon{
  width: .27rem;
  height: .27rem;
  background: url(https://red.manbu.xyz/red/search.png);
  background-size: .27rem .27rem;
}
.search-btn{
  width: 1.00rem;
  height: .50rem;
  background-color: #5d98fb;
  color: #fff;
  text-align: center;
  line-height: .50rem;
  border-radius: .25rem;
  font-size: .24rem;
}


.street-group{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  justify-content: flex-start;
  padding-top: .50rem;
}
.street-section{
  width: 25%;
  height: 1.30rem;
  padding-top: .26rem;
}
.street-section .first-name{
  font-size: .40rem;
  text-align: center;
  color: #fff;
  font-weight: bold;
}
.street-section .name{
  color: #4f4b4c;
  text-align: center;
  font-size: .24rem;
  margin-top: .20rem;
}
.street-section:nth-child(1){
  background:url(https://red.manbu.xyz/red/namebg1.png) no-repeat center top;
  background-size: 1.03rem 1.16rem;
}
.street-section:nth-child(2){
  background:url(https://red.manbu.xyz/red/namebg2.png) no-repeat center top;
  background-size: 1.03rem 1.16rem;
}
.street-section:nth-child(3){
  background:url(https://red.manbu.xyz/red/namebg3.png) no-repeat center top;
  background-size: 1.03rem 1.16rem;
}
.street-section:nth-child(4){
  background:url(https://red.manbu.xyz/red/namebg4.png) no-repeat center top;
  background-size: 1.03rem 1.16rem;
}
.street-section:nth-child(5){
  background:url(https://red.manbu.xyz/red/namebg5.png) no-repeat center top;
  background-size: 1.03rem 1.16rem;
}
.street-section:nth-child(6){
  background:url(https://red.manbu.xyz/red/namebg6.png) no-repeat center top;
  background-size: 1.03rem 1.16rem;
}.street-section:nth-child(7){
  background:url(https://red.manbu.xyz/red/namebg7.png) no-repeat center top;
  background-size: 1.03rem 1.16rem;
}
.street-section:nth-child(8){
  background:url(https://red.manbu.xyz/red/namebg8.png) no-repeat center top;
  background-size: 1.03rem 1.16rem;
}
.news-wrap{
  height: 40px;
  width: 90%;
  margin: 0 auto;
  padding: .10rem .30rem;
  background-color: #fff5d9;
  border-radius: .40rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.news-swiper{
  width: 70%;
}
.news{
  height: .40rem;
}
.news .news-item{
  color: #e7b046;
  font-size: .26rem;
  line-height: .40rem;
}
.news-icon{
  background: url(https://red.manbu.xyz/red/time-icon.png);
  background-size: 1.48rem .37rem;
  width: 1.48rem;
  height: .37rem;
}

.front,.stadium,.active{
  width: 90%;
  margin: 0 auto;
}
.title{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: .40rem;
  padding: .20rem 0;
}
.title-icon1{
  width: .36rem;
  height: .36rem;
  background:url(https://red.manbu.xyz/red/tszd.png);
  background-size: .36rem .36rem;
}
.title-icon2{
  width: .36rem;
  height: .36rem;
  background:url(https://red.manbu.xyz/red/rmcg.png);
  background-size: .36rem .36rem;
}
.title-icon3{
  width: .36rem;
  height: .36rem;
  background:url(https://red.manbu.xyz/red/rmhd.png);
  background-size: .36rem .36rem;
}
.title-icon4{
  width: .36rem;
  height: .36rem;
  background:url(https://red.manbu.xyz/red/hdzx.png);
  background-size: .36rem .36rem;
}
.title-left{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.title-name{
  font-size: .30rem;
  color: #363636;
  font-weight: bold;
  margin-left: .10rem;
}
.count{
  color: #9d9e9e;
  font-size: .24rem;
  margin-left: .10rem;
}
.count text{
  color: #35b5fe;
  padding: 0. 5rem;
}
.more{
  color: #a4a4a4;
  font-size: .28rem;
}
.content-wrap{
  width: 6.86rem;
  height: 2.06rem;
  background:url(https://red.manbu.xyz/red/centerbg.png);
  background-size: 6.86rem 2.06rem;
  padding: .30rem;
  box-sizing: border-box;
}
.font-time{
  color: #f6a86c;
  font-size:.24rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: .10rem;
}
.font-strong{
  font-size: .36rem;
  color: #1c3248;
  font-weight: bold;
}
.box .font-strong{
  color: #000000;
  font-size: .28rem;
}
.font-normal{
  font-size: .24rem;
  color: rgba(28, 50, 72, 0.4);
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: .10rem;
}
.location-icon{
  width: .18rem;
  height: .26rem;
  background:url(https://red.manbu.xyz/red/location.png);
  background-size: .18rem .26rem;
  margin-right: .10rem;
}
.font-small{
  color:rgba(28, 50, 72, 0.4);
  font-size: .18rem;
  display: table;
  padding: .10rem .20rem;
  border-radius: .30rem;
  background:#ddeefe;
  margin-top: .10rem;
}
.box-list{
  width: 100%;
  padding: 0 .30rem;
  box-sizing: border-box;
}
.news-list{
  padding-top: .30rem;
}
.box{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: .20rem;
  padding-bottom: .20rem;
  border-bottom: 1px solid #eeeeee;
}
.box-img{
  width: 2.11rem;
  height: 1.62rem;
  border-radius: .10rem;
  overflow: hidden;
}
.box-img image{
  width: 2.11rem;
  height: 1.62rem;
}
.font-normal{
  font-size: .24rem;
  color: rgba(28, 50, 72, 0.4);
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: .10rem;
}
.box-right{
  flex:1;
  overflow:hidden;
  margin-left: .20rem;
}

.bottom-group{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.eye-icon{
  width: .24rem;
  height: .19rem;
  background:url(https://red.manbu.xyz/red/eye.png);
  background-size: .24rem .19rem;
  margin-right: .10rem;
}
.hits{
  display: flex;
  flex-direction: row;
  align-items: center;
}
.score{
  color: #f78e32;
  font-size: .24rem;
}
.score text{
  font-size: .32rem;
  font-weight: bold;
}
.score.small text{
  font-size: .24rem;
}

.orderbtn{
  color: #3281f7;
  font-size:.22rem;
  display: table;
  padding:.06rem .16rem;
  border: 1px solid #3281f7;
  border-radius: .15rem;
}

.active .box{
  background: transparent;
  position: relative;
}
.font-time{
  color: #f6a86c;
  font-size:.24rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: .10rem;
}
.restbtn{
  width: 1.17rem;
  height: .40rem;
  background:url(https://red.manbu.xyz/red/restbtn.png);
  background-size: 1.17rem .40rem;
  margin-right: .10rem;
  color: #fff;
  font-size: .24rem;
  text-align: center;
  line-height: .40rem;
}
.active .font-small{
  background: transparent;
 border: 1px solid #b0bbc4;
}
.active-news{
  padding-bottom: .50rem;
}
.active-zx{
  width: 90%;
  margin: 0 auto;
  padding-bottom: .50rem;
}
.whitebg{
  width: 100%;
  background-color: #fff;
  border-top: .16rem #f7f7f7 solid;
  margin-top: .20rem;
}
.tab-nav{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.nav{
  color: #2A272E;
  font-size:.24rem;
  font-weight: bold;
  text-align: center;
  width: 33%;
  padding: .20rem 0 .10rem;
}
.border{
  height:. 4rem;
  background-color: #fff;
  width: 40%;
  margin: 0 auto;
  margin-top: .10rem;
}
.nav.selected{
  color: #1769F5;
}
.nav.selected .border{
  background-color: #1769F5;
}
.back-arrow{
  /*margin-left: .15rem;*/
  width: .51rem;
  height: .51rem;
  background:url(https://red.manbu.xyz/red/back-arrow.png) no-repeat center center;
  background-size: .18rem .32rem;
}
.flex-view{
  width: 100%;
  justify-content: space-between;
}

</style>