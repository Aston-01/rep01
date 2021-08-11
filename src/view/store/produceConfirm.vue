<template>
  <!--pages/store/produceConfirm.wxml-->
<div class="product">
  <div class="box-list">
    <div class="box">
      <div class="box-img">
        <div class="all-flag" v-if="shopInfo.goodsType=='1'">{{shopInfo.streetName}}</div>
        <div  v-else>
          <div class="street-flag">{{shopInfo.streetName}}</div>
        </div>
        <img  :src="shopInfo.goodsPicture" />
      </div>
      <div class="box-right">
        <div class="font-strong">{{shopInfo.goodsName}}</div>
        <div class="font-normal">
          <div class="location-icon"></div>
          <div class="address-info">{{shopInfo.exchangeLocation}}</div>
        </div>
        <div class="font-normal">
          x1 {{shopInfo.pointPrice}}积分
        </div>
      </div>
    </div>
    <div class="choose-list" v-if="shopInfo.goodsType=='1'">
      <div class="item" v-for="(item,index) in scoreArray" :key="index">
        <div class="left">
          <van-radio-group v-model="radio">
            <van-radio :name="index" shape="square" @click="checkboxChange(item.selected,index)"></van-radio>
          </van-radio-group>
          <div class="name">{{item.deptName}}</div>
          <div class="can-use">可用积分{{item.validScore}}分</div>
        </div>
        <div><input type="number" v-model="item.indexNum" class="grade-input" @click="scoreChange(item.indexNum,index)" :data-index="index" /></div>
      </div>
    </div>
    <div class="total">
      <div class="title">合计(分)</div>
      <div class="grade">{{TotalScore}}</div>
    </div>
  </div>

  <van-button class="confirm-btn" @click="addScore">立即兑换</van-button>
</div>
</template>

<script>
import * as api from "@/api/content";
import { Toast, Radio} from 'vant';
export default {
  components:{
    [Radio.name]:Radio
  },
  created(){
    let item=this.$route.query.jsonStr;
    console.log(item);
    this.shopInfo=item;
    if(this.shopInfo.goodsType=='1'){
      this.getScoreDetail();
    }else{
      this.TotalScore=this.shopInfo.pointPrice;
    }
  },
    data(){
        return{
            allflag:true,
            shopInfo:{},
            scoreArray:[],
            TotalScore:0, 
            radio:0,
        }
    },
    methods:{
      getScoreDetail(){
        var that=this;
        var data={};
        api.getdetailList(data).then((res) => {
          console.log(res);
          if(res.code == 200){
            that.scoreArray = res.data;
          }else{
            Toast(res.msg);
          }
        })
      },
      checkboxChange(e,index){
        console.log(index);
        this.radio=index;
        var ssd="0";
        var score=this.scoreArray[index].indexNum;
        if(e=='1'){
            ssd="0";
            if(score==undefined||score==''){
              score=0;
            }
            var allscore=parseInt(this.TotalScore)-parseInt(score);
            this.TotalScore=allscore;
            this.scoreArray[index].indexNum = "";
        }else if(e=='0'||e==undefined){
          if(score==undefined||score==''){
            var shopscore=this.shopInfo.pointPrice;
            var validScore=this.scoreArray[index].validScore;
            var TotalScore=this.TotalScore;
            var xx=parseInt(shopscore)-parseInt(TotalScore);
            if(parseInt(validScore)>parseInt(xx)){
              score=xx;
            }else if(parseInt(validScore)<parseInt(xx)){
              score=validScore;
            }else{
              score=validScore;
            }
          }
            ssd="1";
            allscore=parseInt(score)+parseInt(this.TotalScore);
            this.TotalScore=allscore;
        }
        this.scoreArray[index].selected = ssd;
        this.scoreArray[index].indexNum = score;

      },
      scoreChange(e,index){
          var score=this.scoreArray[i].validScore;
          var oldscore=this.scoreArray[i].indexNum;
          var ischeck=this.scoreArray[index].selected;
          if(e!=undefined&&e!=""){
            if(parseInt(e)>parseInt(score)){
              Toast('输入的积分大于该街道的可用积分');
              this.scoreArray[index].indexNum=0;
              if(ischeck=='1'){
              var allscore=parseInt(this.TotalScore)-parseInt(oldscore);
              this.TotalScore=allscore;
              }
              return;
            }
          }
          if(ischeck=='1'){
          allscore=0;
          if(oldscore==undefined||oldscore==""||oldscore==null){
            if(e!=undefined&&e!=""){
              allscore =parseInt(this.TotalScore)+parseInt(e);
            }else{
              allscore =parseInt(this.TotalScore);
            }
          }else{
            if(e==undefined||e==""){
              allscore=parseInt(this.TotalScore)-parseInt(oldscore);
            }else{
              allscore=parseInt(this.TotalScore)-parseInt(oldscore)+parseInt(e);
            }
          }
          this.TotalScore=allscore;
        }
        this.scoreArray[index].indexNum=e;
      },
      addScore(){
        var pointPrice=this.shopInfo.pointPrice;
        var TotalScore=this.TotalScore;
        console.log(TotalScore);
        if(pointPrice==TotalScore){
          var data={deptIds:this.shopInfo.streetId,goodsScores:this.TotalScore,goodsName:this.shopInfo.goodsName,goodsId:this.shopInfo.goodsId,goodsCount:1,goodsScore:this.TotalScore};
          var glag=false;
          if(this.shopInfo.goodsType=='1'){
            var deptIds="";
            var goodsScores=""; 
            for (var j = 0; j < this.scoreArray.length;j++){
                    var ischeck=this.scoreArray[j].selected;
                    if('1'==ischeck){
                    var indexnum=this.scoreArray[j].indexNum;
                    var deptId=this.scoreArray[j].deptId;
                    if(indexnum==""||indexnum==null||indexnum==undefined){
                      glag=true;
                    }
                    if(0==j){
                      deptIds=deptId;
                      goodsScores=indexnum;
                    }else{
                      deptIds=deptIds+","+deptId;
                      goodsScores=goodsScores+","+indexnum;
                    }
                }
            }
            if(glag){
              Toast(勾选的积分存在空值);
              return;
            }
            data={deptIds:deptIds,goodsScores:goodsScores,goodsName:this.shopInfo.goodsName,goodsId:this.shopInfo.goodsId,goodsCount:1,goodsScore:this.TotalScore};
          }
          console.log(data);
          api.addScoreUrl(data).then((res) => {
            console.log(res);
            if(res.code==200){
              Toast('兑换成功');
              setTimeout(function () {
                this.$router.push('/exchangeRecord')
              }, 2000)
            }else{
              Toast(res.msg);
            }
          })
        }else{
          Toast('积分兑换不一致');
        }
      },
    }
}
</script>


