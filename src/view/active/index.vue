<template>
    <!--pages/active/active.wxml-->
<div class="ac-container">
  <div class="search-wrap">
    <div class="dropbtn">
      <van-field readonly class="input-index" clickable :value="Postion_Name" placeholder="选择街道" @click="showPicker = true" />
            <van-popup v-model="showPicker" round position="bottom">
                <van-picker show-toolbar :columns="streetArray" @cancel="showPicker = false" @confirm="onConfirm" />
            </van-popup>
      <div class="down-arrow"></div>
    </div>
    <div class="search-box">
      <div class="search-icon"></div>
      <van-field class="weui-input"  v-model="content"  placeholder="输入搜索内容" />
      <div class="search-btn" @click="search">搜索</div>
    </div>
  </div>
  <!-- <div class="select-container {{showFlag === true?'show':''}}"> -->
  <div class="select-container">
    <div class="select-street">
      <div v-for="(item,index) in streetArray" :key="index">
        <div v-if="item.selected" class="grid selected" @click="changeStreet" >{{item.name}}</div>
        <div v-else class="grid" @click="changeStreet" >{{item.name}}</div>
      </div>
    </div>
    <div class="select-community">
      <div v-for="(item2,index) in objectArray" :key="index">
        <div v-if="item2.selected" class="grid selected" @click="changePot" >{{item2.name}}</div>
        <div v-else class="grid" @click="changePot" >{{item2.name}}</div>
      </div>
    </div>
  </div>
  <div class="select-item">
    <div class="item">
      <span>时间:</span>
      <div class="option-group">
        <div  class="option "   @click="changeTitle" data-index= '0'>全部活动</div>
        <div  class="option "  @click="changeTitle" data-index= '1'>今日活动</div>
        <!-- <div  class="option {{NSelected == '0'? 'selected': ''}}"   @click="changeTitle" data-index= '0'>全部活动</div>
        <div  class="option {{NSelected == '1'? 'selected': ''}}"   @click="changeTitle" data-index= '1'>今日活动</div> -->
      </div>
    </div>
    <div class="item">
      <span>距离:</span>
      <div class="option-group">
        <div  class="option "  @click="changeDistan" >3km以内</div>
        <div  class="option "   @click="changeDistan" >3km-5km</div>
        <!-- <div  class="option {{Dselected == '2'? 'selected': ''}}"   @click="changeDistan" data-index= '2'>大于5km</div> -->
      </div>
    </div>
  </div>
  <!-- 活动列表 -->
  <div class="box-list">
    <div class="box" v-for="(item3,index) in activeArray" :key="index">
      <div class="box-img">
        <img  :src="item3.headimg" />
      </div>
      <div class="box-right" @click="goActiveDetail" >
        <div class="font-strong">{{item3.title}}</div>
        <div class="font-time">
          <div>{{item3.actBeginTimeString}}</div>
          <div class="wrubtn" v-if="item3.entryNumLimit==item3.nowNumLimit">已约满</div>
          <div v-else>
            <div class="restbtn">总{{item3.entryNumLimit}}余{{item3.overNumLimit}}</div>
          </div>
        </div>
        <div class="font-normal">
          <div class="location-icon"></div>
          <div class="address-info">{{item3.address}}</div>
        </div>
        <div class="font-small">距离您{{item3.distance}}km</div>
      </div>
    </div>
  </div>

