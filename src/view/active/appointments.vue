<template>
    <!--pages/active/Appointments.wxml-->
<div class="appointments">
 <!-- 活动列表 -->
 <div class="box-list">
        <div class="box" v-for="(item,index) in activeArray" :key="index">
          <div class="box-img">
            <img mode="scaleToFill" :src="item.headimg" />
          </div>
          <div class="box-right">
            <div class="font-strong">{{item.title}}</div>
            <div class="font-time">
              <div> {{item.actBeginTimeString}}</div>
            </div>
            <div class="font-normal">
              <div class="location-icon"></div>
              <div class="address-info">{{item.address}}</div>
            </div>
            <div class="last-line">
            <div class="people">报名人数：{{item.joinCount}}/{{item.entryNumLimit}}</div>
            <div v-if="item.operators.optype1">
            <button class="sign" bindtap='checkSign' :data-item="item.operators.opValue1" :data-index="index">{{item.operators.opValue1}}</button>
            </div>
            <div v-else>
              <button class="cancel">{{item.operators.opValue1}}</button>
            </div>
            <div v-if="item.operators!=null&&item.operators.optype2==true">
            <button class="sign" bindtap='checkSign' :data-item="item.operators.opValue2" :data-index="index">{{item.operators.opValue2}}</button>
            </div>
            <div v-if="item.operators!=null&&item.operators.optype2==false">
              <button class="cancel">{{item.operators.opValue2}}</button>
            </div>
            </div>
            <!-- <div class="font-small">距离您{{item.distant}}km</div> -->
          </div>
        </div>
      </div>
</div>

</template>


<script>
export default {
    data(){
        return{
            la:0,
    lo:0,
    activeArray:[]
        }
    }
}
</script>


<style scoped>
/* pages/active/Appointments.wxss */
.appointments{
  padding-top: .20rem;
}
.box-list{
  width: 100%;
  padding: 0 .30rem;
  box-sizing: border-box;
}
.box{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: .20rem;
  padding-bottom: .20rem;
  border-bottom: 1px solid #eeeeee;
}
.box-img{
  width: 2.11rem;
  height: 1.62rem;
  border-radius: .10rem;
  overflow: hidden;
}
.box-img image{
  width: 2.11rem;
  height: 1.62rem;
}
.box-right{
  flex:1;
  overflow:hidden;
  margin-left: .20rem;
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
  padding: .10rem .10rem 0;
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
  width: 1.00rem;
  height: .40rem;
  background:url(https://red.manbu.xyz/red/restbtn.png) no-repeat center center;
  background-size: 1.00rem .40rem;
  line-height: .40rem;
  border-radius: .10rem;
  color: #fff;
  font-size: .22rem;
  padding:0;
}
.cancel:not([size='mini']){
  width: 1.20rem;
  height: .40rem;
  background:#fff;
  border-radius: .10rem;
  color: #a3a3a3;
  font-size: .22rem;
  border:1px solid #dfdfdf;
  padding:0;
  line-height: .40rem;
}
</style>