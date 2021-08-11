<template>
  <!--pages/store/exchangeRecord.wxml-->
<div class="record-wrap">
  <div class="record-item" v-for="(item,index) in uscoreArray" @click='call1(item.useId)' :key="index">
    <div class="coin"></div>
    <div class="record-info">
      <div class="title" v-if="1==item.goodsGetStatus">
      <text>{{item.goodsName}}</text><div class="icon-green"></div>
      </div>
      <div class="title" v-else>
      <text>{{item.goodsName}}</text><div class="icon-red"></div>
      </div>
      <div class="time">{{item.useTime}}</div>
    </div>
    <div class="right-info">
      <div class="grade">-{{item.goodsScore}}</div>
    </div>
    <div class="right-arrow"></div>
  </div>
</div>
</template>

<script>
import * as api from "@/api/content";
import { Toast } from 'vant';
export default {
  created(){
    this.getUScoreInfo();
  },
    data(){
        return{
              uscoreArray:[],
        }
    },
    methods:{
      call1(e){
        // console.log(e);
        this.$router.push({
        path:'/changeDetail',
          query:{
            user_id:e
          }
        });
      },
      getUScoreInfo(){
        var that=this;
        var data={};
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

/* pages/store/exchangeRecord.wxss */
.coin{
  width: .62rem;
  height: .62rem;
  background: url(https://red.manbu.xyz/red/icon-coin.png);
  background-size: .62rem .62rem;
}
.icon-green{
  width: .70rem;
  height: .24rem;
  background: url(https://red.manbu.xyz/red/icon-green.png);
  background-size: .70rem .24rem;
}
.icon-red{
  width: .70rem;
  height: .24rem;
  background: url(https://red.manbu.xyz/red/icon-red.png);
  background-size: .70rem .24rem;
}
.record-item{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  height: 1.27rem;
  width: 90%;
  margin: 0 auto;
  border-bottom: 1px solid #f4f4f4;
  align-items: center;
  position: relative;
}
.record-info{
  margin-left: .20rem;
  width: 60%;
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
.right-arrow{
  width: .12rem;
  height: .21rem;
  background: url(https://red.manbu.xyz/red/leftmore.png);
  background-size: .12rem .21rem;
  position: absolute;
  right: 0;
  top: .50rem;
}
</style>