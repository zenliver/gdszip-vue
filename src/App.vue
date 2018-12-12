<template>
    <div id="app">

        <div id="app_loading" :style="appLoadingStyle" v-if="!reduxDataLoaded">
            <div class="app_loading_logo">
                <img src="./assets/images/logo.png" alt="" class="img-responsive" v-if="isNotPhone">
                <img src="./../static/images/app_icon/icon-72-hdpi.png" alt="" class="img-responsive" v-if="!isNotPhone">
                <div class="app_loading_logo_txt text-center" v-if="!isNotPhone">吴彬律师</div>
            </div>
            <VueElementLoading :height="'100px'" :bg="'#f1f1f1'" v-if="!showLoadingError"></VueElementLoading>
            <div class="app_loading_error text-center" v-if="showLoadingError">😥抱歉，服务器连接失败，请重试。</div>
            <div class="app_loading_suport text-center">技术支持：zenliver</div>
        </div>

        <div id="app_wrapper" :class="appWrapperSlideClass" @animationend="removeAnimationClass" v-if="reduxDataLoaded">
            <Header :optionUpdated="optionUpdated" :phoneCateName="headerPhoneCateName" :phonePageTitle="headerPhonePageTitle" @toggleButtonClicked="showCollapseMenu"></Header>
            <div id="header_placeholder"></div>
            <BannerInner v-if="isNotIndexRoute"></BannerInner>
            <transition>
                <router-view :reduxData="reduxData" :optionUpdated="optionUpdated" :contentUpdated="contentUpdated" @cateDataLoaded="recieveCateName" @pageTitleLoaded="recievePageTitle" v-if="reduxDataLoaded"></router-view>
            </transition>
            <Footer :reduxData="reduxData" v-if="isNotPhone"></Footer>
            <FooterBtm v-if="isNotPhone"></FooterBtm>
            <FooterPhoneFixedBar v-if="!isNotPhone"></FooterPhoneFixedBar>
            <RightFixedBar :reduxData="reduxData" v-if="reduxDataLoaded && isNotPhone"></RightFixedBar>
        </div>

        <div id="app_collapse_menu_mask" v-show="showCollapseMenuMask" @click="hideCollapseMenu"></div>

        <div id="app_collapse_menu" class="collapse navbar-collapse" :class="collapseMenuClass">
            <MenuLv1 class="nav navbar-nav" @menuClicked="navigateMenus"></MenuLv1>
        </div>

    </div>
</template>

<script>
    import Header from './components/header.vue';
    import BannerInner from './components/banner_inner.vue';
    import Footer from './components/footer.vue';
    import FooterBtm from './components/footer_btm.vue';
    import FooterPhoneFixedBar from './components/footer_phone_fixed_bar.vue';
    import RightFixedBar from './components/right_fixedbar.vue';

    export default {
        name: 'App',
        components: {
            Header,
            BannerInner,
            Footer,
            FooterBtm,
            FooterPhoneFixedBar,
            RightFixedBar
        },
        data () {
            return {
                appDataVer: {},
                appDataVerLoaded: false,
                optionUpdated: false,
                contentUpdated: false,
                reduxData: {},
                reduxDataLoaded: false,
                showCollapseMenuMask: false,
                collapseMenuClass: '',
                appWrapperSlideClass: '',
                showLoadingError: false,
                headerPhoneCateName: '',
                headerPhonePageTitle: ''
            };
        },
        computed: {
            appLoadingStyle () {
                let windowHeight = window.innerHeight;
                return {
                    marginTop: (windowHeight-230)/2+'px'
                };
            },
            isNotIndexRoute () {
                if (this.$route.name === 'Index') {
                    return false;
                } else {
                    return true;
                }
            },
            isNotPhone () {
                let windowWidth = window.innerWidth;
                if (windowWidth < 768) {
                    return false;
                } else {
                    return true;
                }
            }
        },
        methods: {
            checkAppDataUpdate () {

                let afterGetFunc = () => {

                    // 检查后台设置是否有更新
                    if (window.localStorage.getItem('optionVer') === null) {
                        this.optionUpdated = true;
                        window.localStorage.setItem('optionVer',this.appDataVer.optionVer);
                    } else {
                        if (this.appDataVer.optionVer !== window.localStorage.getItem('optionVer')) {
                            this.optionUpdated = true;
                            window.localStorage.setItem('optionVer',this.appDataVer.optionVer);
                        }
                    }

                    // 检查网站内容是否有更新
                    if (window.localStorage.getItem('contentVer') === null) {
                        this.contentUpdated = true;
                        window.localStorage.setItem('contentVer',this.appDataVer.contentVer);
                    } else {
                        if (this.appDataVer.contentVer !== window.localStorage.getItem('contentVer')) {
                            this.contentUpdated = true;
                            window.localStorage.setItem('contentVer',this.appDataVer.contentVer);
                        }
                    }

                    // 检查更新后获取reduxData
                    this.getReduxData();

                };

                let errorHandler = () => {
                    this.showLoadingError = true;
                };

                this.$getData('/wp-content/themes/gdszip/data/appdataver-json-cors.php','appDataVer','appDataVerLoaded',false,null,afterGetFunc,errorHandler,'no-dataProcessor');

            },
            getReduxData () {

                this.$getDataFromServerOrCache('/data/json-cors.php?file=redux_options.json','reduxData','reduxData',this.optionUpdated,'reduxDataLoaded',false,null,null);

            },
            showCollapseMenu () {

                this.showCollapseMenuMask = true;
                this.collapseMenuClass = 'slide_in';
                this.appWrapperSlideClass = 'slide_right';


                // let collapseMenuMask = document.createElement('div');
                // collapseMenuMask.id = 'app_collapse_menu_mask';
                // let appEl = document.getElementById('app');
                // appEl.appendChild(collapseMenuMask);

                let collapseMenuMask = document.getElementById('app_collapse_menu_mask');
                // collapseMenuMask.style.display = 'block';

                collapseMenuMask.addEventListener('click', () => {
                    // collapseMenuMask.style.display = 'none';
                });

            },
            hideCollapseMenu () {
                this.showCollapseMenuMask = false;
                this.collapseMenuClass = 'slide_out';
                this.appWrapperSlideClass = 'slide_left';
            },
            removeAnimationClass (e) {
                if (e.animationName === 'appWrapperSlideLeft') {
                    this.appWrapperSlideClass = '';
                }
            },
            navigateMenus () {
                this.showCollapseMenuMask = false;
                this.collapseMenuClass = 'slide_out';
                this.appWrapperSlideClass = 'slide_left';
            },
            recieveCateName (cateName) {
                this.headerPhoneCateName = cateName;
            },
            recievePageTitle (pageTitle) {
                this.headerPhonePageTitle = pageTitle;
            }
        },
        created () {
            this.checkAppDataUpdate();
        },
        watch: {
            $route () {

                // this.collapseMenuClass = '';
                // this.showCollapseMenuMask = false;

                this.headerPhoneCateName = '';
                this.headerPhonePageTitle = '';

            },
        }
    }
</script>

<style lang="less">
    .app_loading_error {
        padding-top: 30px;
        padding-bottom: 30px;
        font-size: 16px;
    }
    .app_loading_logo_txt {
        font-size: 20px;
        color: #0798db;
        font-weight: bold;
        padding-top: 20px;
    }
    .app_loading_suport {
        color: #aaa;
        font-size: 12px;
        padding-top: 20px;
    }
</style>
