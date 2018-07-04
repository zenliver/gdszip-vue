<template>
    <div id="app">

        <div id="app_loading" :style="appLoadingStyle" v-if="!reduxDataLoaded">
            <div class="app_loading_logo">
                <img src="./assets/images/logo.png" alt="" class="img-responsive">
            </div>
            <div class="app_loading_el" v-loading="true" element-loading-text="加载中..." element-loading-background="#f1f1f1"></div>
        </div>

        <div id="app_wrapper" :class="appWrapperSlideClass" @animationend="removeAnimationClass" v-if="reduxDataLoaded">
            <Header :optionUpdated="optionUpdated" @toggleButtonClicked="showCollapseMenu"></Header>
            <div id="header_placeholder"></div>
            <BannerInner v-if="isNotIndexRoute"></BannerInner>
            <transition name="fade">
                <router-view :reduxData="reduxData" :optionUpdated="optionUpdated" :contentUpdated="contentUpdated" v-if="reduxDataLoaded"></router-view>
            </transition>
            <Footer :reduxData="reduxData"></Footer>
            <FooterBtm></FooterBtm>
            <FooterPhoneFixedBar></FooterPhoneFixedBar>
            <RightFixedBar :reduxData="reduxData" v-if="reduxDataLoaded"></RightFixedBar>
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
                appWrapperSlideClass: ''
            };
        },
        computed: {
            appLoadingStyle () {
                let windowHeight = window.innerHeight;
                return {
                    marginTop: (windowHeight-156)/2+'px'
                };
            },
            isNotIndexRoute () {
                if (this.$route.name === 'Index') {
                    return false;
                } else {
                    return true;
                }
            }
        },
        methods: {
            checkAppDataUpdate () {
                this.$axios.get('/wp-content/themes/gdszip/data/appdataver-json-cors.php').then( (response) => {
                    this.appDataVer = response.data;
                    // console.log(typeof(this.appDataVer.optionVer));
                    this.appDataVerLoaded = true;

                    // 检查后台设置是否有更新
                    if (localStorage.optionVer === undefined) {
                        this.optionUpdated = true;
                        localStorage.setItem('optionVer',this.appDataVer.optionVer);
                    } else {
                        if (this.appDataVer.optionVer !== localStorage.optionVer) {
                            this.optionUpdated = true;
                            localStorage.optionVer = this.appDataVer.optionVer;
                        }
                    }

                    // 检查网站内容是否有更新
                    if (localStorage.contentVer === undefined) {
                        this.contentUpdated = true;
                        localStorage.setItem('contentVer',this.appDataVer.contentVer);
                    } else {
                        if (this.appDataVer.contentVer !== localStorage.contentVer) {
                            this.contentUpdated = true;
                            localStorage.contentVer = this.appDataVer.contentVer;
                        }
                    }

                    this.getReduxData();

                });
            },
            getReduxData () {

                // if (this.optionUpdated) {
                //     this.$axios.get('/data/json-cors.php?file=redux_options.json').then( (response) => {
                //         this.reduxData = response.data;
                //         this.reduxDataLoaded = true;
                //
                //         localStorage.reduxData = JSON.stringify(this.reduxData);
                //     });
                // } else {
                //     this.reduxData = JSON.parse(localStorage.reduxData);
                //     this.reduxDataLoaded = true;
                // }

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
            }
        },
        created () {
            this.checkAppDataUpdate();
        },
        watch: {
            $route () {
                // this.collapseMenuClass = '';
                // this.showCollapseMenuMask = false;
            },
        }
    }
</script>

<style lang="less">
    .app_loading_el {
        height: 100px;
    }
</style>
