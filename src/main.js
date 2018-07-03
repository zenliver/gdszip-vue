// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router/router.js';

import './assets/css/libs/bootstrap.min.css';
import './assets/css/libs/font-awesome.min.css';
import './assets/css/common.less';
import './assets/css/page.less';

// skeleton
import PostCateListTxtSkeleton from './components/post_cate_list_txt_skeleton.vue';
Vue.component('PostCateListTxtSkeleton',PostCateListTxtSkeleton);

import PostCateListImgtxtSkeleton from './components/post_cate_list_imgtxt_skeleton.vue';
Vue.component('PostCateListImgtxtSkeleton',PostCateListImgtxtSkeleton);

// 一级菜单组件
import MenuLv1 from './components/menu_lv1.vue';
Vue.component('MenuLv1',MenuLv1);

// swiper
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';
Vue.use(VueAwesomeSwiper, /* { default global options } */);

// import {Pagination} from 'vue-pagination-2';
// Vue.component('pagination', Pagination);

import Paginate from 'vuejs-paginate';
Vue.component('paginate', Paginate);

import BackTop from 'wc-back-top';
Vue.use(BackTop);

import VueBackTop from './components/common/VueBackTop.vue';
Vue.component('VueBackTop',VueBackTop);

import VueGoTop from './components/common/VueGoTop.vue';
Vue.component('VueGoTop',VueGoTop);

import BaiduMap from 'vue-baidu-map';
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  // ak: 'YOUR_APP_KEY'
});

// nprogress
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
// NProgress全局配置
NProgress.configure({minimum: 0.1,ease:'ease',speed:200,trickleSpeed: 200});
Vue.prototype.$nprogress = NProgress;

// import { Loading } from 'element-ui';
// import 'element-ui/lib/theme-chalk/loading.css';
// Vue.use(Loading);

// axios
import axios from 'axios';
axios.defaults.baseURL = 'http://142.0.139.17';
// 添加请求计数器
var requestNum = 0;
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
        // 在发送请求之前做些什么
        // console.log(config);
        if (config.url.indexOf('redux_options') < 0) {
            requestNum++;
            NProgress.start();

            // Loading.service({
            //     text: '加载中',
            //     background: 'rgba(255,255,255,0.8)',
            //     lock: true,
            // });
        }

        return config;
    }, function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
});
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
        // 对响应数据做点什么
        // console.log(response);
        if (response.config.url.indexOf('redux_options') < 0) {
            requestNum--;
        }
        // console.log(requestNum);
        if (requestNum <= 0) {
            NProgress.done();
            // Loading.service().close();
        }

        return response;
    }, function (error) {
        // 对响应错误做点什么
        NProgress.done();
        // Loading.service().close();
        requestNum = 0;
        console.log(error);

        return Promise.reject(error);
});
router.beforeEach(function (to,from,next) {
    // console.log(to);
    // console.log(from);
    requestNum = 0;
    NProgress.done();
    document.title = '🙂加载中...';

    next();
});
Vue.prototype.$axios = axios;

// 定义网站基本标题
Vue.prototype.$baseTitle = '_广东知识产权律师网_吴彬律师网站';

// 添加通用方法

// 请求API数据（无缓存）
Vue.prototype.$getData = function (apiUrl,dataKey,dataLoadedKey,setDataLoadedFalseBeforeGet,beforeGetFunc,afterGetFunc) {

    if (beforeGetFunc !== null) {
        beforeGetFunc();
    }

    if (setDataLoadedFalseBeforeGet === true && dataLoadedKey !== null) {
        this[dataLoadedKey] = false;
    }

    this.$axios.get(apiUrl).then( (response) => {

        this[dataKey] = response.data;

        if (dataLoadedKey !== null) {
            this[dataLoadedKey] = true;
        }

        if (afterGetFunc !== null) {
            afterGetFunc();
        }

    });

}

// 请求API数据并缓存，若存在缓存且服务端未更新则从缓存读取
Vue.prototype.$getDataFromServerOrCache = function (apiUrl,dataKey,storageKey,updateFlag,dataLoadedKey,setDataLoadedFalseBeforeGet,beforeGetFunc,afterGetFunc) {

    let getDataThenCache = () => {

        // 从服务端获取数据前插入的操作
        if (beforeGetFunc !== null) {
            beforeGetFunc();
        }

        // setDataLoadedFalseBeforeGet
        if (setDataLoadedFalseBeforeGet === true && dataLoadedKey !== null) {
            this[dataLoadedKey] = false;
        }

        this.$axios.get(apiUrl).then( (response) => {

            // 保存数据
            this[dataKey] = response.data;

            // 标记数据加载状态
            if (dataLoadedKey !== null) {
                this[dataLoadedKey] = true;
            }

            // 获取到数据后插入的操作
            if (afterGetFunc !== null) {
                afterGetFunc();
            }

            // 从服务端获取到数据后缓存数据
            localStorage.setItem(storageKey, JSON.stringify(this[dataKey]) );
        });
    };

    if (updateFlag) {
        getDataThenCache();
    } else {
        if (localStorage.getItem(storageKey) === null) {
            getDataThenCache();
        } else {

            // 从缓存读取数据前插入的操作
            if (beforeGetFunc !== null) {
                beforeGetFunc();
            }

            // setDataLoadedFalseBeforeGet
            if (setDataLoadedFalseBeforeGet === true && dataLoadedKey !== null) {
                this[dataLoadedKey] = false;
            }

            // 若存在缓存且服务端未更新则从缓存读取数据
            this[dataKey] = JSON.parse(localStorage.getItem(storageKey));

            // 标记数据加载状态
            if (dataLoadedKey !== null) {
                this[dataLoadedKey] = true;
            }

            // 从缓存读取数据后插入的操作
            if (afterGetFunc !== null) {
                afterGetFunc();
            }

        }
    }
};

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
