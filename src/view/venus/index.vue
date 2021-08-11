<template>
   <!--pages/venue/venue.wxml-->
<div class="ac-container">
  <div class="search-wrap">
    <!-- <picker class="pick-wrap" bindchange="bindPickerChange" value="{{id}}" range="{{objectArray}}" range-key="name">
      <div class="picker">
        {{objectArray[index].name}}
      </div>
    </picker> -->
    <div class="dropbtn" @click="showSelect">
    <div class="droptext">{{Postion_Name}}</div><div class="down-arrow"></div></div>
    <div class="search-box">
      <div class="search-icon"></div>
      <van-field class="weui-input"  v-model="content"  placeholder="输入搜索内容" />
      <div class="search-btn" @click="search">搜索</div>
    </div>
  </div>
  <!-- <div class="select-container {{showFlag === true?'show':''}}"> -->
  <div class="select-container">
     <div class="select-street">
     <div v-for="(item,index) in streeyArray" :key="index">
     <div v-if="item.selected" class="grid selected" @click="changeStreet">{{item.name}}</div>
     <div v-else class="grid" @click="changeStreet">{{item.name}}</div>
     </div>
     </div>
     <div class="select-community">
      <div v-for="(item2,index) in objectArray" :key="index">
        <div v-if="item.selected" class="grid selected" @click="changePot">{{item.name}}</div>
        <div v-else class="grid" @click="changePot">{{item.name}}</div>
     </div>
     </div>
    </div>
    <!--列表-->
  <div class="box-list">
    <div class="box" v-for="(item3,index) in activeArray" :key="index"  @click="geVenueDetail">
      <div class="box-img">
        <image mode="scaleToFill" :src="item3.venueImage"></image>
      </div>
      <div class="box-right">
        <div class="font-strong">{{item3.venueName}}</div>
        <div class="font-normal">
          <div class="location-icon"></div>
          <div class="address-info">{{item3.venueAddress}}</div>
        </div>
        <div class="right-bottom">
          <div class="font-small">距离您{{item3.distance}}km</div>
          <div class="grade small" v-if="item3.score==null"><text>暂无评分</text></div>
              <div class="grade" v-else><text>{{item3.score}}</text>分</div>
          <button class="applybtn" catchtap="goReservation" >立即预约</button>
        </div>
      </div>

    </div>
  </div>
</div>

</template>
<script>
export default {
    data(){
        return{
            activeArray:{},
      la:0,
      lo:0,
      Bmten:'0',
      bmNUmArray:[],
      PjArray:[],
      joinName:"",
      joinPhone:"",
      operName:"立即报名",
      ques:true,  
        }
    },
    methods:{
        showSelect(){
            console.log("showSelect")
        },
        search(){
            console.log("showSelect")
        },
        changeStreet(){
            console.log("showSelect")
        },
        changePot(){
            console.log("showSelect")
        },
        geVenueDetail(){
            console.log("geVenueDetail")
        }

    }
}
</script>

<style scoped>
/* pages/venue/venue.wxss */
.search-wrap{
  display: flex;
  flex-direction: row;
  background-color: #1769f5;
  padding: 0.10rem 0.20rem;
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
  width: 70%;
  padding: 0.10rem 0.20rem;
  border-radius: 0.30rem;
  justify-content: space-between;
}
.pick-wrap{
  width: 25%;
  color: #fff;
  font-size: 0.24rem;
}

