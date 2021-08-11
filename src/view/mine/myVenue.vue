<template>
    <div class="my-venue">
        <div class="box-list">
            <div class="box" v-for="(item,index) in venueArray" :key="index">
            <div class="box-img">
                <img mode="scaleToFill" :src="item.venueImage"/>
            </div>
            <div class="box-right">
                <div class="font-strong">{{item.venueName}}</div>
                <div class="font-normal">
                {{item.bookDay}}  {{item.bookTime}}
                </div>
                <div class="font-normal">
                {{item.venueAddress}}
                </div>
                <div class="last-line">
        <!--           
                <button class="restbtn" wx:if = "{{item.status == 0}}">签到</button>
                <button class="cancel" wx:else>已取消</button> -->
                    <div v-if="item.operators.optype1">
                    <button class="restbtn" @click='checkSign'>{{item.operators.opValue1}}</button>
                    </div>
                    <div v-else>
                    <button class="cancel">{{item.operators.opValue1}}</button>
                    </div>
                    <div v-if="item.operators!=null&&item.operators.optype2==true">
                    <button class="restbtn" @click='checkSign'>{{item.operators.opValue2}}</button>
                    </div>
                    <div v-if="item.operators!=null&&item.operators.optype2==false">
                    <button class="cancel">{{item.operators.opValue2}}</button>
                    </div>
                </div>
            </div>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=YourKey">
</script>
<script>

import * as api from "@/api/content";
import { Toast } from 'vant';
export default {
  created(){
    this.getLocation();
    this.getMyVenue();
  },
    data(){
        return{
            venueArray: [],
            la:'',
            lo:''
        }
    },
    methods:{
        getLocation() {
            let that = this;
            if (navigator.geolocation) {
                var geolocation = new BMap.Geolocation();
                geolocation.getCurrentPosition(
                    function (r) {
                        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
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
        checkSign(e){
            console.log(e);
        },
        getMyVenue(){
          var that=this;
          var data={lat:this.la,lng:this.lo};
          api.venueBookUrl(data).then((res) => {
            // console.log(res);
            if(res.code == 200){
              that.venueArray = res.data;
            }else{
              Toast(res.msg);
            }
          })
        },
    }
}
</script>


<style scoped>
.my-venue {
  padding-top: 10px;
}

.box-list {
  width: 100%;
  padding: 0 15px;
  box-sizing: border-box;
}

.box {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eeeeee;
}

.box-img {
  width: 105px;
  height: 81px;
  border-radius: 5px;
  overflow: hidden;
}
.box-img img{
  width: 105px;
  height: 81px;
}

.box-right {
  margin-left: 10px;

  flex: 1;
  overflow:hidden;
}

.bottom-group {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.font-strong {
  font-size: 18px;
  color: #1c3248;
  font-weight: bold;
}

.box .font-strong {
  color: #000000;
  font-size: 14px;
}

.font-normal {
  font-size: 12px;
  color: #CBCBCB;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 5px;
}

.location-icon {
  width: 9px;
  height: 13px;
  background: url(https://red.manbu.xyz/red/location.png);
  background-size: 9px 13px;
  margin-right: 5px;
}

.font-small {
  color: #1C3248;
  font-size: 9px;
  display: table;
  padding: 5px 10px;
  border-radius: 15px;
  background: #F5F5F5;
  margin-top: 5px;
}

.font-time {
  color: #f6a86c;
  font-size: 12px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 5px;
}

.restbtn:not([size='mini']) {
  padding: 0;
  width: 59px;
  height: 20px;
  background: url(https://red.manbu.xyz/red/restbtn.png);
  background-size: 59px 20px;
  margin-right: 5px;
  color: #fff;
  font-size: 12px;
  text-align: center;
  line-height: 20px;
}

.select-item {
  display: flex;
  flex-direction: row;
  height: 35px;
  align-items: center;
}

.select-item .item {
  /* width: 50%; */
  display: flex;
  flex-direction: row;
  padding: 0 0 0 8px;
}

.item text {
  font-size: 12px;
  color: #000;
}

.item .option {
  color: #bababa;
  font-size: 12px;
}

.option-group {
  display: flex;
  margin-left: 5px;
}

.option {
  padding: 0 5px;
  border-right: 1px solid #eee;
}

.option:last-child {
  border-right: none;
}

.option.selected {
  color: #34b4fe;
}

.right-bottom {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 40px;
}

.grade {
  color: #F78E32;
  font-size: 12px;
}

.grade text {
  font-size: 16px;
  font-weight: bold;
}

.applybtn:not([size='mini']) {
  width: 59px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
  color: #3281F7;
  font-size: 12px;
  text-align: center;
  line-height: 20px;
  padding: 0;
  border: 1px solid #3281F7;
}

.last-line {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
  padding: 5px 0 0;
}

.last-line view {
  display: table;
}

.cancel:not([size='mini']) {
  color: #2A272E;
  font-size: 12px;
  background: none;
  width: 59px;
  height: 30px;
  line-height: 20px;
  margin-right: 5px;
  text-align: center;
  line-height: 20px;
  padding: 0;
  width: 60px;
  height: 20px;
  background: #fff;
  border-radius: 5px;
  color: #a3a3a3;
  font-size: 11px;
  border: 1px solid #dfdfdf;
  padding: 0;
  line-height: 20px;
}
</style>