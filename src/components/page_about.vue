<template lang="html">
    <div class="content_page">
        <ul class="content_page_nav clearfix">
            <li :class="isPageAboutActive">
                <router-link :to="{ name: 'Page', params: {id: 22} }" class="btn_hover">吴彬律师介绍</router-link>
            </li>
            <li :class="isPageAboutLawfirmActive">
                <router-link :to="{ name: 'Page', params: {id: 24} }" class="btn_hover">广和律所介绍</router-link>
            </li>
        </ul>
        <!-- <ul class="content_page_nav clearfix" v-if="isPageAboutExact">
            <li class="active">
                <router-link :to="{ name: 'Page', params: {id: pageData.id} }" class="btn_hover">{{pageData.title.rendered}}</router-link>
            </li>
            <li>
                <router-link :to="{ name: 'Page', params: {id: 24} }" class="btn_hover">广和律所介绍</router-link>
            </li>
        </ul>
        <ul class="content_page_nav clearfix" v-else>
            <li>
                <router-link :to="{ name: 'Page', params: {id: 22} }" class="btn_hover">吴彬律师介绍</router-link>
            </li>
            <li class="active">
                <router-link :to="{ name: 'Page', params: {id: pageData.id} }" class="btn_hover">{{pageData.title.rendered}}</router-link>
            </li>
        </ul> -->
        <div class="content_page_detail" v-html="pageData.content.rendered" v-if="isPageDataLoaded">
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
            },
            isPageAboutExact () {
                if (this.routeId == 22) {
                    return true;
                } else {
                    return false;
                }
            },
            isPageAboutActive () {
                if (this.routeId == 22) {
                    return 'active';
                } else {
                    return '';
                }
            },
            isPageAboutLawfirmActive () {
                if (this.routeId == 24) {
                    return 'active';
                } else {
                    return '';
                }
            }
        },
        methods: {
            getData () {

                // this.isPageDataLoaded = false;
                // this.$axios.get('/wp-json/wp/v2/pages/'+this.routeId+'?fields=id,title,content').then( (response) => {
                //     this.pageData = response.data;
                //     this.isPageDataLoaded = true;
                //
                //     this.$emit('pageDataLoaded',this.pageData.title.rendered);
                // });

                let afterGetFunc = () => {
                    this.$emit('pageDataLoaded',this.pageData.title.rendered);
                }
                this.$getDataFromServerOrCache('/wp-json/wp/v2/pages/'+this.routeId+'?fields=id,title,content','pageData','pageData'+this.routeId,this.contentUpdated,'isPageDataLoaded',false,null,afterGetFunc);

            }
        },
        created () {
            this.getData();
        },
        watch: {
            $route () {
                this.getData();
            }
        }
    }
</script>

<style lang="css">
</style>
