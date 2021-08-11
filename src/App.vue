<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
body {
  font-size: 16px;
  background-color: #fff;
  -webkit-font-smoothing: antialiased;
  
}
/**app.wxss**/
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 2.00rem 0;
  box-sizing: border-box;
} 
.picker{
  font-size:.28rem;
  font-weight:bold;
}

.bottom-fixed{
  width:100%;
  position:fixed;
  bottom: 0;
  left:0;
  background:#f4f4f4;
  padding:.30rem;
  box-sizing:border-box;
}
.confirm-btn {
  background-color: #1769f5;
  color: #fff;
  width: 90%;
  margin: 0 auto;
  height: .82rem;
}
.unconfirm-btn:not([size='mini']) {
  background-color: #CCCCCC;
  color: #fff;
  width: 90%;
  margin: 0 auto;
  height: .82rem;
}
.dropbtn{
  width: 26%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-right: .20rem;
  position:relative;
}
.droptext{
  color: #fff;
  font-size: .28rem;
  font-weight:bold;
  white-space: nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
  width: 94%;
}
.down-arrow{
  width: .22rem;
  height: .12rem;
  background:url(https://red.manbu.xyz/red/down-arrow.png);
  background-size: .22rem .12rem;
  margin-right: .20rem;
}
.down-arrow{
  position:absolute;
  top: .15rem;
  right: 0;
  z-index: 99;
}
.select-container{
  position:absolute;
  left: 0;
  top: .86rem;
  background-color: #fff;
  display: none;
  z-index:999;
}
.select-container.show{
  display: flex;
  flex-direction: row;
  width: 100%;

}
.select-street{
  width: 2.00rem;
  background: #F8F8F8;
}
.select-street .grid{
  height: .80rem;
  padding-left: .20rem;
  line-height: .80rem;
  font-size: .24rem;
  color: #2A272E;
}

.select-street .grid.selected{
  border-left:.04rem #1769f5 solid;
  background-color: #fff;
  color: #1769F5;
}

.select-community{
  padding: 0 0 0 .30rem;
  flex:1;
}

.select-community .grid{
  height: .80rem;
  padding-left: .20rem;
  line-height: .80rem;
  border-bottom: 1px solid #dfdfdf;
  color: rgba(42, 39, 46, 0.8);
  font-size: .24rem;
}
.select-community .grid.selected{
  background-color: #fff;
  color: #1769F5;
}

.p-r{
  position: relative;
  width: 25%;
}
.down-arrow{
  z-index: 999;
}

input{
  font-size: .24rem;
}
textarea{
  font-size: .24rem;
}

.font-normal{
  overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;
}
.address-info{
  flex:1;
  white-space: nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}
.split{
    height:.60rem;
    width:0.2rem;
    background:rgba(238, 238, 238, 1);
}
</style>
