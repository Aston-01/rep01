import {serviceFroRiver} from '@/utils/request';
import {config} from '@/config/urlList';
// 首页

// 轮播图
export function getBanner(params) {
    return serviceFroRiver({
        url: config.bannerUrl,
        method: 'get',
        params: params
    })
}

//首页活动列表
export function getActive(params) {
    return serviceFroRiver({
        url: config.activeHotUrl,
        method: 'get',
        params: params
    })
}
// 首页 getInfo
export function getInfo(params) {
    return serviceFroRiver({
        url: config.getInfo,
        method: 'get',
        params: params
    })
}
// 首页热门场馆  viewHotUrl
export function getViewHot(params) {
    return serviceFroRiver({
        url: config.viewHotUrl,
        method: 'get',
        params: params
    })
}

//首页新闻列表 infoUrl
export function getNewList(params) {
    return serviceFroRiver({
        url: config.infoUrl,
        method: 'get',
        params: params
    })
}


//首页阵地列表 positionInfo
export function positionInfo(params) {
    return serviceFroRiver({
        url: config.positionUrl,
        method: 'get',
        params: params
    })
}

//阵地 活动列表 activityUrl
export function getActivity(params) {
    return serviceFroRiver({
        url: config.activityUrl,
        method: 'get',
        params: params
    })
}

//阵地 场馆列表 activityUrl
export function getVenue(params) {
    return serviceFroRiver({
        url: config.venueUrl,
        method: 'get',
        params: params
    })
}
//阵地 资讯 infoAllUrl
export function positionNewsList(params) {
    return serviceFroRiver({
        url: config.infoAllUrl+"/listInfo",
        method: 'get',
        params: params
    })
}


//活动详情

//活动详情 activeCheckUrl
export function activeCheck(params) {
    return serviceFroRiver({
        url: config.activeCheckUrl,
        method: 'get',
        params: params
    })
}
//活动详情 activejoin
export function activejoin(params) {
    return serviceFroRiver({
        url: config.activejoin,
        method: 'get',
        params: params
    })
}
//活动详情 activecomment
export function activecomment(params) {
    return serviceFroRiver({
        url: config.activecomment,
        method: 'get',
        params: params
    })
}
//活动详情 addActiveurl
export function addActive(params) {
    return serviceFroRiver({
        url: config.addActiveurl,
        method: 'get',
        params: params
    })
}
//活动详情 noticetrailUrl
export function noticetrail(params) {
    return serviceFroRiver({
        url: config.noticetrailUrl+ "/add",
        method: 'Post',
        data: params
    })
}
//我的 getMyInfoUrl
export function getMyInfo(params) {
    return serviceFroRiver({
        url: config.myInfoUrl,
        method: 'get',
        params: params
    })
}
//积分 getScoreUrl
export function getScore(params) {
    return serviceFroRiver({
        url: config.ScoreUrl,
        method: 'get',
        params: params
    })
}
//积分细则 getdetailListUrl
export function getdetailList(params) {
    return serviceFroRiver({
        url: config.detailList,
        method: 'get',
        params: params
    })
}
//积分表 getScoreListUrl
export function getScoreList(params) {
    return serviceFroRiver({
        url: config.getScoreList,
        method: 'get',
        params: params
    })
}
//街道 getStreetUrl
export function getStreet(params) {
    return serviceFroRiver({
        url: config.streetUrl,
        method: 'get',
        params: params
    })
}
//活动预定 venueBookUrl
export function venueBookUrl(params) {
    return serviceFroRiver({
        url: config.venueBookUrl+"/mineVenuList",
        method: 'get',
        params: params
    })
}

//商店 venueBookUrl
export function shopfoUrl(params) {
    return serviceFroRiver({
        url: config.shopfoUrl,
        method: 'get',
        params: params
    })
}
//积分url ScoreListUrl
export function ScoreListUrl(params) {
    return serviceFroRiver({
        url: config.ScoreListUrl,
        method: 'get',
        params: params
    })
}
//商店具体 shopDetailUrl
export function shopDetailUrl(params) {
    return serviceFroRiver({
        url: config.shopDetailUrl,
        method: 'get',
        params: params
    })
}
//增加积分 addScoreUrl
export function addScoreUrl(params) {
    return serviceFroRiver({
        url: config.addScoreUrl,
        method: 'get',
        params: params
    })
}
