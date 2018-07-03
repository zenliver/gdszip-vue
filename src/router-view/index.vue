<template lang="html">
    <div id="router-view">

        <div id="index_banner">
            <swiper :options="bannerSwiperOption" ref="indexBannerSwiper">
                <!-- slides -->
                <swiper-slide v-for="(indexBannerSlide, index) in indexBannerSlides" :key="index">
                    <a :href="indexBannerSlide.url">
                        <div class="swiper_slide_img" :style="'background-image: url('+indexBannerSlide.image+');'"></div>
                    </a>
                </swiper-slide>

                <!-- Optional controls -->
                <div class="swiper-pagination"  slot="pagination"></div>
                <div class="swiper-button-prev" slot="button-prev"></div>
                <div class="swiper-button-next" slot="button-next"></div>
                <!-- <div class="swiper-scrollbar"   slot="scrollbar"></div> -->
            </swiper>
        </div>
        <!-- index_banner end -->

        <div id="index_about" class="index_block">
            <div class="container">
                <div class="mod_index_title">
                    <div class="mod_index_title_main">律师介绍</div>
                    <div class="mod_index_title_sub">ABOUT LAWYER</div>
                </div>
                <div class="index_about_content">
                    <div class="row">
                        <div class="col-md-4 col-sm-3">
                            <div class="index_about_img">
                                <img :src="reduxData['index-about-head'].url" alt="" class="img-responsive">
                            </div>
                        </div>
                        <div class="col-md-8 col-sm-9">
                            <div class="index_about_txt">
                                <div class="index_about_txt_content" v-html="reduxData.index_about_txt">
                                </div>
                                <div class="index_about_more">
                                    <router-link :to="{ name: 'Page', params: {id: 22} }" class="btn_hover">更多介绍 →</router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- index_about end -->

        <div id="index_service" class="index_block">
            <div class="container">
                <div class="index_service">
                    <div class="mod_index_title">
                        <div class="mod_index_title_main">服务项目</div>
                        <div class="mod_index_title_sub">Service categories</div>
                    </div>
                    <div class="index_service_content link_hover">
                        <div class="row">
                            <div class="col-md-4 col-sm-4" v-for="serviceCateLv1 in serviceCatesLv1">
                                <div class="index_service_item">
                                    <div class="index_service_item_icon">
                                        <img :src="serviceCateLv1.acf.cate_img" alt="" class="img-responsive">
                                    </div>
                                    <div class="index_service_item_title">
                                        <router-link :to="{ name: 'PostCate', params: {catelv1id: 1, cateid: serviceCateLv1.id} }">{{serviceCateLv1.name}}</router-link>
                                    </div>
                                    <IndexServiceList :serviceCateId="serviceCateLv1.id" :optionUpdated="optionUpdated"></IndexServiceList>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- index_service end -->

        <div id="index_advantage" v-if="isAdvantageDataLoaded">
            <div class="container">
                <div class="index_advantage">
                    <div class="mod_index_title">
                        <div class="mod_index_title_main">服务优势</div>
                        <div class="mod_index_title_sub">service advantage</div>
                    </div>
                    <div class="index_advantage_content">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="index_advantage_item clearfix">
                                    <div class="index_advantage_item_left">
                                        <div class="index_advantage_item_num">1</div>
                                        <div class="index_advantage_item_title">{{advantageData.acf.service_advantage_name1}}</div>
                                    </div>
                                    <div class="index_advantage_item_right" v-html="advantageData.acf.service_advantage_content1">
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="index_advantage_item clearfix">
                                    <div class="index_advantage_item_left">
                                        <div class="index_advantage_item_num">2</div>
                                        <div class="index_advantage_item_title">{{advantageData.acf.service_advantage_name2}}</div>
                                    </div>
                                    <div class="index_advantage_item_right" v-html="advantageData.acf.service_advantage_content2">
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="index_advantage_item clearfix">
                                    <div class="index_advantage_item_left">
                                        <div class="index_advantage_item_num">3</div>
                                        <div class="index_advantage_item_title">{{advantageData.acf.service_advantage_name3}}</div>
                                    </div>
                                    <div class="index_advantage_item_right" v-html="advantageData.acf.service_advantage_content3">
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="index_advantage_item clearfix">
                                    <div class="index_advantage_item_left">
                                        <div class="index_advantage_item_num">4</div>
                                        <div class="index_advantage_item_title">{{advantageData.acf.service_advantage_name4}}</div>
                                    </div>
                                    <div class="index_advantage_item_right" v-html="advantageData.acf.service_advantage_content4">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- index_advantage end -->

        <div id="index_honor" v-if="isHonorDataLoaded">
            <div class="container">
                <div class="index_honor">
                    <div class="mod_index_title">
                        <div class="mod_index_title_main">荣誉资质</div>
                        <div class="mod_index_title_sub">honor &amp; qualifications</div>
                    </div>
                    <div class="index_honor_content">
                        <swiper :options="honorSwiperOption" ref="honorSwiper">
                            <!-- slides -->
                            <swiper-slide v-for="(honorItem, index) in honorData.posts" :key="index">
                                <div class="swiper-slide-item">
                                    <div class="swiper-slide-item-img">
                                        <router-link :to="{ name: 'PostDetail', params: {catelv1id: 28, cateid: 28, postid: honorItem.id} }" :title="honorItem.title">
                                            <img :src="honorItem.thumbnail_images.full.url" :alt="honorItem.title" class="img-responsive">
                                        </router-link>
                                    </div>
                                    <div class="swiper-slide-item-title">
                                        <router-link :to="{ name: 'PostDetail', params: {catelv1id: 28, cateid: 28, postid: honorItem.id} }" :title="honorItem.title">{{honorItem.title}}
                                        </router-link>
                                    </div>
                                </div>
                            </swiper-slide>

                            <!-- Optional controls -->
                            <!-- <div class="swiper-pagination"  slot="pagination"></div> -->
                            <div class="swiper-button-prev" slot="button-prev">
                                <i class="fa fa-angle-left"></i>
                            </div>
                            <div class="swiper-button-next" slot="button-next">
                                <i class="fa fa-angle-right"></i>
                            </div>
                            <!-- <div class="swiper-scrollbar"   slot="scrollbar"></div> -->
                        </swiper>

                    </div>
                </div>
            </div>
        </div>
        <!-- index_honor end -->

        <div id="index_info" class="index_block">
            <div class="container">
                <div class="index_info">
                    <div class="mod_index_title">
                        <div class="mod_index_title_main">法律知识</div>
                        <div class="mod_index_title_sub">LAW knowledge</div>
                    </div>
                    <div class="index_info_content link_hover">
                        <div class="row">
                            <div class="col-md-4 col-sm-6" v-for="infoItem in infoCatesLv1">
                                <div class="index_info_item">
                                    <div class="mod_info_panel">
                                        <div class="mod_info_panel_head">
                                            <router-link :to="{ name: 'PostCate', params: {catelv1id: 4, cateid: infoItem.id} }">{{infoItem.name}}</router-link>
                                        </div>
                                        <div class="mod_info_panel_body">
                                            <IndexInfoList :infoCateId="infoItem.id"></IndexInfoList>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="mod_index_more">
                        <router-link :to="{ name: 'PostCate', params: {catelv1id: 4, cateid: 4} }" class="btn_hover">更多资讯 →</router-link>
                    </div>
                </div>
            </div>
        </div>
        <!-- index_info end -->




    </div>
