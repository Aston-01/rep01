<template>
<!--pages/news/newsContent.wxml-->
<div class="news">
    <div class="title">{{news.title}}</div>
    <div class="time">{{news.createTime}}</div>
    <div class="content-img"><img :src="news.headimg" /></div>
    <div class="content" v-html="news.content">
        <!-- <rich-text nodes=""></rich-text>
   -->
        
    </div>
    <div class="bottom-info">
        <div class="hits">阅读 {{news.readnum}}</div>
        <div class="uploader">{{news.positionName}}</div>
    </div>
</div>
</template>

<script>
import { Toast } from 'vant';
import * as api from "@/api/content";

export default {
    data() {
        return {
            news: {}
        }
    },
    created() {
        var id = this.$route.params.id
        console.log(this.$route.params);
        if (JSON.stringify(this.$route.params) === '{}') {
            this.$router.push("index");
        }
        //资讯详情
        var that = this;
        that.getNewsList(id);
    },
    methods: {
        getNewsList: function (id) {
            var xxs = this;
            
            var data = {
                id: id
            };
            api.positionNewsList(data).then((res) => {
                if (res.code == 200) {
                    this.news = res.data[0];
                    console.log(res);
                } else {
                    
                    Toast(res.msg)
                }
                xxs.insertNoticeTrail(this.news);
            })

        },
        insertNoticeTrail: function (news) {
            //记录浏览量
            // noticetrailUrl
            var data = {
                deptId: news.streetId,
                noticeId: news.id
            };
            api.noticetrail(data).then(data => {
                var result = data;
                if (result.code == '200') {
                    console.log(result);
                } else {
                    Toast('error')
                    return
                }
            });
        },
    }
}
</script>

<style scoped>
/* pages/news/newsContent.wxss */
.news {
    padding: .20rem;
}

.title {
    text-align: center;
    color: #000;
    font-size: .32rem;
}

.time {
    color: #CBCBCB;
    font-size: .24rem;
    text-align: center;
}

.bottom-info {
    color: #CDCDCD;
    font-size: .24rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.content {
    color: #000;
    font-size: .24rem;
    margin: .20rem;
}

.content-img img {
    width: 100%;
    margin: .10rem 0;
}
</style>
