<template>
    <div class="points">
        <div class="points-top">
            <div class="top-info">
                <div class="left">
                <div class="coin"></div>
                <div class="font-small">可用积分：</div>
                <div class="font-big"><span>{{score}}</span>分</div>
                </div>
                <div class="right">
                <div class="font-small">累计积分：</div>
                <div class="font-small"><span>{{allscore}}</span>分</div>
                </div>
            </div>
        </div>
        <div class="points-detail">
            <div class="item" v-for="(item,index) in scoreGetArray" :key="index">
            <div class="info">
            <div class="name">【{{item.deptName}}】{{item.ruleName}}</div>
            <div class="time">{{item.createDate}}</div>
            </div>
            <div class="grade" v-if="item.scoreType == '-1'">-{{item.userScore}}</div>
            <div class="points-grade" v-else >+{{item.userScore}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import * as api from "@/api/content";
import { Toast } from 'vant';
export default {
    created(){
      this.getScoreALL();
      this.getParams();
    },
    data(){
        return{
            score:"",
            allscore:"",
            scoreGetArray:[
            ],
        }
    },
    methods:{
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
        getParams(){
          var that=this;
          var dept_id = this.$route.query.deptId;
          var data={deptId:dept_id};
          api.getScoreList(data).then((res) => {
            // console.log(res);
            if(res.code == 200){
              that.scoreGetArray = res.data;
            }else{
              Toast(res.msg);
            }
          })

        }
    }
}
</script>


<style scoped>
.points-top{
  width: 100%;
  height: 134px;
  background: url(https://red.manbu.xyz/red/jfbg.png);
  background-size: 100%    134px;
}
.top-info{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 94%;
  margin: 0 auto;
}
.coin{
  width: 21px;
  height: 15px;
  background: url(https://red.manbu.xyz/red/points-coin.png);
  background-size: 21px 15px;
  margin-right: 5px;
}
.left,.right{
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #fff;
  font-size: 12px;
  padding: 10px;
}
.font-big text{
  font-size: 18px;
  font-weight: bold;
}
.points-detail{
  width: 94%;
  margin: -85px auto 0;
  padding: 10px;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 10px;
  min-height:100px;
}
.item{
  font-size: 14px;
  color: #000;
  position: relative;
}
.item text{
  color: #f57523;
  font-weight: bold;
  margin: 0 5px;
}
.right-arrow{
  width: 6px;
  height: 10px;
  background: url(https://red.manbu.xyz/red/leftmore.png);
  background-size: 6px 10px;
  position: absolute;
  right: 0;
  top: 15px;
}
.item{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #f4f4f4;
}
.item .info{
  color: #000;
  font-size: 14px;
}
.item .time{
  color: #808080;
  font-size: 12px;
}
.points-grade{
  color: #f57523;
  font-size: 14px;
}
.grade{
  color: #34b4fd;
  font-size: 14px;
}
</style>