<template>
    <div class="mine">
        <div class="topinfo">
            <div v-if="userLogo!=''&&userLogo!=null">
                <img class="avater2" :src="userLogo" />
            </div>
            <div v-else>
            <div class="avater"></div>
            </div>
            <div class="user-name">{{name}}</div>
            <div class="info-group">
            <div class="item">
                <div class="icon-phone"></div>
                <div class="word">{{userPhone}}</div>
            </div>
            <div class="item">
                <div class="icon-score"></div>
                <div class="word" @click="goScore">我的可用积分:{{score}}分 ></div>
            </div>
            </div>
            <div class="item-list">
            <div class="item" @click="myVenue">
                <div class="icon1"></div>
                <div class="item-name">场馆预约 <div class="count count1">{{venueNum}}</div>
                </div>
            </div>
            <div class="item" @click="goActive">
                <div class="icon2"></div>
                <div class="item-name">活动报名 <div class="count count2">{{activeNum}}</div>
                </div>
            </div>
            <div class="item" @click="goShop">
                <div class="icon3"></div>
                <div class="item-name">商品兑换 <div class="count count3">{{shopNum}}</div>
                </div>
            </div>
            </div>
        </div>

        <div class="bottom-menu">
            <div class="nav">
            <div class="menu-line" @click="changeInfo">
                <div class="menu-icon1"></div>
                <span>设置</span>
                <div class="right-arrow"></div>
            </div>
            <div class="menu-line" @click="loginOut">
                <div class="menu-icon2"></div>
                <span>退出登录</span>
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
    this.getMyinfo();
    this.getScore();
  },
  data(){
        return{
            name:"",
            userPhone:"",
            userLogo:'',
            score:"",
            allscore:"",
            venueNum:"",
            activeNum:"",
            shopNum:"",
        }
  },
    methods:{
      getMyinfo() {
        var that=this;
        var data={};
        api.getMyInfo(data).then((res) => {
          // console.log(res);
          if(res.code == 200){
            that.name = res.username;
            that.userPhone = res.userphone;
            that.userLogo = res.userLog;
            that.venueNum = res.venueNum;
            that.activeNum = res.activeNum;
            that.shopNum = res.shopNum;
          }else{
            Toast(res.msg);
          }
        })
      },
      getScore(){
        var that=this;
        var data={};
        api.getScore(data).then((res) => {
          // console.log(res);
          if(res.code == 200){
            that.score = res.data[0].validScore;
            that.allscore = res.data[0].getScore;
          }else{
            Toast(res.msg);
          }
        })
      },
        goScore(){
            this.$router.push({
                path:'/points',
            });
        },
        myVenue(){
            this.$router.push({
                path:'/myVenue',
            })
        },
        goActive(){
            this.$router.push({
                path:'/myVenue',
            })
        },
        goShop(){
            this.$router.push({
                path:'/myVenue',
            })
        },
        changeInfo(){
            this.$router.push('/setup')
        },
        loginOut(){
            sessionStorage.clear();
            this.$router.push('/login')
        },
    }
}
</script>


<style scoped>
page{
  background-color: #f7f7f7;
}
.mine{
  width: 100%;
  background: url(https://red.manbu.xyz/red/minebg.png) top center no-repeat;
  background-size: 100% auto;
  padding-top: 40px;
}
.avater{
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background:  url(https://red.manbu.xyz/red/avater.png) no-repeat center center;
  background-size: 100% 100%;
  margin:  0 auto;
}
.avater2{
  width: 59px;
  height: 55px;
  border-radius: 50%;
  background:  #C1D4E5;
  background-size: 100% 100%;
  padding: 5px;
  margin:  0 auto;
}
.user-name{
  display: table;
  margin: 0 auto;
  background:  url(https://red.manbu.xyz/red/namebg.png) no-repeat center center;
  background-size: 100% 100%;
  padding: 5px 30px;
  color: #fff;
  font-size: 20px;
}

.icon-phone{
  width: 11px;
  height: 11px;
  background:  url(https://red.manbu.xyz/red/phone.png) no-repeat center center;
  background-size: 100% 100%;
}
.icon-score{
  width: 11px;
  height: 11px;
  background:  url(https://red.manbu.xyz/red/score.png) no-repeat center center;
  background-size: 100% 100%;
}
.icon1{
  width: 41px;
  height: 41px;
  background:  url(https://red.manbu.xyz/red/icon1.png) no-repeat center center;
  background-size: 100% 100%;
}
.icon2{
  width: 41px;
  height: 41px;
  background:  url(https://red.manbu.xyz/red/icon2.png) no-repeat center center;
  background-size: 100% 100%;
}
.icon3{
  width: 41px;
  height: 41px;
  background:  url(https://red.manbu.xyz/red/icon3.png) no-repeat center center;
  background-size: 100% 100%;
}

.menu-icon1{
  width: 20px;
  height: 20px;
  background:  url(https://red.manbu.xyz/red/share.png) no-repeat center center;
  background-size: 100% 100%;
}

.menu-icon2{
  width: 18px;
  height: 16px;
  background:  url(https://red.manbu.xyz/red/loginOut.png) no-repeat center center;
  background-size: 100% 100%;
}

.topinfo{
  width: 90%;
  margin: 0 auto;
  background:#fff;
  border-radius: 10px;
  position: relative;
  padding: 37px 0 10px 0;
}
.avater{
  position: absolute;
  top: -32px;
  left: 50%;
  margin-left: -32px;
}
.avater2{
  position: absolute;
  top: -32px;
  left: 50%;
  margin-left: -32px;
}
.info-group{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px dotted #e9e8e9;
  padding-bottom: 8px;
}
.info-group .item{
  padding-top: 10px;
  display: flex;
  flex-direction: row;
  width: 50%;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.word{
  color: #999;
  font-size: 10px;
  margin-left: 5px;
}

.item-list{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 10px;
}
.item-list .item{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 33%;
}
.item-name{
  color: #808080;
  font-size: 12px;
  text-align: center;
  padding: 4px 0;
  position: relative;
}
.count{
  display: flex;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: -20px;
  top: -5px;
  color: #fff;
  font-weight: bold;
}
.count1{
  background: #f7c810;
}
.count2{
  background: #56c1ff;
}
.count3{
  background: #ff8f8d;
}

.bottom-menu{
  width: 100%;
  margin-top: 15px;
  background: #fff;
  padding: 15px;
  box-sizing: border-box;
}
.title{
  font-size: 14px;
  color: #363636;
  height: 35px;
  border-bottom:  1px solid #edf0f5;
}
.menu-line{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  height: 53px;
  line-height: 53px;
  align-items: center;
  border-bottom:  1px solid #edf0f5;
  position: relative;
  
}
.menu-line span{
  margin-left: 5px;
  color: #808080;
  font-size: 14px;
}
.right-arrow{
  width: 7px;
  height: 12px;
  background:  url(https://red.manbu.xyz/red/right-arrow.png) no-repeat center center;
  background-size: 100% 100%;
  position:absolute;
  right: 5px;
  top: 20px;
}
</style>