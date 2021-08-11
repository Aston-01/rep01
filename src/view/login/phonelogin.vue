<template>
  <div>
    <div class="container">
      <div class="wrap">
        <img src="https://red.manbu.xyz/red/logo.png" alt class="index-img" mode="scaleToFill" />
        <div class="app-name">红色十二时辰</div>

        <div class="form">
          <div class="line">
            <van-field
              type="text"
              v-model="tel"
              required 
              class="phone"
              placeholder="输入手机号码"
             
            />
          </div>
          <div class="line">
            <van-field
              type="text"
              class="verify"
              required
              placeholder="输入验证码"
              maxlength="6"
              v-bind="inputCode"
            />
            <van-button @click="getCode" class="getcode" :disabled="isDisabled">{{title}}</van-button>
          </div>
          <van-button class="loginbtn" @click="login">登录</van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as api from '@/api/auth';
import { Toast } from 'vant';
import {formatTime} from '@/utils/utils'
import {Local} from '@/utils/storage'

export default {
  data() {
    return {
      tel: "",
      code: "",
      isOld: "",
      inputCode: "",
      title: "发送验证码", // 按钮中显示的字符
      titleConst: "发送验证码", // 重置后的按钮中显示的字符
      count: 60, // 倒计时的秒数
      countConst: 60, // 重置后的倒计时的秒数
      isDisabled: false // 按钮是否禁用
    };
  },

  methods: {
    getCode() {
        if(this.tel.length != 11){
            Toast("请输入正确的手机号")
        }
        this.countdown1();
        let reqParam = {
            tel:this.tel
        }
        api.getCode(reqParam).then(res => {
            console.log(res,"验证码,.......")
            this.code = res.msg
        })
    },
    login(){
        let reqParam = {
            tel:this.tel,
            timestamp:formatTime(new Date())
        }
        console.log(reqParam,'........');
        api.login(reqParam).then(res => {
            if(res.code === 200){
                Local.set('token',res.msg);
                Local.set("userPhone",this.tel);
                this.$router.push("/index");
            }
        })
    },
    countdown1: function(){
    let that = this;
    let count = this.count;
    // 当count不为0开始倒计时，当count为0就关闭倒计时
    // 设置定时器
    var countdown = setInterval(function(){
      if( count == 0 ){

          this.title= that.titleConst;
          this.count= that.countConst;
          this.isDisabled=false
        // 取消定时器
        clearInterval(countdown);
      } else {
          this.title = count-- + "s后重试";
          this.isDisabled = true
      }
    }, 1000);
  },
  }
};
</script>

<style>
/* pages/login/phonelogin.wxss */
/* pages/login/login.wxss */
.container {
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

.app-name {
  text-align: center;
  margin-bottom: 1.20rem;
  color: #000;
  font-size: .32rem;
  font-weight: bold;
}


.loginbtn {
  width: 90%;
  height: .82rem;
  font-weight: normal;
  font-size: .28rem;
  background: #1769f5;
  color: #fff;
  padding: 0;
  line-height: .82rem;
  margin: .60rem auto 0;
  display: block;
}
.line {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid #e5e5e5;
  width: 90%;
  margin: 0 auto;
  height: .82rem;
  align-items: center;
}
.van-cell{
    padding: 0 16px;
}
.getcode {
  width: 35%;
  background-color: transparent;
  font-size: .28rem;
  color: #1769f5;
  margin: 0;
  height: .82rem;
  line-height: .82rem;
  padding: 0;
  border:none
}
.line input {
  height: .82rem;
}
.input {
  color: #d4d4d4;
  font-size: .28rem;
}
</style>