</template>

<script>
    import IndexInfoList from './../components/index_info_list.vue';
    import IndexServiceList from './../components/index_service_list.vue';

    export default {
        components: {
            IndexInfoList,
            IndexServiceList,
        },
        props: {
            reduxData: {
                type: Object,
                required: true,
            },
            optionUpdated: {
                type: Boolean
            },
            contentUpdated: {
                type: Boolean
            }
        },
        data () {
            return {
                bannerSwiperOption: {
                    // observer: true,
                    // observeParents: true,
                    // notNextTick: true,

                    // 默认不初始化
                    // init: false,

                    // slides play options
                    autoplay: {
                        delay: 3000,
                        disableOnInteraction: false
                    },
                    loop: true,
                    speed: 800,

                    // pagination
                    pagination: {
                        el: '#index_banner .swiper-pagination',
                        clickable: true
                    },

                    // navigation arrows
                    navigation: {
                        nextEl: '#index_banner .swiper-button-next',
                        prevEl: '#index_banner .swiper-button-prev'
                    }
                },
                honorSwiperOption: {
                    // observer: true,
                    // observeParents: true,
                    // notNextTick: true,

                    // 默认不初始化
                    // init: false,

                    slidesPerView: 4,
                    spaceBetween: 30,

                    breakpoints: {
                        991: {
                            slidesPerView: 3,
                            // spaceBetween: 40
                        },
                        767: {
                            slidesPerView: 1,
                            // spaceBetween: 30
                        }
                    },

                    // slides play options
                    autoplay: {
                        delay: 2000,
                        disableOnInteraction: false
                    },
                    loop: true,
                    speed: 800,

                    // pagination
                    // pagination: {
                    //     el: '#index_banner .swiper-pagination',
                    //     clickable: true
                    // },

                    // navigation arrows
                    navigation: {
                        nextEl: '#index_honor .swiper-button-next',
                        prevEl: '#index_honor .swiper-button-prev'
                    }
                },
                serviceCatesLv1: [],
                isAdvantageDataLoaded: false,
                advantageData: {},
                isHonorDataLoaded: false,
                honorData: {},
                infoCatesLv1: []
            };
        },
        computed: {
            indexBannerSlides () {
                var indexBannerSlidesOrigin = this.reduxData['index-banner-imgs'];
                for (var i = 0; i < indexBannerSlidesOrigin.length; i++) {
                    switch (indexBannerSlidesOrigin[i].url) {
                        case '/about/':
                            indexBannerSlidesOrigin[i].url = '#/page/22';
                            break;
                        case '/advantage/':
                            indexBannerSlidesOrigin[i].url = '#/page/27';
                            break;
                        default:

                    }

                    // if (indexBannerSlidesOrigin[i].url === '/about/') {
                    //     indexBannerSlidesOrigin[i].url = '#/page/22';
                    // } else if (indexBannerSlidesOrigin[i].url === '/advantage/') {
                    //     indexBannerSlidesOrigin[i].url = '#/page/27';
                    // } else {
                    //
                    // }

                }
                return indexBannerSlidesOrigin;
            },
            indexBannerSwiper () {
                return this.$refs.indexBannerSwiper.swiper;
            }
        },
        methods: {
            getServiceCatesLv1Data () {
                let getServiceCatesLv1 = () => {
                    this.$axios.get('/wp-json/wp/v2/categories/?fields=id,name,acf&orderby=id&parent=1').then( (response) => {
                        this.serviceCatesLv1 = response.data;

                        localStorage.serviceCatesLv1 = JSON.stringify(this.serviceCatesLv1);
                    });
                }

                if (this.optionUpdated) {
                    getServiceCatesLv1();
                } else {
                    if (localStorage.serviceCatesLv1 === undefined) {
                        getServiceCatesLv1();
                    } else {
                        this.serviceCatesLv1 = JSON.parse(localStorage.serviceCatesLv1);
                    }
                }

            },
            getInfoCatesLv1Data () {
                let getInfoCatesLv1 = () => {
                    this.$axios.get('/wp-json/wp/v2/categories/?fields=id,name&orderby=id&parent=4').then( (response) => {
                        this.infoCatesLv1 = response.data;

                        localStorage.infoCatesLv1 = JSON.stringify(this.infoCatesLv1);
                    });
                }

                if (this.optionUpdated) {
                    getInfoCatesLv1();
                } else {
                    if (localStorage.infoCatesLv1 === undefined) {
                        getInfoCatesLv1();
                    } else {
                        this.infoCatesLv1 = JSON.parse(localStorage.infoCatesLv1);
                    }
                }

            },
            getAdvantageData () {

                // this.$axios.get('/wp-json/acf/v3/pages/27').then( (response) => {
                //     this.advantageData = response.data;
                //     this.isAdvantageDataLoaded = true;
                // });

                this.$getDataFromServerOrCache('/wp-json/wp/v2/pages/27?fields=id,title,acf','advantageData','pageData27',this.contentUpdated,'isAdvantageDataLoaded',false,null,null);

            }
        },
        created () {

            document.title = '深圳知识产权律师_商标专利律师'+this.$baseTitle;

            this.getServiceCatesLv1Data();

            this.getAdvantageData();

            this.$axios.get('/json-api/get_category_posts/?include=id,title,thumbnail&count=8&id=28').then( (response) => {
                this.honorData = response.data;
                this.isHonorDataLoaded = true;
            });

            this.getInfoCatesLv1Data();

        },
        mounted () {
            this.$nextTick(function () {

            });
        },
        updated () {
            this.$nextTick(function () {

            });
        },
        watch: {

        }
    }
</script>

<style lang="less">

</style>
