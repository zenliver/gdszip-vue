<template lang="html">
    <div id="router-view">

        <div id="page_breadcrumb">
            <div class="container">
                <div class="page_breadcrumb">
                    <span class="breadcrumb_home">
                        <a href="#/">首页</a>
                    </span>
                    <span class="breadcrumb_nav" v-if="hasSubCate">
                        <router-link :to="{ name: 'PostCate', params: {catelv1id: routeCateLv1Id, cateid: routeCateLv1Id} }">{{breadcrumbCateLv1Name}}</router-link>
                    </span>
                    <span class="breadcrumb_nav">
                        <router-link :to="{ name: 'PostCate', params: {catelv1id: routeCateLv1Id, cateid: routeCateId} }">{{breadcrumbCateName}}</router-link>
                    </span>
                    <span class="breadcrumb_nav active">{{breadcrumbTitle}}</span>
                </div>
            </div>
        </div>
        <!-- page_breadcrumb end -->

        <div id="main">
            <div class="container">
                <div class="main main_detail">
                    <div class="row">
                        <div class="col-md-3 col-sm-4">
                            <Sidebar :sidebarContact="reduxData['site-contacts-footer']"></Sidebar>
                        </div>
                        <div class="col-md-9 col-sm-8">
                            <div class="content">
                                <div class="content_detail" v-loading="!postDataLoaded" element-loading-text="加载中...">
                                    <div class="article_detail" v-if="postDataLoaded">
                                        <div class="article_detail_head" v-if="isCateLikeInfo">
                                            <h1 class="article_detail_title">{{postData.title.rendered}}</h1>
                                            <div class="article_detail_info">
                                                <span>来源：{{postData.acf.article_source}}</span>
                                                <span>作者：{{postData.acf.article_author}}</span>
                                                <span>时间：{{postData.date.replace(/T.*$/,'')}}</span>
                                            </div>
                                        </div>
                                        <h1 class="article_detail_title" v-else>{{postData.title.rendered}}</h1>
                                        <div class="article_detail_content" v-html="postData.content.rendered">
                                        </div>
                                        <div class="article_detail_copyright_info" v-html="copyrightInfo" v-if="isCopyrightInfoRender">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <PostDetailRelated :cateId="postData.categories[0]" v-if="postDataLoaded"></PostDetailRelated>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import Sidebar from './../components/sidebar.vue';
    import PostDetailRelated from './../components/post_detail_related.vue';

    export default {
        components: {
            Sidebar,
            PostDetailRelated
        },
        props: {
            reduxData: {
                type: Object,
                required: true
            },
            optionUpdated: {
                type: Boolean
            }
        },
        data () {
            return {
                postDataLoaded: false,
                postData: {},
                isBreadcrumbCateLv1DataLoaded: false,
                breadcrumbCateLv1Data: {},
                isBreadcrumbCateDataLoaded: false,
                breadcrumbCateData: {},
            };
        },
        computed: {
            routeCateLv1Id () {
                return this.$route.params.catelv1id;
            },
            routeCateId () {
                return this.$route.params.cateid;
            },
            hasSubCate () {
                if (this.routeCateLv1Id == this.routeCateId) {
                    return false;
                } else {
                    return true;
                }
            },
            routePostId () {
                return this.$route.params.postid;
            },
            isCateLikeInfo () {
                if (this.routeCateLv1Id == 4 || this.routeCateLv1Id == 3) {
                    return true;
                } else {
                    return false;
                }
            },
            isCopyrightInfoRender () {
                if (this.routeCateLv1Id == 4 || this.routeCateLv1Id == 3) {
                    return true;
                } else {
                    return false;
                }
            },
            copyrightInfo () {
                if (this.postData.acf.article_type === true) {
                    return this.reduxData.site_post_copyright_info_yc;
                } else {
                    return this.reduxData.site_post_copyright_info_zz;
                }
            },
            breadcrumbTitle () {
                if (this.postDataLoaded === true) {
                    return this.postData.title.rendered;
                } else {
                    return '--';
                }
            },
            breadcrumbCateLv1Name () {
                if (this.isBreadcrumbCateLv1DataLoaded) {
                    return this.breadcrumbCateLv1Data.name;
                } else {
                    return '--';
                }
            },
            breadcrumbCateName () {
                if (this.isBreadcrumbCateDataLoaded) {
                    return this.breadcrumbCateData.name;
                } else {
                    return '--';
                }
            }
        },
        methods: {
            getPostData () {

                let afterGetFunc = () => {
                    document.title = this.postData.title.rendered+this.$baseTitle;
                }

                this.$getData('/wp-json/wp/v2/posts/'+this.routePostId+'?fields=id,date,title,content,categories,acf','postData','postDataLoaded',true,null,afterGetFunc,null,'no-dataProcessor');

            },
            getBreadcrumbCateLv1Data () {

                this.$getDataFromServerOrCache('/wp-json/wp/v2/categories/'+this.routeCateLv1Id+'/?fields=id,name','breadcrumbCateLv1Data','categoryData'+this.routeCateLv1Id,this.optionUpdated,'isBreadcrumbCateLv1DataLoaded',false,null,null);

            },
            getBreadcrumbCateData () {

                this.$getDataFromServerOrCache('/wp-json/wp/v2/categories/'+this.routeCateId+'/?fields=id,name','breadcrumbCateData','categoryData'+this.routeCateId,this.optionUpdated,'isBreadcrumbCateDataLoaded',false,null,null);

            }
        },
        created () {
            this.getPostData();
            if (this.hasSubCate === true) {
                this.getBreadcrumbCateLv1Data();
                this.getBreadcrumbCateData();
            } else {
                this.getBreadcrumbCateData();
            }
        },
        watch: {
            $route () {
                this.getPostData();
            },
            routeCateLv1Id () {
                this.getBreadcrumbCateLv1Data();
            },
            routeCateId () {
                this.getBreadcrumbCateData();
            }
        }
    }
</script>

<style lang="css">
</style>
