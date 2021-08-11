<template>
  <div class="points">
    <div class="points-top">
      <div class="top-info">
        <div class="left">
          <div class="coin"></div>
          <div class="font-small">可用积分：</div>
          <div class="font-big">
            <span>{{ score }}</span
            >分
          </div>
        </div>
        <div class="right">
          <div class="font-small">累计积分：</div>
          <div class="font-small">
            <span>{{ allscore }}</span
            >分
          </div>
        </div>
      </div>
    </div>
    <div class="points-detail">
      <div
        v-for="(item, index) in scoreArray"
        @click="call1(item.deptId)"
        :key="index"
      >
        <div class="item">
          【{{ item.deptName }}】可用积分<span>{{ item.validScore }}</span
          >分
          <div class="right-arrow"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as api from "@/api/content";
import { Toast } from 'vant';
export default {
  created() {
    this.getScoreDetail();
    this.getScoreALL();
  },
  data() {
    return {
      score: "",
      allscore: "",
      scoreArray: [
      ],
    };
  },
  methods: {
    getScoreDetail() {
      var that=this;
        var data={isAll:"0"};
        api.getdetailList(data).then((res) => {
          // console.log(res);
          if(res.code == 200){
            that.score = res.data[0].validScore;
            that.allscore = res.data[0].getScore;
            that.scoreArray = res.data
          }else{
            Toast(res.msg);
          }
        })
    },
    getScoreALL(){
      var that=this;
        var data={};
        api.getScore(data).then((res) => {
          // console.log(res);
          if(res.code == 200){
            if(res.data.length>0){
              that.score = res.data[0].validScore;
              that.allscore = res.data[0].getScore;
            }else{
              that.score = 0;
              that.allscore = 0;
            }
          }else{
            Toast(res.msg);
          }
        })
    },
    call1(e) {
      this.$router.push({
        path: "/pointDetail",
        query: {
          "deptId": e,
        },
      });
    },
  },
};
</script>


<style scoped>
page {
  background-color: #f4f4f4;
}
.points-top {
  width: 100%;
  height: 134px;
  background: url(https://red.manbu.xyz/red/jfbg.png);
  background-size: 100% 134px;
}
.top-info {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 94%;
  margin: 0 auto;
}
.coin {
  width: 21px;
  height: 15px;
  background: url(https://red.manbu.xyz/red/points-coin.png);
  background-size: 21px 15px;
  margin-right: 5px;
}

.left,
.right {
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #fff;
  font-size: 12px;
  padding: 10px;
}
.font-big span {
  font-size: 18px;
  font-weight: bold;
}
.points-detail {
  width: 94%;
  margin: -85px auto 0;
  padding: 10px;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 10px;
  min-height: 150px;
}
.item {
  height: 47px;
  line-height: 47px;
  font-size: 14px;
  color: #000;
  border-bottom: solid 1px #f4f4f4;
  position: relative;
}
.item span {
  color: #f57523;
  font-weight: bold;
  margin: 0 5px;
}
.right-arrow {
  width: 6px;
  height: 10px;
  background: url(https://red.manbu.xyz/red/leftmore.png);
  background-size: 6px 10px;
  position: absolute;
  right: 0;
  top: 15px;
}
</style>