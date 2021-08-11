import Vue from 'vue';
import App from './App';
import Vant from 'vant';
import 'amfe-flexible';
import { router } from './router';

import 'vant/lib/index.css';
import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, {ak: 'f1To0h59nT9TqcHzrKrMEwlbNb0jEGVK'})

Vue.use(Vant);

function addScript () {
    document.write('<script type="text/javascript" src="https://api.map.baidu.com/api?v=2.0&ak=Q9tU7UdoO6fQSXOBiK8GXb70pZxZESFv"></script>')
}
addScript()

new Vue({
  router,
  el: '#app',
  render: h => h(App)
});
