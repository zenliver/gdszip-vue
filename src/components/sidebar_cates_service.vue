<template lang="html">
    <div class="sidebar_cates">
        <div class="mod_info_panel">
            <div class="mod_info_panel_head">服务项目</div>
            <div class="mod_info_panel_body">
                <div class="sidebar_cates_lv1_list">
                    <div class="sidebar_cates_lv1_item" v-for="cateLv1Item in cateLv1List">
                        <div class="sidebar_cates_lv1_title">
                            <router-link :to="{ name: 'PostCate', params: {catelv1id: routeCateLv1Id, cateid: cateLv1Item.id} }">{{cateLv1Item.name}}</router-link>
                        </div>
                        <SidebarCatesServiceLv2 :parentCateId="cateLv1Item.id" :optionUpdated="optionUpdated"></SidebarCatesServiceLv2>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import SidebarCatesServiceLv2 from './sidebar_cates_service_lv2.vue';

    export default {
        components: {
            SidebarCatesServiceLv2
        },
        props: {
            optionUpdated: {
                type: Boolean
            }
        },
        data () {
            return {
                cateLv1List: []
            };
        },
        computed: {
            routeCateLv1Id () {
                return this.$route.params.catelv1id;
            }
        },
        created () {
            this.$getDataFromServerOrCache('/wp-json/wp/v2/categories/?fields=id,name,acf&orderby=id&parent='+this.routeCateLv1Id,'cateLv1List','serviceCatesLv1',this.optionUpdated,null,false,null,null);
        }
    }
</script>

<style lang="css">
</style>
