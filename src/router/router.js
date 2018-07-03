import Vue from 'vue'
import Router from 'vue-router'
import Index from './../router-view/index.vue';
import PostDetail from './../router-view/post_detail.vue';
import PostCate from './../router-view/post_cate.vue';
import Page from './../router-view/page.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Index',
            component: Index
        },
        {
            path: '/post/cate/:catelv1id/:cateid',
            name: 'PostCate',
            component: PostCate
        },
        {
            path: '/post/cate/:catelv1id/:cateid/p/:pagiid',
            name: 'PostCatePagi',
            component: PostCate
        },
        {
            path: '/post/detail/:catelv1id/:cateid/:postid',
            name: 'PostDetail',
            component: PostDetail
        },
        {
            path: '/page/:id',
            name: 'Page',
            component: Page
        },
    ]
})
