<template lang="html">
    <div id="header">
        <div class="navbar">
            <div class="container">
                <div class="navbar-header">
                    <router-link :to="{ name: 'Index' }" class="navbar-brand" v-if="!$store.getters.isPhone">
                        <img src="./../assets/images/logo.png" alt="">
                    </router-link>
                    <div class="phone_back" v-if="$store.getters.isPhone">
                        <span class="phone_back_icon" @click="goBack">
                            <i class="fa fa-arrow-left"></i>
                        </span>
                        <VueElementLoadingSm v-if="!phoneTitleLoaded"></VueElementLoadingSm>
                        <span class="phone_back_title">{{phoneTitle}}</span>
                    </div>
                    <button type="button" name="button" class="navbar-toggle" @click="emitClickEvent">
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                </div>
                <div id="collapse-menu" class="collapse navbar-collapse" v-if="isNotPhone">
                    <ul class="nav navbar-nav pull-right">
                        <li>
                            <router-link :to="{ name: 'Index', params: {} }">网站首页</router-link>
                        </li>
                        <li class="dropdown">
                            <router-link :to="{ name: 'Page', params: {id: 22} }" class="dropdown-toggle">律师介绍</router-link>
                            <ul class="dropdown-menu lv2">
                                <li>
                                    <router-link :to="{ name: 'Page', params: {id: 22} }">律师简介</router-link>
                                </li>
                                <li>
                                    <router-link :to="{ name: 'PostCate', params: {catelv1id: 28, cateid: 28} }">荣誉资质</router-link>
                                </li>
                            </ul>
                        </li>
                        <li class="dropdown">
                            <router-link :to="{ name: 'PostCate', params: {catelv1id: 1, cateid: 1} }" class="dropdown-toggle">服务项目</router-link>
                            <ul class="dropdown-menu lv2">
                                <li class="dropdown lv2" v-for="serviceCate in serviceCatesLv2Data">
                                    <router-link :to="{ name: 'PostCate', params: {catelv1id: 1, cateid: serviceCate.id} }" class="dropdown-toggle">{{serviceCate.name}}</router-link>
                                    <HeaderNavbarServiceCatesLv3 :parentCateId="serviceCate.id" :optionUpdated="optionUpdated"></HeaderNavbarServiceCatesLv3>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <router-link :to="{ name: 'Page', params: {id: 27} }">服务优势</router-link>
                        </li>
                        <li>
                            <router-link :to="{ name: 'PostCate', params: {catelv1id: 3, cateid: 3} }">律师动态</router-link>
                        </li>
                        <li class="dropdown">
                            <router-link :to="{ name: 'PostCate', params: {catelv1id: 4, cateid: 4} }" class="dropdown-toggle">法律知识</router-link>
                            <ul class="dropdown-menu lv2">
                                <li v-for="infoCate in infoCatesLv2Data">
                                    <router-link :to="{ name: 'PostCate', params: {catelv1id: 4, cateid: infoCate.id} }">{{infoCate.name}}</router-link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <router-link :to="{ name: 'Page', params: {id: 180} }">在线咨询</router-link>
                        </li>
                        <li>
                            <router-link :to="{ name: 'Page', params: {id: 29} }">联系律师</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

    </div>
    <!-- header end -->
</template>

<script>
    import HeaderNavbarServiceCatesLv3 from './header_navbar_servicecateslv3.vue';
    export default {
        components: {
            HeaderNavbarServiceCatesLv3,
        },
        props: {
            optionUpdated: {
                type: Boolean
            },
            phoneCateName: {
                type: String
            },
            phonePageTitle: {
                type: String
            }
        },
        data () {
            return {
                infoCatesLv2Data: [],
                serviceCatesLv2Data: [],
            };
        },
        computed: {
            isNotPhone () {
                let windowWidth = window.innerWidth;
                if (windowWidth < 768) {
                    return false;
                } else {
                    return true;
                }
            },
            routeName () {
                return this.$route.name;
            },
            phoneTitle () {
                if (this.routeName === 'Index') {
                    return '首页';
                } else if (this.routeName === 'PostCate' || this.routeName === 'PostCatePagi') {
                    return this.phoneCateName;
                } else if (this.routeName === 'PostDetail') {
                    return '文章详情';
                } else if (this.routeName === 'Page') {
                    return this.phonePageTitle;
                } else {
                    return '出错啦';
                }
            },
            phoneTitleLoaded () {
                if (this.phoneTitle === '') {
                    return false;
                } else {
                    return true;
                }
            }
        },
        methods: {
            getInfoCatesLv2Data () {
                this.$getDataFromServerOrCache('/wp-json/wp/v2/categories/?fields=id,name&orderby=id&parent=4','infoCatesLv2Data','infoCatesLv2',this.optionUpdated,null,false,null,null);
            },
            getServiceCatesLv2Data () {
                this.$getDataFromServerOrCache('/wp-json/wp/v2/categories/?fields=id,name,acf&orderby=id&parent=1','serviceCatesLv2Data','serviceCatesLv2',this.optionUpdated,null,false,null,null);
            },
            emitClickEvent () {
                this.$emit('toggleButtonClicked');
            },
            goBack () {
                history.back();
            }
        },
        created () {
            if (this.isNotPhone) {
                this.getServiceCatesLv2Data();
                this.getInfoCatesLv2Data();
            }
        },
    }
</script>

<style lang="less">
</style>
