import {serviceFroRiver} from '@/utils/request';
import {config} from '@/config/urlList';

// 登录接口
export function login(params) {
    return serviceFroRiver({
        url: config.loginUrl,
        method: 'post',
        headers: {'Content-Type': 'application/json; charset=UTF-8'}, // 适用json提交
        data: params // post的参数必须放 data属性里
    })
}



//获取验证码
export function getCode(params) {
    return serviceFroRiver({
        url: config.getCode,
        method: 'get',
        params: params
    })
}
