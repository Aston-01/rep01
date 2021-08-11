<template>
<!--pages/news/news.wxml-->
<div class="news-container">
    <div class="search-wrap">
        <!-- <picker class="pick-wrap" bindchange="bindPickerChange" value="{{id}}" range="{{objectArray}}" range-key="name">
      <div class="picker">
        {{objectArray[index].name}}
      </div>
    </picker> -->
        <div class="dropbtn" bindtap="showSelect">
            <div class="droptext">{{Postion_Name}}</div>
            <div class="down-arrow"></div>
        </div>
        <div class="search-box">
            <div class="search-icon"></div>
            <van-field class="weui-input" bindinput="bindSc" placeholder-style="color:#90949f;font-size:.24rem;" v-model="content" placeholder="输入搜索内容" />
            <div class="search-btn" bindtap="search">搜索</div>
        </div>
    </div>
    <div class="select-container show">
        <div class="select-street">
            <div v-for="(item,index) in streeyArray" :key="index">
                <div v-if="item.selected" class="grid selected" bindtap="changeStreet" :data-index="index">{{item.name}}</div>
                <div v-else class="grid" bindtap="changeStreet" :data-index="index">{{item.name}}</div>
            </div>
        </div>
        <div class="select-community">
            <div v-for="(item,index) in objectArray" :key="index">
                <div v-if="item.selected" class="grid selected" bindtap="changePot" :data-index="index">{{item.name}}</div>
                <div v-else class="grid" bindtap="changePot" :data-index="index">{{item.name}}</div>
            </div>
        </div>
    </div>
    <div class="box-list news-list">
        <div class="box" v-for="(item,index) in newsArray" :key="index" bindtap="geNewsDetail" :data-id='item.id'>
            <div class="box-img">
                <image :src="item.headimg"></image>
            </div>
            <div class="box-right">
                <div class="font-strong">{{item.title}}</div>

                <div class="font-normal">
                    {{item.positionName}}
                </div>
                <div class="font-normal flex-div">
                    <div class="time">{{item.createTime}} </div>
                    <div class="hits">
                        <div class="eye-icon"></div>{{item.readnum}}
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="end">
        <div style="width:.30rem"></div>
        已到底
        <div style="width:.30rem"></div>
        <div></div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            newsArray: [],
            la: '',
            lo: '',
            objectArray: [],
            street_id: '',
            positionId: "",
            NpositionId: "",
            index: 0,
            content: "",
            NSelected: '0',
            Dselected: '0',
            showFlag: false,
            streeyArray: [],
            streetName: "",
            Postion_Name: "",
        }
    },
    methods:{
        
    }
}
</script>

<style scoped>
/* pages/news/news.wxss */
.search-wrap {
    display: flex;
    flex-direction: row;
    background-color: #1769f5;
    padding: .10rem .20rem;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    box-sizing: border-box;
}

.search-box {
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: #c8dbfd;
    width: 70%;
    padding: .10rem .20rem;
    border-radius: .30rem;
    justify-content: space-between;
}

.pick-wrap {
    width: 25%;
    color: #fff;
    font-size: .24rem;
}

.search-icon {
    width: .27rem;
    height: .27rem;
    background: url(https://red.manbu.xyz/red/search.png);
    background-size: .27rem .27rem;
}

.search-btn {
    width: 1.00rem;
    height: .50rem;
    background-color: #5d98fb;
    color: #fff;
    text-align: center;
    line-height: .50rem;
    border-radius: .25rem;
    font-size: .24rem;
}

.box-list {
    width: 100%;
    padding: 0 .30rem;
    box-sizing: border-box;
}

.news-list {
    padding-top: .30rem;
}

.box {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: .20rem;
    padding-bottom: .20rem;
    border-bottom: 1px solid #eeeeee;
}

.box-img {
    width: 2.11rem;
    height: 1.62rem;
    border-radius: .10rem;
    overflow: hidden;
}

.box-img image {
    width: 2.11rem;
    height: 1.62rem;
}

.box-right {
    margin-left: .20rem;

    flex: 1;
    overflow: hidden;
}

.bottom-group {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.font-strong {
    font-size: .36rem;
    color: #1c3248;
    font-weight: bold;
}

.box .font-strong {
    color: #000000;
    font-size: .28rem;
}

.font-normal {
    font-size: .24rem;
    color: rgba(28, 50, 72, 0.4);
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: .10rem;
}

.location-icon {
    width: .18rem;
    height: .26rem;
    background: url(https://red.manbu.xyz/red/location.png);
    background-size: .18rem .26rem;
    margin-right: .10rem;
}

.font-small {
    color: rgba(28, 50, 72, 0.4);
    font-size: .18rem;
    display: table;
    padding: .10rem .20rem;
    border-radius: .30rem;
    background: #ddeefe;
    margin-top: .10rem;
}

.font-time {
    color: #f6a86c;
    font-size: .24rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: .10rem;
}

.restbtn {
    width: 1.17rem;
    height: .40rem;
    background: url(https://red.manbu.xyz/red/restbtn.png);
    background-size: 1.17rem .40rem;
    margin-right: .10rem;
    color: #fff;
    font-size: .24rem;
    text-align: center;
    line-height: .40rem;
}

.select-item {
    display: flex;
    flex-direction: row;
    height: .70rem;
    align-items: center;
}

.select-item .item {
    /* width: 50%; */
    display: flex;
    flex-direction: row;
    padding: 0 0 0 .15rem;
}

.item text {
    font-size: .24rem;
    color: #000;
}

.item .option {
    color: #bababa;
    font-size: .24rem;
}

.option-group {
    display: flex;
    margin-left: .10rem;
}

.option {
    padding: 0 .10rem;
    border-right: 1px solid #eee;
}

.option:last-child {
    border-right: none;
}

.option.selected {
    color: #34b4fe;
}

.flex-view {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.eye-icon {
    width: .24rem;
    height: .19rem;
    background: url(https://red.manbu.xyz/red/eye.png);
    background-size: .24rem .19rem;
    margin-right: .10rem;
}

.hits {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.end {
    display: flex;

    flex-direction: row;
    width: 50%;
    margin: 0 auto;
    color: #CBCBCB;
    font-size: .20rem;
    padding: .10rem;
}

.end:before,

.end:after {
    content: "";

    flex: 1 1;

    border-bottom: 1px solid #eee;

    margin: auto;

}

.weui-input {
    width: 70%;
}

.van-cell {
    padding: 0;
}
</style>
