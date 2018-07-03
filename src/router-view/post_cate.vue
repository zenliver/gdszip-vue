<template lang="html">
    <div id="router-view">

        <div id="page_breadcrumb">
            <div class="container">
                <div class="page_breadcrumb">
                    <span class="breadcrumb_home">
                        <a href="#/">网站首页</a>
                    </span>
                    <span class="breadcrumb_nav" v-if="isSubCate">
                        <router-link :to="{ name: 'PostCate', params: {catelv1id: routeCateLv1Id, cateid: routeCateLv1Id} }">{{breadcrumbCateLv1Name}}</router-link>
                    </span>
                    <span class="breadcrumb_nav active">{{breadcrumbCateName}}</span>
                </div>
            </div>
        </div>
        <!-- page_breadcrumb end -->

        <div id="main">
            <div class="container">
                <div class="main">
                    <div class="row">
                        <div class="col-md-3 col-sm-4">
                            <Sidebar :sidebarContact="reduxData['site-contacts-footer']" :optionUpdated="optionUpdated"></Sidebar>
                        </div>
                        <div class="col-md-9 col-sm-8">
                            <div class="content">
                                <div class="content_list">
                                    <PostCateListTxt v-if="isCateListTxt"></PostCateListTxt>
                                    <PostCateListImgTxt v-if="isCateListImgTxt"></PostCateListImgTxt>
                                    <PostCateListImg v-if="routeCateLv1Id == 28? true : false"></PostCateListImg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import Sidebar from './../components/sidebar.vue';
    import PostCateListTxt from './../components/post_cate_list_txt.vue';
    import PostCateListImgTxt from './../components/post_cate_list_imgtxt.vue';
    import PostCateListImg from './../components/post_cate_list_img.vue';

    export default {
        components: {
            Sidebar,
            PostCateListTxt,
            PostCateListImgTxt,
            PostCateListImg
        },
        props: {
            reduxData: {
                type: Object
            },
            optionUpdated: {
                type: Boolean
            }
        },
        data () {
            return {
                isBreadcrumbCateDataLoaded: false,
                breadcrumbCateData: {},
                isBreadcrumbCateLv1DataLoaded: false,
                breadcrumbCateLv1Data: {}
            };
        },
        computed: {
            routeCateLv1Id () {
                return this.$route.params.catelv1id-0;
            },
            routeCateId () {
                return this.$route.params.cateid-0;
            },
            routePagiId () {
                return this.$route.params.pagiid;
            },
            isSubCate () {
                if (this.routeCateLv1Id == this.routeCateId) {
                    return false;
                } else {
                    return true;
                }
            },
            isCateListTxt () {
                if ((this.routeCateLv1Id == 4) || (this.routeCateLv1Id == 3)) {
                    return true;
                } else {
                    return false;
                }
            },
            isCateListImgTxt () {
                if (this.routeCateLv1Id == 1) {
                    return true;
                } else {
                    return false;
                }
            },
            breadcrumbCateName () {
                if (this.isBreadcrumbCateDataLoaded === true) {
                    return this.breadcrumbCateData.name;
                } else {
                    return '--';
                }
            },
            breadcrumbCateLv1Name () {
                if (this.isBreadcrumbCateLv1DataLoaded === true) {
                    return this.breadcrumbCateLv1Data.name;
                } else {
                    return '--';
                }
            }
        },
        methods: {
            getBreadcrumbCateLv1Data () {

                // this.$axios.get('/wp-json/wp/v2/categories/'+this.routeCateLv1Id+'/?fields=id,name').then( (response) => {
                //     this.breadcrumbCateLv1Data = response.data;
                //     this.isBreadcrumbCateLv1DataLoaded = true;
                // });

                this.$getDataFromServerOrCache('/wp-json/wp/v2/categories/'+this.routeCateLv1Id+'/?fields=id,name','breadcrumbCateLv1Data','categoryData'+this.routeCateLv1Id,this.optionUpdated,'isBreadcrumbCateLv1DataLoaded',false,null,null);

            },
            getBreadcrumbCateData () {

                // this.isBreadcrumbCateDataLoaded = false;
                // this.$axios.get('/wp-json/wp/v2/categories/'+this.routeCateId+'/?fields=id,name').then( (response) => {
                //     this.breadcrumbCateData = response.data;
                //     this.isBreadcrumbCateDataLoaded = true;
                //
                //     document.title = this.breadcrumbCateData.name+this.$baseTitle;
                // });

                // let beforeGetFunc = () => {
                //     this.isBreadcrumbCateDataLoaded = false;
                // }
                let afterGetFunc = () => {
                    document.title = this.breadcrumbCateData.name+this.$baseTitle;
                }
                this.$getDataFromServerOrCache('/wp-json/wp/v2/categories/'+this.routeCateId+'/?fields=id,name','breadcrumbCateData','categoryData'+this.routeCateId,this.optionUpdated,'isBreadcrumbCateDataLoaded',true,null,afterGetFunc);

            },
        },
        created () {
            this.getBreadcrumbCateLv1Data();
            this.getBreadcrumbCateData();
        },
        watch: {
            routeCateLv1Id () {
                this.getBreadcrumbCateLv1Data();
            },
            routeCateId () {
                this.getBreadcrumbCateData();
            },
            routePagiId () {
                this.getBreadcrumbCateData();
            }
        }
    }
</script>

<style lang="css">
</style>
