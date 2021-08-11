import axios from 'axios'
import {Toast} from 'vant';
import {Local} from '@/utils/storage'

let loading;

// 创建axios实例
const serviceFroRiver = axios.create({
	baseURL:'/api', // api 的 base_url
	timeout: 60000 // 请求超时时间
})
// request interceptor
serviceFroRiver.interceptors.request.use(config => {
	//token暂时写死
	// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMyNSIsInRpbWUiOjE1NzY1ODQxOTI0MjYsInJlZ2lvbiI6IjMzMDAwMDAwMDAwMCwzMzA3MDAwMDAwMDAiLCJ1c2VybmFtZSI6ImFkbWluIn0.UnIFe4x2-bdDcmpsP024eTAsCdPwGgvUwNFvOtMThZY";

    loading = Toast.loading({
		duration: 0,       // 持续展示 toast
		forbidClick: true, // 禁用背景点击
		mask: true, //是否显示背景遮罩层
		loadingType: 'spinner',
		message: "加载中..."
	});

	if (Local.get('token')) {
		// config.headers['token'] = Cookies.get('token'); // 让每个请求携带自定义 token 请根据实际情况自行修改
		config.headers['token'] = Local.get('token'); // 让每个请求携带自定义 token 请根据实际情况自行修改
	}
	
	if (config.method == 'get') {
		// console.log(config.params);
		// config.params._t = Date.parse(new Date()) / 1000;
		// config.params = {
		//   _t: Date.parse(new Date()) / 1000,
		//   ...config.params
		// }
	}
	return config
}, (error) => {
	return Promise.reject(error)
})

// response 拦截器
serviceFroRiver.interceptors.response.use(

	response => {
		loading.clear();

		const res = response.data
		if (res.code !== 200 && res.code !== 140002&& res.code !== '0000') {
			// Toast("提示:" + res.message)
			// Toast("请求错误" )
			// return Promise.reject('error')
			return response.data
		} else {
			return response.data
		}
		// return response.data
	},
	error => {
		loading.clear();
		// Toast("error:" + error)
		Toast("操作频繁!")
		return Promise.reject(error)
	}
)

export {
	serviceFroRiver
}
