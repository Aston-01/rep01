<template>
  <!--pages/store/changeDetail.wxml-->
  <div>
<div class="detail-wrap" v-for="(item,index) in uscoreArray" :key="index">
 <div class="change-top">
 <!-- 成功 -->
 <div class="change-icon1" v-if="item.goodsGetStatus=='1'"></div>
  <!-- 失败 -->
  <div class="change-icon2" v-if="item.goodsGetStatus=='0'"></div>
 </div>
 <div class="goods-info">
  <div class="record-item">
    <div class="coin"></div>
    <div class="record-info">
      <div class="title"><span>{{item.goodsName}}</span></div>
     
    </div>
    <div class="right-info">
      <div class="grade">-{{item.goodsScore}}</div>
    </div>
    <div class="right-arrow"></div>
  </div>
  <div class="exchange-info"  v-if="item.goodsGetStatus=='0'" >
   <div class="ex-title">商品兑换码</div>
   <div class="code">{{item.goodsNumber}}</div>
   <div class="ex-title">商品兑换地址</div>
   <div class="address">{{item.goodsAddr}}</div>
  </div>
 </div>
 <div class="change-info">
  <div class="title">兑换信息</div>
  <div class="line">
   <span>兑换时间</span>
   <span>{{item.useTime}}</span>
  </div>
 </div>
 <div class="get-info" v-if="item.goodsGetStatus=='1'">
  <div class="title">领取信息</div>
  <div class="line">
   <span>领取时间</span>
   <span>{{item.goodsGetTime}}</span>
  </div>
  <div class="line">
   <span>领取地址</span>
   <span>{{item.goodsAddr}}</span>
  </div>
 </div>
</div>
</div>

</template>

<script>
import * as api from "@/api/content";
import { Toast } from 'vant';
export default {
  created(){
    this.getUScoreInfo(this.$route.query.user_id);
  },
    data(){
        return{
            status:'fail',
            uscoreArray:[],
        }
    },
    methods:{
      getUScoreInfo(id){
        var that=this;
        var data={wxUserId:1,useId:id};
        api.ScoreListUrl(data).then((res) => {
          // console.log(res);
          if(res.code == 200){
            that.uscoreArray = res.data;
          }else{
            Toast(res.msg);
          }
        })
      }
    }
}
</script>


<style scoped>
/* pages/store/changeDetail.wxss */
page{
  background-color: #f7f7f7;
}
.change-top{
  width: 100%;
  height: 3.62rem;
  background: url(https://red.manbu.xyz/red/edTop.png);
  background-size: 100% 3.62rem;
}
.change-icon1{
  width: 3.11rem;
  height: 2.58rem;
  background: url(https://red.manbu.xyz/red/success-icon.png);
  background-size: 3.11rem 2.58rem;
  margin: 0 auto;
}
.change-icon2{
  width: 3.11rem;
  height: 2.58rem;
  background: url(https://red.manbu.xyz/red/unget-icon.png);
  background-size: 3.11rem 2.58rem;
  margin: 0 auto;
}
.coin{
  width: .62rem;
  height: .62rem;
  background: url(https://red.manbu.xyz/red/icon-coin.png);
  background-size: .62rem .62rem;
}
.record-item{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  height: 1.27rem;
  width: 100%;
  margin: 0 auto;
  align-items: center;
  position: relative;
  background: #fff;
  box-sizing: border-box;
}
.record-info{
  margin-left: .20rem;
  width: 70%;
}
.title{
  color: #000;
  font-size: .28rem;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}
.right-info{
  margin-left: .20rem;
}
.time,.street{
  color: #808080;
  font-size: .24rem;
}
.grade{
  color: #34b4fd;
  font-size: .28rem;
}
.goods-info{
  background-color: #fff;
  width: 90%;
  margin: -1.00rem auto 0;
  align-items: center;
  position: relative;
  background: #fff;
  border-radius: .20rem;
  padding: 0 .20rem .20rem;
  box-sizing: border-box;
  
}
.change-info,.get-info{
  width: 90%;
  margin: .20rem auto 0;
  align-items: center;
  position: relative;
  background: #fff;
  border-radius: .20rem;
  padding: .20rem .20rem;
  box-sizing: border-box;
}
.title{
  color: #000;
  font-size: .28rem;
}
.line{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.line span{
  color: #808080;
  font-size: .24rem;
  height: .40rem;
  line-height: .40rem;
}
.ex-title{
  font-size: .24rem;
  color: #808080;
  text-align: center;
  margin-top: .20rem;
}
.code{
  color: #000000;
  text-align: center;
  font-size: .42rem;
}
.address{
  color: #000;
  font-size: .24rem;
  text-align: center;
}

</style>