<style scoped>
/* pages/store/produceConfirm.wxss */
page{
  background-color: #f4f4f4;
}
.box-list{
  width: 100%;
  box-sizing: border-box;
  background-color: #fff;
}
.box{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: .20rem .30rem .15rem;
}
.box-img{
  width: 2.11rem;
  height: 1.62rem;
  border-radius: .10rem;
  position: relative;
  overflow: hidden;
}
.box-img img{
  width: 2.11rem;
  height: 1.62rem;
  border-radius: .10rem;
}
.box-right{
  margin-left: .20rem;

  flex: 1;
  overflow:hidden;
}

.bottom-group{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.font-strong{
  font-size: .36rem;
  color: #1c3248;
  font-weight: bold;
}
.box .font-strong{
  color: #000000;
  font-size: .28rem;
}
.font-normal{
  font-size: .24rem;
  color: rgba(28, 50, 72, 0.4);
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: .10rem;
}
.location-icon{
  width: .18rem;
  height: .26rem;
  background:url(https://red.manbu.xyz/red/location.png);
  background-size: .18rem .26rem;
  margin-right: .10rem;
}
.font-small{
  color:rgba(28, 50, 72, 0.4);
  font-size: .18rem;
  display: table;
  padding: .10rem .20rem;
  border-radius: .30rem;
  background:#ddeefe;
  margin-top: .10rem;
}
.font-time{
  color: #f6a86c;
  font-size:.24rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: .10rem;
}
.restbtn{
  width: 1.17rem;
  height: .40rem;
  background:url(https://red.manbu.xyz/red/restbtn.png);
  background-size: 1.17rem .40rem;
  margin-right: .10rem;
  color: #fff;
  font-size: .24rem;
  text-align: center;
  line-height: .40rem;
}

.select-item{
  display: flex;
  flex-direction: row;
  height: .70rem;
  align-items: center;
}
.select-item .item{
  /* width: 50%; */
  display: flex;
  flex-direction: row;
  padding: 0 0 0 .15rem;
}
.item text{
  font-size:.24rem;
  color: #000;
}
.item .option{
  color: #bababa;
  font-size: .24rem;
}
.option-group{
  display: flex;
  margin-left: .10rem;
}
.option{
  padding: 0 .10rem;
  border-right: 1px solid #eee;
}
.option:last-child{
  border-right: none;
}
.option.selected{
  color: #34b4fe;
}
.last-line{
  display: flex;
  font-size:.18rem;
  color: #b8b8b8;
  padding: 0 .10rem;
  justify-content: space-between;
}
.people{
  border:1px solid #efefef;
  height: .40rem;
  line-height: .40rem;
  padding: 0 .30rem;
  border-radius: .20rem;
}
.sign:not([size='mini']){
  width: .77rem;
  height: .40rem;
  background:url(http://132.129.11.237:8080/imgHF/restbtn.png) no-repeat center center;
  background-size: .77rem .40rem;
  line-height: .40rem;
  border-radius: .10rem;
  color: #fff;
  font-size: .22rem;
  padding:0;
}
.cancel:not([size='mini']){
  width: 1.60rem;
  height: .40rem;
  background:#fff;
 
  border-radius: .10rem;
  color: #a3a3a3;
  font-size: .22rem;
  border:1px solid #dfdfdf;
  padding:0;
  line-height: .40rem;
}
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

.total{
  display: flex;
  justify-content: space-between;
  padding: .20rem .30rem;
}
.total .title{
  color: #b8b8b8;
  font-size: .24rem;
}
.total .grade{
  font-size: .36rem;
  font-weight: bold;
  color: #f57523;
}

.confirm-btn:not([size='mini']) {
  background-color: #1769f5;
  color: #fff;
  margin-top: .70rem;
  width: 90%;
  margin: .70rem auto 0;
  height: .82rem;
  position:fixed;
  bottom: .50rem;
  left: 5%;
}

.choose-list{
  border-top: 1px solid #e9e9e9;
}

.item{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: .98rem;
  padding: 0 .30rem;
  border-bottom: 1px solid #e9e9e9;
}
.item.selected{
  background-color: #f7f7f7;
}
.item .name{
  color: #3d3d3d;
  font-size: .28rem;
  margin-left: .10rem;
}
.item .can-use{
  color: #1769f5;
  font-size: .28rem;
  margin-left: .10rem;
}
.left{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
}
.item .grade-input{
  font-size: 15px;
  margin-bottom: 20%;
  width: 1.90rem;
  height: .50rem;
  border: 1px solid #ccc;
  margin-left: .10rem;
  border-radius: .10rem;
  text-align: right;
  color: #f57523;
  padding: 0 .20rem;
  background-color: #fff;
}

</style>