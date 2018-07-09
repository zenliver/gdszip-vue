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
        <VueElementLoading v-if="!pageDataLoaded"></VueElementLoading>
        <div class="content_page_detail" v-html="pageData.content.rendered" v-if="pageDataLoaded">
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
                pageDataLoaded: false,
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

                let afterGetFunc = () => {
                    this.$emit('pageDataLoaded',this.pageData.title.rendered);
                }
                this.$getDataFromServerOrCache('/wp-json/wp/v2/pages/'+this.routeId+'?fields=id,title,content','pageData','pageData'+this.routeId,this.contentUpdated,'pageDataLoaded',true,null,afterGetFunc);

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
