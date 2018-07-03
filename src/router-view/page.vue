<template lang="html">
    <div id="router-view">

        <div id="page_breadcrumb">
            <div class="container">
                <div class="page_breadcrumb">
                    <span class="breadcrumb_home">
                        <a href="#/">网站首页</a>
                    </span>
                    <span class="breadcrumb_nav active">{{pageTitle}}</span>
                </div>
            </div>
        </div>
        <!-- page_breadcrumb end -->

        <div id="main">
            <div class="container">
                <div class="main">
                    <div class="row">
                        <div class="col-md-3">
                            <Sidebar :sidebarContact="reduxData['site-contacts-footer']"></Sidebar>
                        </div>
                        <div class="col-md-9">
                            <div class="content">
                                <PageAbout :contentUpdated="contentUpdated" v-if="isPageAbout" @pageDataLoaded="setPageTitle"></PageAbout>
                                <PageAdvantage :contentUpdated="contentUpdated" v-if="routeId == 27? true : false" @pageDataLoaded="setPageTitle"></PageAdvantage>
                                <PageContact :contactData="reduxData['site-contacts-footer']" v-if="routeId == 29? true : false" @componentCreated="setPageTitle"></PageContact>
                                <PageAsk :contentUpdated="contentUpdated" v-if="routeId == 180? true : false" @pageDataLoaded="setPageTitle"></PageAsk>
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
    import PageAbout from './../components/page_about.vue';
    import PageAdvantage from './../components/page_advantage.vue';
    import PageContact from './../components/page_contact.vue';
    import PageAsk from './../components/page_ask.vue';

    export default {
        props: {
            reduxData: {
                type: Object
            },
            contentUpdated: {
                type: Boolean
            }
        },
        components: {
            Sidebar,
            PageAbout,
            PageAdvantage,
            PageContact,
            PageAsk
        },
        data () {
            return {
                pageTitle: '--'
            };
        },
        computed: {
            routeId () {
                return this.$route.params.id;
            },
            isPageAbout () {
                if (this.routeId == 22 || this.routeId == 24) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        methods: {
            setPageTitle (title) {
                this.pageTitle = title;

                document.title = this.pageTitle+this.$baseTitle;
            }
        },
        watch: {
            $route () {
                this.pageTitle = '--';
            }
        }
    }
</script>

<style lang="css">
</style>