</div>
</template>
<script>
// import * as api from '@/api/content'
import * as common from '@/api/common'
import { Local } from "@/utils/storage";
export default {
  created(){
    this.getLocation();
    let that = this;
      var data = {
        name: "street",
        id: 110
      };
    common.getStreet(data).then(res => {
      console.log(res)
      res.forEach(element => {
        element.text = element.name;
      });
      that.streetArray=res;
      if (res.length > 0) {
        Local.set("street_id_Now", res[0].id);
      }
      for(let i=0;i<this.streetArray.length;i++){
        if(this.streetArray[i].id == Local.get("street_id_Now")){
          this.streetArray[i].selected = true;
          this.streetName = this.streetArray[i].name;
          this.street_id = Local.get("street_id_Now");
        }
      }
      that.getPostion(this.street_id,this.streetName);
    });
  },
    data(){
        return{
              activeArray: [],
              objectArray:[],
              street_id:'',
              positionId:"",
              NpositionId:"",
              index:0,
              la:0,
              lo:0,
              content:"",
              NSelected:'0',
              Dselected:'2',
              showPicker:false,
              streetArray:[],
              streetName:"",
              Postion_Name:"",
        }
    },
    methods:{
      search(){

      },
      changeStreet(){

      },
      changePot(){

      },
      changeTitle(){

      },
      changeDistan(){

      },
      goActiveDetail(){

      },
      getLocation(){
        let that = this;
            if (navigator.geolocation) {
                var geolocation = new BMap.Geolocation();
                geolocation.getCurrentPosition(
                    function (r) {
                        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                            // alert("您的位置：" + r.point.lng + "," + r.point.lat);
                            that.la = r.point.lat;
                            that.lo = r.point.lng;
                        } else {
                            console.log("failed" + this.getStatus());
                        }
                    }, {
                        enableHighAccuracy: true
                    }
                );
            } else {
                console.log("Geolocation is not supported by this browser.");
            }
      },
      getPostion(ids,strname){
        var that=this;
        var data={name:'postion',id:ids};
        common.getStreet(data).then((res) => {
          console.log(res);
          var name=res[0].name;
          var id=res[0].id;
          var index=0;
          if(that.NpositionId!=null&&that.NpositionId!=""){
            for(var j=0;j<res.length;j++){
              if(res[j].id==that.NpositionId){
                index=j;
                res[j].selected=true;
                name=res[j].name;
                id=res[j].id;
              }
            }
          }else{
            res[0].selected=true;
            if(strname!=""&&strname!=null){
              name=strname;
            }
          }
          that.objectArray=res.data;
          that.positionId=id;
          that.Postion_Name=name;
          that.index=index;
          if(res.length>0){
            that.getActive(ids,id);
          }
        })
      },
      getActive(){

      },
      onConfirm(value){
        console.log(value);
            this.showPicker = false;
            this.Postion_Name = value.name;
            var jj = value.id;
            let i=0;
            for(let i=0;i<this.streetArray.length;i++){
              if(this.streetArray[i].id == jj){
                this.streetArray[i].selected = true;
                this.streetName = value.name;

              }
            }
            console.log(this.streetArray[i]);
            // this.getBanner(jj);
            // this.getActive(jj);
            // this.getCg(jj);
            // this.getSqTs(jj, 1, 10);
            // this.getSqTs(jj, 2, 1);
            // this.getNewsList(jj, 1);
            // this.getNewsList(jj, 0);
            Local.set("street_id_Now", jj);
      }
    }
}
</script>
<style scoped>
/* pages/active/active.wxss */
.dropbtn .van-field {
    background-color: #1769f5;
}
.search-wrap{
  display: flex;
  flex-direction: row;
  background-color: #1769f5;
  padding: .10rem .20rem;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  box-sizing: border-box;
}
.search-box{
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #c8dbfd;
  width: 70%;
  padding: .10rem .20rem;
  border-radius: .30rem;
  justify-content: space-between;
}
.pick-wrap{
  width: 25%;
  color: #fff;
  font-size: .24rem;
}

.search-icon{
  width: .27rem;
  height: .27rem;
  background: url(https://red.manbu.xyz/red/search.png);
  background-size: .27rem .27rem;
}
.search-btn{
  width: 1.00rem;
  height: .50rem;
  background-color: #5d98fb;
  color: #fff;
  text-align: center;
  line-height: .50rem;
  border-radius: .25rem;
  font-size: .24rem;
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
  /*width: 62%;*/
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
.wrubtn{
  width: 1.17rem;
  height: .40rem;
  background:#BFBDC4;
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
.item span{
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
.van-cell{
    padding: 0;
}
.weui-input{
    width: 70%;
    background-color: #c8dbfd;
}
.weui-input ::-webkit-input-placeholder {
  color: #90949f;
  font-weight: 400;
}

/* Firefox 4-18 */
.weui-input :-moz-placeholder {
  color: #90949f;
  font-weight: 400;
}

/* Firefox 19-50 */
.weui-input ::-moz-placeholder {
  color: #90949f;
  font-weight: 400;
}

/* - Internet Explorer 10–11
- Internet Explorer Mobile 10-11 */
.weui-input :-ms-input-placeholder {
  color: #90949f !important;
  font-weight: 400 !important;
}

/* Edge (also supports ::-webkit-input-placeholder) */
.weui-input ::-ms-input-placeholder {
  color: #90949f;
  font-weight: 400;
}

/* CSS Working Draft */
.weui-input ::placeholder {
  color: #90949f;
  font-weight: 400;
}


</style>