.search-icon{
  width: 0.27rem;
  height: 0.27rem;
  background: url(https://red.manbu.xyz/red/search.png);
  background-size: 0.27rem 0.27rem;
}
.search-btn{
  width: 1.00rem;
  height: 0.50rem;
  background-color: #5d98fb;
  color: #fff;
  text-align: center;
  line-height: 0.50rem;
  border-radius: 0.25rem;
  font-size: 0.24rem;
}
.weui-input{
    width: 70%;
}

.venue{
  padding-top: 0.20rem;
}
.box-list{
  width: 100%;
  padding: 0.30rem 0.30rem 0;
  box-sizing: border-box;
}
.box{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 0.20rem;
  padding-bottom: 0.20rem;
  border-bottom: 1px solid #eeeeee;
}
.box-img{
  width: 20.11rem;
  height: 10.62rem;
  border-radius: 0.10rem;
  overflow: hidden;
}
.box-img image{
  width: 20.11rem;
  height: 10.62rem;
}
.box-right{
  margin-left: 0.20rem;
  flex:1;
  overflow:hidden;
}

.bottom-group{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.font-strong{
  font-size: 0.36rem;
  color: #1c3248;
  font-weight: bold;
}
.box .font-strong{
  color: #000000;
  font-size: 0.28rem;
}
.font-normal{
  font-size: 0.24rem;
  color: #b8b8b8;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 0.10rem;
  width:90%;
}

.location-icon{
  width: 0.18rem;
  height: 0.26rem;
  background:url(https://red.manbu.xyz/red/location.png);
  background-size: 0.18rem 0.26rem;
  margin-right: 0.10rem;
}
.address-info{
  flex:1;
  white-space: nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}
.font-small{
  color:#1C3248;
  font-size: 0.18rem;
  display: table;
  padding: 0.10rem 0.20rem;
  border-radius: 0.30rem;
  background:#F5F5F5;
  margin-top: 0.10rem;
}
.font-time{
  color: #f6a86c;
  font-size:0.24rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 0.10rem;
}
.restbtn:not([size='mini']){
  width: 10.17rem;
  height: 0.40rem;
  background:url(https://red.manbu.xyz/red/restbtn.png);
  background-size: 10.17rem 0.40rem;
  margin-right: 0.10rem;
  color: #fff;
  font-size: 0.24rem;
  text-align: center;
  line-height: 0.40rem;
}

.select-item{
  display: flex;
  flex-direction: row;
  height: 0.70rem;
  align-items: center;
}
.select-item .item{
  /* width: 50%; */
  display: flex;
  flex-direction: row;
  padding: 0 0 0 0.15rem;
}
.item text{
  font-size:0.24rem;
  color: #000;
}
.item .option{
  color: #bababa;
  font-size: 0.24rem;
}
.option-group{
  display: flex;
  margin-left: 0.10rem;
}
.option{
  padding: 0 0.10rem;
  border-right: 1px solid #eee;
}
.option:last-child{
  border-right: none;
}
.option.selected{
  color: #34b4fe;
}

.right-bottom{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 0.80rem;
}
.grade{
  color: #F78E32;
  font-size: 0.24rem;
  margin-left:0.15rem;
}
.grade text{
  font-size: 0.32rem;
  font-weight: bold;
}
.grade.small text{
  font-size: 0.24rem;
}
.applybtn:not([size='mini']){
  width: 10.17rem;
  height: 0.40rem;
  line-height: 0.40rem;
  margin-right: 0.10rem;
  color: #3281F7;
  font-size: 0.24rem;
  text-align: center;
  line-height: 0.40rem;
  padding: 0;
  border:1px solid #3281F7;
}
.picker{
  font-size:.28rem;
  font-weight:bold;
}

.bottom-fixed{
  width:100%;
  position:fixed;
  bottom: 0;
  left:0;
  background:#f4f4f4;
  padding:.30rem;
  box-sizing:border-box;
}
.confirm-btn {
  background-color: #1769f5;
  color: #fff;
  width: 90%;
  margin: 0 auto;
  height: .82rem;
}
.unconfirm-btn:not([size='mini']) {
  background-color: #CCCCCC;
  color: #fff;
  width: 90%;
  margin: 0 auto;
  height: .82rem;
}
.dropbtn{
  width: 26%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-right: .20rem;
  position:relative;
}
.droptext{
  color: #fff;
  font-size: .28rem;
  font-weight:bold;
  white-space: nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
  width: 94%;
}
.down-arrow{
  width: .22rem;
  height: .12rem;
  background:url(https://red.manbu.xyz/red/down-arrow.png);
  background-size: .22rem .12rem;
  margin-right: .20rem;
}
.down-arrow{
  position:absolute;
  top: .15rem;
  right: 0;
  z-index: 99;
}
.select-container{
  position:absolute;
  left: 0;
  top: .86rem;
  background-color: #fff;
  display: none;
  z-index:999;
}
.select-container.show{
  display: flex;
  flex-direction: row;
  width: 100%;

}
.select-street{
  width: 2.00rem;
  background: #F8F8F8;
}
.select-street .grid{
  height: .80rem;
  padding-left: .20rem;
  line-height: .80rem;
  font-size: .24rem;
  color: #2A272E;
}

.select-street .grid.selected{
  border-left:.04rem #1769f5 solid;
  background-color: #fff;
  color: #1769F5;
}
.van-cell{
    padding: 0;
}
.weui-input{
    width: 70%;
    background-color: #c8dbfd;
}
.weui-input ::-webkit-input-placeholder {
  color: #90949f;
  font-weight: 400;
}

/* Firefox 4-18 */
.weui-input :-moz-placeholder {
  color: #90949f;
  font-weight: 400;
}

/* Firefox 19-50 */
.weui-input ::-moz-placeholder {
  color: #90949f;
  font-weight: 400;
}

/* - Internet Explorer 10–11
- Internet Explorer Mobile 10-11 */
.weui-input :-ms-input-placeholder {
  color: #90949f !important;
  font-weight: 400 !important;
}

/* Edge (also supports ::-webkit-input-placeholder) */
.weui-input ::-ms-input-placeholder {
  color: #90949f;
  font-weight: 400;
}

/* CSS Working Draft */
.weui-input ::placeholder {
  color: #90949f;
  font-weight: 400;
}
</style>