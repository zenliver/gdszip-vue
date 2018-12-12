// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App.vue';
import router from './router/router.js';
import store from './vuex/store.js';

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
NProgress.configure({
    minimum: 0.1,
    ease: 'ease',
    speed: 200,
    trickleSpeed: 200,
    showSpinner: false
});
Vue.prototype.$nprogress = NProgress;

import { Loading } from 'element-ui';
Vue.use(Loading);

import { Swipe, SwipeItem } from 'mint-ui';
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

import VueElementLoading from './components/common/VueElementLoading.vue';
Vue.component('VueElementLoading',VueElementLoading);

import VueElementLoadingSm from './components/common/VueElementLoadingSm.vue';
Vue.component('VueElementLoadingSm',VueElementLoadingSm);

// jquery
import $ from 'jquery';
Vue.prototype.$$ = $;
Vue.prototype.apiBaseUrl = 'https://www.gdszip.com';

// axios
import axios from 'axios';
axios.defaults.baseURL = 'https://www.gdszip.com';
// 添加请求计数器
var requestNum = 0;
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
        // 在发送请求之前做些什么
        // console.log(config);
        if (config.url.indexOf('appdataver') < 0 && config.url.indexOf('redux_options') < 0) {
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
        if (response.config.url.indexOf('appdataver') < 0 && response.config.url.indexOf('redux_options') < 0) {
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
Vue.prototype.$getData = function (
    apiUrl,
    dataKey,
    dataLoadedKey,
    setDataLoadedFalseBeforeGet,
    beforeGetFunc,
    afterGetFunc,
    errorHandler,
    dataProcessor
) {

    // 获取数据前插入的操作
    if (beforeGetFunc !== null) {
        beforeGetFunc();
    }

    if (setDataLoadedFalseBeforeGet === true && dataLoadedKey !== null) {
        this[dataLoadedKey] = false;
    }

    // jquery方法（兼容性好）
    $.ajax({
        url: this.apiBaseUrl+apiUrl,
        type: 'GET',
        dataType: 'json',
    })
    .done( (data) => {

        let originalData = data;

        // 如果需要，对服务端返回的数据进行处理
        if (dataProcessor !== 'no-dataProcessor') {
            dataProcessor(originalData);
        }

        // 保存数据
        this[dataKey] = originalData;

        // 标记数据加载状态
        if (dataLoadedKey !== null) {
            this[dataLoadedKey] = true;
        }

        // 服务端数据返回后插入的操作
        if (afterGetFunc !== null) {
            afterGetFunc();
        }

    })
    .fail( () => {
        // 如果需要，添加错误处理器
        if (errorHandler !== null) {
            errorHandler();
        }
    })
    .always(function() {
        // console.log("complete");
    });


    // axios方法（兼容性不好，弃用）
    // this.$axios.get(apiUrl).then( (response) => {
    //
    //     this[dataKey] = response.data;
    //
    //     if (dataLoadedKey !== null) {
    //         this[dataLoadedKey] = true;
    //     }
    //
    //     if (afterGetFunc !== null) {
    //         afterGetFunc();
    //     }
    //
    // });

}


// 请求API数据并缓存，若存在缓存且服务端未更新则从缓存读取
Vue.prototype.$getDataFromServerOrCache = function (
    apiUrl,
    dataKey,
    storageKey,
    updateFlag,
    dataLoadedKey,
    setDataLoadedFalseBeforeGet,
    beforeGetFunc,
    afterGetFunc
) {

    let getDataThenCache = () => {

        // 从服务端获取数据前插入的操作
        if (beforeGetFunc !== null) {
            beforeGetFunc();
        }

        // setDataLoadedFalseBeforeGet
        if (setDataLoadedFalseBeforeGet === true && dataLoadedKey !== null) {
            this[dataLoadedKey] = false;
        }

        // jquery方法（兼容性好）
        $.ajax({
            url: this.apiBaseUrl+apiUrl,
            type: 'GET',
            dataType: 'json',
        })
        .done( (data) => {
            // 保存数据
            this[dataKey] = data;

            // 标记数据加载状态
            if (dataLoadedKey !== null) {
                this[dataLoadedKey] = true;
            }

            // 获取到数据后插入的操作
            if (afterGetFunc !== null) {
                afterGetFunc();
            }

            // 从服务端获取到数据后缓存数据
            window.localStorage.setItem(storageKey, JSON.stringify(this[dataKey]) );

        })
        .fail(function() {
            // console.log("error");
        })
        .always(function() {
            // console.log("complete");
        });


        // axios方法（兼容性不好，弃用）
        // this.$axios.get(apiUrl).then( (response) => {
        //
        //     // 保存数据
        //     this[dataKey] = response.data;
        //
        //     // 标记数据加载状态
        //     if (dataLoadedKey !== null) {
        //         this[dataLoadedKey] = true;
        //     }
        //
        //     // 获取到数据后插入的操作
        //     if (afterGetFunc !== null) {
        //         afterGetFunc();
        //     }
        //
        //     // 从服务端获取到数据后缓存数据
        //     window.localStorage.setItem(storageKey, JSON.stringify(this[dataKey]) );
        //
        // });

    };

    if (updateFlag) {
        getDataThenCache();
    } else {
        if (window.localStorage.getItem(storageKey) === null) {
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
            this[dataKey] = JSON.parse(window.localStorage.getItem(storageKey));

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


// 提交数据
Vue.prototype.$postData = function (
    apiUrl,
    postData,
    successHandler,
    errorHandler
) {

    $.ajax({
        url: this.apiBaseUrl+apiUrl,
        type: 'POST',
        data: postData
    })
    .done( (data) => {

        if (successHandler !== 'no-successHandler') {
            successHandler();
        }

    })
    .fail( () => {

        if (errorHandler !== 'no-errorHandler') {
            errorHandler();
        }

    })
    .always(function() {
        // console.log("complete");
    });

}


Vue.config.productionTip = false;

// cordova

// document.addEventListener('deviceready', function() {
//     new Vue({
//         el: '#app',
//         router,
//         store,
//         components: { App },
//         template: '<App/>'
//     });
//     // window.navigator.splashscreen.hide()
// }, false);


/* eslint-disable no-new */

new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
});
