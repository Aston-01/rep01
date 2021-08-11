<template>
  <div>
    <!--pages/login/login.wxml-->
<div class="container">
 
 <div class="wrap">
   <img class="index-img"
     src="https://red.manbu.xyz/red/logo.png" />
  <div  class="app-name">红色十二时辰</div>
   
   <!-- <van-button class="indexbtn" open-type="getUserInfo" bindgetuserinfo="bindGetUserInfo" v-if="{{getPhoneNumberReady}}">昵称头像授权</van-button> -->
   <van-button type="primary"  class="indexbtn"  >昵称头像授权</van-button>
   <!-- <van-button class="indexbtn"  v-else>微信一键登录</van-button> -->
   <!-- <van-button class="login-btn"  v-if="{{getPhoneNumberReady}}" @click="cancel">取消</van-button> -->
   <van-button class="login-btn" @click="goPhoneLogin">手机验证码登录</van-button>


   <!-- <van-button class="indexbtn"  bindtap="getCode"></van-button> -->
 </div>

</div>
  </div>
</template>

<script>


export default {
  

  data() {
    return {
      userInfo: {},
        hasUserInfo: false,
        // canIUse: wx.canIUse('van-button.open-type.getUserInfo'),
        getPhoneNumberReady:false,
        phonenumber:"",
    };
  },

  methods: {
    goPhoneLogin(){
        console.log('登录');
        this.$router.push('phoneLogin');
    }
  }
};
</script>

<style>
/* pages/login/login.wxss */
.container{
  width: 100%;
}
.wrap {
  padding-top: .90rem;
  width: 100%;
}
.index-img {
  width: 2.00rem;
  height: 2.30rem;
  margin: 0 auto;
  display: block;
}

.app-name{
  text-align: center;
  margin-bottom: 1.20rem;
  color: #000;
  font-size: .32rem;
  font-weight: bold;
}
.indexbtn:not([size='mini']) {
  width: 6.80rem;
  height: .82rem;
  display: block;
  margin: 0 auto;
  background-color: #17bd67;
  color: #fff;
  font-weight: normal;
  font-size: .28rem;
}
.login-btn{
  width:6.80rem;
  height:.82rem;
  border: 1px solid #8c8c8c;
  background-color: #fff;
  margin: 0.30rem auto 0;
  display: block;
}


</style>
