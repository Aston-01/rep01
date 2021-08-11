import {serviceFroRiver} from '@/utils/request';
import {config} from '@/config/urlList';

// 注册
export function register(params) {
    return serviceFroRiver({
        url: config.register,
        method: 'post',
        headers: {'Content-Type': 'application/json; charset=UTF-8'}, // 适用json提交
        data: params // post的参数必须放 data属性里
    })
}

//获取街道列表
export function getStreet(params) {
    return serviceFroRiver({
        url: config.streetUrl,
        method: 'get',
        params: params
    })
}
//获取学历
export function getEducation(params) {
    return serviceFroRiver({
        url: config.getEducationUrl,
        method: 'get',
        params: params
    })
}
