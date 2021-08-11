<template>
    <!--pages/active/activeEvaluate.wxml-->
<div class="active-container">
<div class="top">
 <div class="active-info">
  <img :src="activeArray.headimg" />
  <div class="right">
   <div class="name">{{activeArray.title}}</div>
   <div class="time">{{activeArray.actBeginTimeString}}</div>
   </div>
 </div>
 <div class="active-grade">
  <div class="title">满意度:</div>
  <div class="star-group">
    <div  v-for="(item,index) in scoreArray" :key="index">
    <div v-if="item.selected==1" class="star" bindtap="changeScore" :data-id="item.name"></div>
     <div v-else class="unstar" bindtap="changeScore" :data-id="item.name"></div>
    </div>

  </div>
  <div class="grade">{{score}}分</div>
 </div>
 <div class="evaluate-label">
  <div  v-for="(itm,index) in markList"  :key="index">
  <div v-if="itm.selected" class="e-label choosed" bindtap="changeMark" :data-index="index">{{itm.name}}</div>
     <div v-else class="e-label" bindtap="changeMark" :data-index="index">{{itm.name}}</div>
  </div>
 </div>
 <div class="evaluate-area">
  <!-- <textarea bindinput="bindTextAreaBlur" v-model="commentContent"  placeholder="请填写对本次活动的反馈和建议" /> -->
  <van-field
  v-model="commentContent"
  rows="2"
  autosize
  label=""
  type="textarea"
  maxlength="50"
  placeholder="请填写对本次活动的反馈和建议"
  show-word-limit
/>
 </div>
</div>
<div class="label-warp">
    <div class="title">以后你想要更多参与的活动类型</div>
    <!-- <div class="title-small">根据您的喜好为您推荐专属活动</div> -->
    <div class="label-list">
      <div class="label" v-for="(it,index) in signList" :key="index" bindtap="pickLabel" :data-id="itemName.id">
       <div>{{it.name}}</div>
       <div v-if="it.selected" class="selecked"></div>
      </div>
    </div>
  </div>
  <div class="bottom-fixed">
  <van-button class="confirm-btn" bindtap="submit">提交评价</van-button>
  </div>
</div>

</template>

<script>
export default {
    data(){
        return{
            signList:[],
    activeArray:{}, 
    scoreArray:[{name:1,selected:1},{name:2,selected:1},{name:3,selected:1},{name:4,selected:1},{name:5,selected:1}], 
    labelNumber:0,
    score:5,
    markList:[],
    trailid:"",
    activityId:"",
    commentContent:"",
        }
    },
    methods:{
        changeMark:function(){
    // let i = e.currentTarget.dataset.index;
    // console.log(i);
    // var ss=this.data.markList[i].selected;
    // if(ss){
    //   ss=false;
    // }else{
    //   ss=true;
    // }
    // var up = 'markList[' + i + '].selected';
    // this.setData({
    //   [up]:ss,
    // })
    console.log('changeMark')
  },
  changeScore:function(){
    // let i = e.currentTarget.dataset.id;
    // console.log(i);
    // for(var j=0;j<this.data.scoreArray.length;j++){
    //   var up = 'scoreArray[' + j + '].selected';
    //   var num=0;
    //   if(j<i){
    //     num=1;
    //   }
    //   this.setData({
    //     [up]:num,
    //     score:i
    //   })
    //   this.getStreet();
    // }
    console.log('changeMark')
  },
  getActive: function() {
    // var xxs=this;
    // var config = wx.getStorageSync('config')
    // var url=config.activityUrl;
    // var data={id:id};
    // utils.httpseqGet(url, data).then((res) => {
    //   console.log(res);
    //   if(res.data.code==200){
    //   if(res.data.data.length>0){
    //   xxs.setData({
    //       activeArray:res.data.data[0]
    //     })
    //     xxs.getDemand(res.data.data[0].streetId);
    //   }
    // }else{
    //   wx.showToast({
    //     title: res.data.msg,
    //     icon: 'none',
    //     duration: 1000
    //   })
    // }
    // }).catch(error => {
    //   wx.showToast({
    //     title: error,
    //     icon: 'none',
    //     duration: 1000
    //   })
    // });
    console.log('changeMark')
  },
  bindTextAreaBlur:function(){
    // console.log(e.detail.value);
    // this.setData({
    //   commentContent:e.detail.value,
    // })
    console.log('changeMark')
  },
  submit:function(){
      
    
    console.log('changeMark')
  },
  pickLabel(){
    // console.log(data,"000000");
    // let id = data.currentTarget.dataset.id;
    // let num = this.data.labelNumber;
    // console.log(id);
    // let signList = this.data.signList;
    // for(var i=0;i<signList.length;i++){
    //   if(signList[i].id==id){
    //     console.log(signList[i]);
    //     if(signList[i].selected != true){
    //       signList[i].selected = true;
    //       num++;
    //     }else{
    //       signList[i].selected = false;
    //       num--;
    //     }
    //   }
    // }
    // this.setData({
    //   signList:signList,
    //   labelNumber: num
    // })
    console.log('changeMark')
  },
  getDemand: function() {
    // var xxs=this;
    // var config = wx.getStorageSync('config')
    // var url=config.streetUrl;
    // var data={name:'demand',id:id};
    // utils.httpseqGet(url, data).then((res) => {
    //   console.log(res.data);
    //   xxs.setData({
    //     signList:res.data
    //   })
    // }).catch(error => {
    //   wx.showToast({
    //     title: error,
    //     icon: 'none',
    //     duration: 1000
    //   })
    // });
    console.log('changeMark')
  },
  getStreet: function() {
    // var xxs=this;
    // var config = wx.getStorageSync('config')
    // var url=config.streetUrl;
    // var data={name:this.data.score,id:'mark_def'};
    // utils.httpseqGet(url, data).then((res) => {
    //   xxs.setData({
    //     markList:res.data
    //   })
    // }).catch(error => {
    //   wx.showToast({
    //     title: error,
    //     icon: 'none',
    //     duration: 1000
    //   })
    // });
    console.log('changeMark')
  },
    }
}
</script>


