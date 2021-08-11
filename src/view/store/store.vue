<template>
  <!--pages/store/store.wxml-->
  <div class="store-container">
    <div class="top">
      <div class="search-wrap">
        <div class="p-r">
          <!-- <picker class="pick-wrap" bindchange="bindPickerChange" value="{{id}}" range="{{objectArray}}" range-key="name">
          <div class="picker">
            {{objectArray[index].name}}
          </div>
        </picker> -->
        <van-field readonly class="input-index" clickable :value="streetValue" placeholder="选择街道" @click="showPicker = true" style="color:#fff;"/>
            <van-popup v-model="showPicker" round position="bottom">
                <van-picker show-toolbar :columns="objectArray" @cancel="showPicker = false" @confirm="onConfirm" />
            </van-popup>
          <div class="down-arrow"></div>
        </div>
        <div class="search-box">
          <div class="search-icon"></div>
          <van-field
            class="weui-input"
            v-model="content"
            style="background-color:#c8dbfd;"
            placeholder="输入搜索内容"
          ></van-field>
          <div class="search-btn" @click="search">搜索</div>
        </div>
      </div>
      <div class="banner">
        <div class="grade" @click="goScore">
          <div class="icon-store1"></div>
          <div class="detail">{{ score }}</div>
          <div class="icon-store2"></div>
        </div>
        <div class="title">我的可用积分</div>
        <div class="go-btn" @click="goInfo">兑换记录</div>
      </div>
    </div>
    <div class="goods-list">
      <div class="goods-item" v-for="(item, index) in shopArray" :key="index">
        <div v-if="'1' == item.goodsType">
          <div class="all-flag">{{ item.streetName }}</div>
        </div>
        <div v-else>
          <div class="street-flag">{{ item.streetName }}</div>
        </div>
        <div class="goods-img">
          <img :src="item.goodsPicture" />
        </div>
        <div class="name">{{ item.goodsName }}</div>
        <div class="cost">{{ item.pointPrice }}积分</div>
        <div
          class="goods-bottom"
          v-if="'1' == item.isExchange && item.usableStock != 0"
        >
          <div class="rest">剩余{{ item.usableStock }}件</div>
          <div class="exchange" @click="goExchange(item.goodsId)">
            立即兑换
          </div>
        </div>
        <div class="goods-bottom" v-else>
          <div class="rest">剩余{{ item.usableStock }}件</div>
          <div class="cant-exchange">立即兑换</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as api from "@/api/content";
import * as common from "@/api/common";
import { Toast } from 'vant';
import {
    Local
} from "@/utils/storage";
export default {
  created() {
    var that = this;
    var data = { name: "streetAll", id: 110 };
    common.getStreet(data).then((res) => {
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
                            this.getScore(res.data.deptId);
                            this.getShop(res.data.deptId);
                            Local.set("street_id_Now", deptId);
                        }
                    }
                    // console.log(deptId,'00000000');
                    deptId = 103;
                    this.index = 103;
                } else {
                    Toast(res.msg);
                }
            });
    });
  },
  data() {
    return {
      streetValue:"",
      showPicker: false,
      objectArray: [],
      objectList:[],
      index: 0,
      score: "0",
      allscore: "0",
      shopArray:[],
      // shopArray: [{goodsId:'10',goodsType:'1',streetName:'巧英街道',goodsName:'name',pointPrice:'123',isExchange:'1',usableStock:'2'}],
      content: "",
    };
  },
  methods: {
    getScore() {
      var that = this;
      var data = {};
      api.getScore(data).then((res) => {
        // console.log(res);
        if (res.code == 200) {
          if (res.data.length > 0) {
            that.score = res.data[0].validScore;
            that.allscore = res.data[0].getScore;
          } else {
            that.score = 0;
            that.allscore = 0;
          }
        } else {
          Toast(res.msg);
        }
      });
    },
    getShop() {
      var that = this;
      var data = {};
      api.shopfoUrl(data).then((res) => {
        console.log(res);
        if (res.code == 200) {
          that.shopArray = res.data;
        } else {
          Toast(res.msg);
        }
      });
    },
    search(){
      var i=String(this.index);
      this.getShop(i);
    },
    goScore(){
      this.$router.push('/points');
    },
    goInfo(){
      this.$router.push('/exchangeRecord');
    },
    goExchange(e){
      console.log(e);
      this.$router.push({
        path:'/produce',
        query:{
          good_id:e,
          score:this.score
        }
      });
    },
    onConfirm(value) {
      this.value = value;
      this.showPicker = false;
      this.streetValue = value.name;
      var jj = value.id;
      this.getScore(jj);
      this.getShop(jj);
      this.index = value.value;
      Local.set("street_id_Now", jj);
    },
  },
};
</script>

