<template>
  <!--pages/store/produce.wxml-->
<div class="product">
  <div class="top">
    <div class="product-img">
    <div v-if="shopDetailArray.goodsType=='1'">
      <div class="all-flag">全区</div>
    </div>
    <div  v-else>
      <div class="street-flag">{{shopDetailArray.streetName}}</div>
    </div>
      <img  :src="shopDetailArray.goodsPicture" />
    </div>
    <div class="info">
    <div class="cost">
    <div class="left">
      <div class="height-light">
        <div class="strong">{{shopDetailArray.pointPrice}}</div><div>积分</div>
      </div>
      <div class="all-grade">（可用积分:{{score}}分)</div>
    </div>
      <div class="rest">剩余{{shopDetailArray.usableStock}}件</div>
    </div>
    <div class="name">{{shopDetailArray.goodsName}}</div>
    <div class="location">
     <div class="location-icon"></div> 
     <div class="address-info">{{shopDetailArray.exchangeLocation}}</div>
    </div>
  </div>
  </div>
   <div class="explain">
    <div class="title">兑换说明</div>
    <div class="e-container">{{shopDetailArray.exchangeExplain}}</div>
   </div>
   <div  class="bottom-fixed" v-if="shopDetailArray.usableStock==0">
    <van-button class="confirm-btn" style="background:#a4a4a4" >立即兑换</van-button>
   </div>
   <div  class="bottom-fixed" v-else>
    <van-button class="confirm-btn" @click="goCheck">立即兑换</van-button>
   </div>
</div>
</template>

<script>
import * as api from "@/api/content";
import { Toast } from 'vant';
export default {
  created(){
    this.score = this.$route.query.score;
    this.getShopDetail(this.$route.query.good_id);
  },
    data(){
        return{
          score:"0",
          shopDetailArray:{},
          // shopDetailArray:{goodsType:'1',goodsPicture:require('../assets/1.jpg'),streetName:'巧英街道',pointPrice:'123',usableStock:'1',goodsName:'name',exchangeLocation:'address',exchangeExplain:'explain',}, 
        }
    },
    methods:{
      goCheck(){
        this.$router.push({
        path:'/produceConfirm',
          query:{
            jsonStr:this.shopDetailArray
          }
        })
      },
      getShopDetail(id){
        var that=this;
        var data={goodsId:id};
        api.shopDetailUrl(data).then((res) => {
          console.log(res);
          if(res.code == 200){
            that.shopDetailArray = res.data;
          }else{
            Toast(res.msg);
          }
        })
      }
    }
}
</script>


<style scoped>
/* pages/store/produce.wxss */
.street-flag{
  width: 1.36rem;
  height: .40rem;
  background: url(https://red.manbu.xyz/red/street-flag.png);
  background-size: 1.36rem .40rem;
  color: #fff;
  font-size: .24rem;
  text-align: center;
  position: absolute;
  top: 0;
  left: 0;
}


.all-flag{
  width: 1.36rem;
  height: .40rem;
  background: url(https://red.manbu.xyz/red/all-flag.png);
  background-size: 1.36rem .40rem;
  color: #fff;
  font-size: .24rem;
  text-align: center;
  position: absolute;
  top: 0;
  left: 0;
}

.explain{
  border-top: .10rem solid #f4f4f4;
  padding: .30rem;
  box-sizing: border-box;
}
.title{
  font-size: .27rem;
  color: #2a272e;
}
.e-container{
  white-space:pre-wrap;
  color: #808080;
  font-size: .24rem;
}
.confirm-btn:not([size='mini']) {
  background-color: #1769f5;
  color: #fff;
  margin-top: .70rem;
  width: 90%;
  margin: .70rem auto 0;
  height: .82rem;
  display: block;
}
.info{
  padding: 0 .20rem .30rem;
}
.cost{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.left{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.height-light{
  color: #f57523;
  font-size: .24rem;
  display: flex;
  align-items: center;
}
.height-light .strong{
  font-size: .52rem;
}
.all-grade{
  color: #b0b0b0;
  font-size: .24rem;
}
.rest{
  color: #1769f5;
  font-size: .24rem;
}
.name{
  color: #000;
  font-size: .32rem;
}
.location{
  color: #808080;
  font-size: .24rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-top: .10rem;
}
.location-icon{
  width: .18rem;
  height: .26rem;
  background:url(https://red.manbu.xyz/red/location2.png);
  background-size: .18rem .26rem;
  margin-right: .10rem;
}
.product-img img{
  width: 3.20rem;
  height: 2.50rem;
  margin: 0 auto;
  display: block;
}

</style>