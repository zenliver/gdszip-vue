<template lang="html">
    <div class="sidebar_cates">
        <div class="mod_info_panel">
            <div class="mod_info_panel_head">法律知识</div>
            <div class="mod_info_panel_body">
                <ul class="sidebar_cates_lv2_list clearfix">
                    <li v-for="cateLv1Item in infoCatesLv2">
                        <router-link :to="{ name: 'PostCate', params: {catelv1id: routeCateLv1Id, cateid: cateLv1Item.id} }">{{cateLv1Item.name}}</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            optionUpdated: {
                type: Boolean
            }
        },
        data () {
            return {
                infoCatesLv2: []
            };
        },
        computed: {
            routeCateLv1Id () {
                return this.$route.params.catelv1id;
            }
        },
        methods: {
            getInfoCatesLv2Data () {

                this.$getDataFromServerOrCache('/wp-json/wp/v2/categories/?fields=id,name&orderby=id&parent='+this.routeCateLv1Id,'infoCatesLv2','infoCatesLv2',this.optionUpdated,null,false,null,null);

            },

        },
        created () {
            this.getInfoCatesLv2Data();
        }
    }
</script>

<style lang="css">
</style>