<style>
.van-field__control {
    color: #fff ;
}
</style>
<style scoped>
/* pages/store/store.wxss */
page {
  background-color: #f7f7f7;
}
.van-field {
    background-color: #1769f5;
}
.search-wrap {
  display: flex;
  flex-direction: row;
  padding: 10px 10px 20px;
  align-items: center;
  width: 100%;
  height: 50px;
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
  width: 100%;
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

.top {
  width: 100%;
  height: 3.87rem;
  background: url(https://red.manbu.xyz/red/bannerbg.png);
  background-size: 100% 3.87rem;
}
.banner {
  width: 6.86rem;
  height: 2.53rem;
  background: url(https://red.manbu.xyz/red/banner.png);
  background-size: 6.86rem 2.53rem;
  margin: 0.2rem auto 0;
}
.icon-store1 {
  width: 0.36rem;
  height: 0.27rem;
  background: url(https://red.manbu.xyz/red/icon-store1.png);
  background-size: 0.36rem 0.27rem;
}
.icon-store2 {
  width: 0.18rem;
  height: 0.25rem;
  background: url(https://red.manbu.xyz/red/icon-store2.png);
  background-size: 0.18rem 0.25rem;
}
.street-flag {
  width: 1.36rem;
  height: 0.4rem;
  background: url(https://red.manbu.xyz/red/street-flag.png);
  background-size: 1.36rem 0.4rem;
  color: #fff;
  font-size: 0.24rem;
  text-align: center;
  position: absolute;
  top: 0;
  left: 0;
}
.all-flag {
  width: 1.36rem;
  height: 0.4rem;
  background: url(https://red.manbu.xyz/red/all-flag.png);
  background-size: 1.36rem 0.4rem;
  color: #fff;
  font-size: 0.24rem;
  text-align: center;
  position: absolute;
  top: 0;
  left: 0;
}
.exchange {
  width: 1.46rem;
  height: 0.56rem;
  background: url(https://red.manbu.xyz/red/exchange.png);
  background-size: 1.46rem 0.56rem;
  color: #fff;
  font-size: 0.24rem;
  text-align: center;
  line-height: 0.5rem;
}

.cant-exchange {
  width: 1.46rem;
  height: 0.56rem;
  background: url(https://red.manbu.xyz/red/exchange-grey.png);
  background-size: 1.46rem 0.56rem;
  color: #fff;
  font-size: 0.24rem;
  text-align: center;
  line-height: 0.5rem;
}
.goods-img image {
  width: 3rem;
  height: 3rem;
}
.grade {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0.35rem 0 0;
}
.detail {
  font-size: 0.4rem;
  color: #fff;
  margin: 0 0.2rem;
}
.title {
  font-size: 0.24rem;
  color: #fff;
  text-align: center;
}
.go-btn {
  background: #fff;
  color: #f88d51;
  font-size: 0.24rem;
  text-align: center;
  display: table;
  margin: 0.1rem auto;
  padding: 0.05rem 0.15rem;
  border-radius: 0.2rem;
}
.goods-list {
  background-color: #f7f7f7;
  width: 100%;
  margin: -1rem auto 0;
  border-radius: 0.3rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  box-sizing: border-box;
  padding: 0.3rem;
  min-height: 5rem;
}
.goods-list .goods-item {
  background-color: #fff;
  width: 48%;
  position: relative;
  overflow: hidden;
  border-top-left-radius: 0.2rem;
  border-top-right-radius: 0.2rem;
  padding: 0.1rem;
  box-sizing: border-box;
  margin-bottom: 0.3rem;
}
.name {
  color: #363636;
  font-size: 0.28rem;
}
.cost {
  color: #f57523;
  font-size: 0.28rem;
}
.goods-bottom {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  padding-bottom: 0.1rem;
}
.rest {
  color: #a4a4a4;
  font-size: 0.24rem;
}

.weui-input {
  width: 70%;
}
.van-cell {
  padding: 0;
}

</style>