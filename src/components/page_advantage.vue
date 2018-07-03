<template lang="html">
    <div class="content_page" v-if="isPageDataLoaded">
        <h1 class="content_page_title">{{pageData.title.rendered}}</h1>
        <div class="content_page_detail">

            <!-- 复制首页“服务优势”模块 -->
            <div class="index_advantage_content">
                <div class="row">
                    <div class="col-md-12">
                        <div class="index_advantage_item clearfix">
                            <div class="index_advantage_item_left">
                                <div class="index_advantage_item_num">1</div>
                                <div class="index_advantage_item_title">{{pageData.acf.service_advantage_name1}}</div>
                            </div>
                            <div class="index_advantage_item_right" v-html="pageData.acf.service_advantage_content1">
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="index_advantage_item clearfix">
                            <div class="index_advantage_item_left">
                                <div class="index_advantage_item_num">2</div>
                                <div class="index_advantage_item_title">{{pageData.acf.service_advantage_name2}}</div>
                            </div>
                            <div class="index_advantage_item_right" v-html="pageData.acf.service_advantage_content2">
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="index_advantage_item clearfix">
                            <div class="index_advantage_item_left">
                                <div class="index_advantage_item_num">3</div>
                                <div class="index_advantage_item_title">{{pageData.acf.service_advantage_name3}}</div>
                            </div>
                            <div class="index_advantage_item_right" v-html="pageData.acf.service_advantage_content3">
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="index_advantage_item clearfix">
                            <div class="index_advantage_item_left">
                                <div class="index_advantage_item_num">4</div>
                                <div class="index_advantage_item_title">{{pageData.acf.service_advantage_name4}}</div>
                            </div>
                            <div class="index_advantage_item_right" v-html="pageData.acf.service_advantage_content4">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 首页“服务优势”模块结束 -->

        </div>
    </div>
</template>

<script>
    export default {
        props: {
            contentUpdated: {
                type: Boolean
            }
        },
        data () {
            return {
                isPageDataLoaded: false,
                pageData: {}
            };
        },
        computed: {
            routeId () {
                return this.$route.params.id;
            }
        },
        created () {

            // this.$axios.get('/wp-json/wp/v2/pages/'+this.routeId+'?fields=id,title,acf').then( (response) => {
            //     this.pageData = response.data;
            //     this.isPageDataLoaded = true;
            //
            //     this.$emit('pageDataLoaded',this.pageData.title.rendered);
            // });

            let afterGetFunc = () => {
                this.$emit('pageDataLoaded',this.pageData.title.rendered);
            }
            this.$getDataFromServerOrCache('/wp-json/wp/v2/pages/'+this.routeId+'?fields=id,title,acf','pageData','pageData'+this.routeId,this.contentUpdated,'isPageDataLoaded',false,null,afterGetFunc);

        }
    }
</script>

<style lang="css">
</style>
