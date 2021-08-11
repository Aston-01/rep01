// var host = "https://red.manbu.xyz/prod-api";
var host = "dev-api/";
// var host = "https://www.hongse24h.cn/prod-api";
// var host = "http://localhost:8080/dev-api";
// var host = "http://132.129.11.201:8080/dev-api";
var config = {
    host,
    loginUrl:host+"/minProgram/login/getToken",
    streetUrl:host+"/minProgram/street/getKeyList",
    bannerUrl:host+"/minProgram/street/getBanner",
    activityUrl:host+"/minProgram/business/activity/list",
    activitytrailUrl:host+"/minProgram/business/trail/mineList",
    signtrailUrl:host+"/minProgram/business/trail/sign",
    positionUrl:host+"/minProgram/business/position/list",
    venueUrl:host+"/minProgram/business/venue/list",
    infoUrl:host+"/minProgram/business/info/list",
    myInfoUrl:host+"/minProgram/business/myInfo",
    shopfoUrl:host+"/minProgram/business/pointGoods/exchangeList",
    shopDetailUrl:host+"/minProgram/business/pointGoods/getDetail",
    ScoreUrl:host+"/minProgram/business/all/list",
    detailList:host+"/minProgram/business/all/detailList",
    getScoreList:host+"/minProgram/business/getScore/list",
    getDetail:host+"/minProgram/business/all/getDetail",
    ScoreListUrl:host+"/minProgram/business/use/list",
    addScoreUrl:host+"/minProgram/business/use/add",
    getEducationUrl:host+"/minProgram/street/getKeyList",
    register:host+"/minProgram/login/register",
    getCode:host+"/minProgram/login/getCode",
    getInfo:host+"/minProgram/business/getInfo",
    getOpenid:host+"/minProgram/login/getOpen_id",
    telUrl:host+"/minProgram/login/getPhoneNumber",
    venueAllUrl:host+"/minProgram/business/venue",
    venueBookUrl:host+"/minProgram/business/PcVenueBook",
    activejoin:host+"/minProgram/business/join/list",
    activecomment:host+"/minProgram/business/comment/list",
    addActiveurl:host+"/minProgram/business/trail/add",
    activeEvateurl:host+"/minProgram/business/trail/comment",
    cancelActiveurl:host+"/minProgram/business/trail/cancel",
    infoAllUrl:host+"/minProgram/business/info",
    viewHotUrl:host+"/minProgram/business/venue/hotList",
    activeHotUrl:host+"/minProgram/business/activity/hotList",
    venueCommentUrl:host+"/minProgram/business/VenueComment",
    activeCheckUrl:host+"/minProgram/business/activity/check",
    uploudUrl:host+"/minProgram/business/common/uploadImage",
    updateUserUrl:host+"/minProgram/business/updateUser",
    noticetrailUrl:host+"/minProgram/business/noticeTrail"
}
export{
    config
}