<style scoped>
/* pages/active/activeEvaluate.wxss */
.active-container {
  background-color: #f7f7f7;
  padding-bottom: 1.50rem;
}

.label-warp {
  width: 94%;
  margin: 0 auto;
  box-sizing: border-box;
  padding: .20rem;
  background-color: #fff;
  margin-top: .30rem;
  border-radius: .10rem;
}

.label-warp .title {
  font-size: .26rem;
  color: #2a272e;
}

.label-warp .title-small {
  font-size: .26rem;
  color: rgba(42, 39, 46, 0.2);
}

.label-warp .label-list {
  width: 100%;
  height: 6.00rem;
}

.label-list {
  position: relative;
}

.label {
  width: 1.60rem;
  height: 1.60rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background:  url(https://red.manbu.xyz/red/bg.png) no-repeat center center;
  background-size: 100% 100%;
  position: absolute;
  left: .30rem;
  top: .30rem;
  color: #fff;
  font-size: .30rem;
  font-weight: bold;
}

.label.id0 {
  background:  url(https://red.manbu.xyz/red/bg_new.png) no-repeat center center;
  left: 2.48rem;
  top: 2.31rem;
  transform:scale(1.1);
}
.id1 {
  background:  url(https://red.manbu.xyz/red/bg6.png) no-repeat center center;
  left: 3.95rem;
  top: 1.82rem;
  transform:scale(0.8);
}

.id2 {
  background:  url(https://red.manbu.xyz/red/bg3.png) no-repeat center center;
  left:1.20rem;
  top: 1.26rem;
  transform:scale(0.8);
}

.id3 {
  background:  url(https://red.manbu.xyz/red/bg.png) no-repeat center center;
  left: 2.57rem;
  right: .66rem;
  transform:scale(1);
}

.id4 {
  background:  url(https://red.manbu.xyz/red/bg5.png) no-repeat center center;
  left: 4.12rem;
  top: 3.23rem;
  transform:scale( 0.6);
}

.id5 {
  background:  url(https://red.manbu.xyz/red/bg7.png) no-repeat center center;
  left: 1.23rem;
  top: 3.47rem;
  transform:scale(0.9);
}

.id6 {
  background:  url(https://red.manbu.xyz/red/bg.png) no-repeat center center;
  left: 3.08rem;
  top: 4.02rem;
  transform:scale(0.8);
}

.id7 {
  background:  url(https://red.manbu.xyz/red/bg6.png) no-repeat center center;
  left:.06rem;
  top: 2.42rem;
  transform:scale(0.9);
}

.id8 {
  background:  url(https://red.manbu.xyz/red/bg5.png) no-repeat center center;
  left:5.32rem;
  top: 2.84rem;
  transform:scale(0.7);
}

.id9 {
  background:  url(https://red.manbu.xyz/red/bg7.png) no-repeat center center;
  left: 4.33rem;
  top: 4.40rem;
  transform:scale(0.7);
}

.id10 {
  background:  url(https://red.manbu.xyz/red/bg6.png) no-repeat center center;
  left: 5.54rem;
  top: 4.10rem;
  transform:scale(0.8);
}

.id11 {
  background:  url(https://red.manbu.xyz/red/bg5.png) no-repeat center center;
  left: 0;
  top: .60rem;
  transform:scale(0.6);
}

.id12  {
  background: url(https://red.manbu.xyz/red/bg3.png) no-repeat center center;
  left: 1.56rem;
  top: 4.62rem;
  transform:scale(0.6);
}

.id13 {
  background:  url(https://red.manbu.xyz/red/bg5.png) no-repeat center center;
  left: 5.57rem;
  top: 1.60rem;
  transform:scale(0.7);
}

.id14 {
  background:  url(https://red.manbu.xyz/red/bg7.png) no-repeat center center;
  left: 4.40rem;
  top: .30rem;
  transform:scale(0.7);
}
.id15 {
  background:  url(https://red.manbu.xyz/red/bg7.png) no-repeat center center;
  left: 0;
  top: 4.40rem;
  transform:scale(0.7);
}

.id16 {
  background:  url(https://red.manbu.xyz/red/bg6.png) no-repeat center center;
  left: 5.60rem;
  top: 0;
  transform:scale(0.7);
}

.selecked {
  width: .30rem;
  height: .30rem;
  background-image: url(https://red.manbu.xyz/red/tick.png);
  background-size: .30rem .30rem;
  position: absolute;
  bottom: 0;
  left: 50%;
  margin-left: -.15rem;
}
.top{
  width: 94%;
  margin: 0 auto;
  background-color: #fff;
  padding: .20rem;
  box-sizing: border-box;
  margin-top: .20rem;
  border-radius: .10rem;
}
.active-info{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding: .20rem 0;
}
.active-info image{
  width: 1.20rem;
  height: .81rem;
}
.active-info .right{
  margin-left: .30rem;
}
.active-info .name{
  font-size: .28rem;
  color: #000;
}
.time{
  color: #b8b8b8;
  font-size: .24rem;
}
.active-grade{
  display: flex;
  flex-direction: row;
  align-items: center;
}
.active-grade .title{
  color: #000;
  font-size: .28rem;
}
.grade{
  color: #000;
  font-size:.32rem;
}
.star-group{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 0 .20rem;
}
.star{
  width: .35rem;
  height: .35rem;
  background: url(https://red.manbu.xyz/red/star-full.png) no-repeat center center;
  background-size: .35rem .35rem;
  margin: 0 .10rem;
}
.unstar{
  width: .35rem;
  height: .35rem;
  background: url(https://red.manbu.xyz/red/star-grey.png) no-repeat center center;
  background-size: .35rem .35rem;
  margin: 0 .10rem;
}
.evaluate-label{
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  padding-top: .20rem;
  padding-bottom: .20rem;
  border-bottom: 1px solid #eeeeee;
}
.e-label{
  color: #8f8f8f;
  font-size:.24rem;
  width: 2.03rem;
  height: .50rem;
  line-height: .50rem;
  text-align: center;
  border-radius: .10rem;
  border: 1px solid #aaa;
  margin:.10rem .08rem;
}
.e-label.choosed{
  color: #1769f5;
  border:#1769f5 solid 1px;
}
.evaluate-area{
  padding: .30rem 0;
}
.evaluate-area textarea{
  height: 1.80rem;
  font-size:.24rem;
}
.confirm-btn {
  background-color: #1769f5;
  color: #fff;
  width: 90%;
  margin: 0 auto;
  display: block;
  font-size: 0.24rem;
  height: .82rem;
}

</style>