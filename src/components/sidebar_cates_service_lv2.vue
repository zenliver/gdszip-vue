<template lang="html">
    <ul class="sidebar_cates_lv2_list clearfix">
        <li v-for="cateLv2Item in cateLv2List">
            <router-link :to="{ name: 'PostCate', params: {catelv1id: routeCateLv1Id, cateid: cateLv2Item.id} }">{{cateLv2Item.name}}</router-link>
        </li>
    </ul>
</template>

<script>
    export default {
        props: {
            parentCateId: {
                type: Number,
            },
            optionUpdated: {
                type: Boolean
            }
        },
        data () {
            return {
                cateLv2List: []
            };
        },
        computed: {
            routeCateLv1Id () {
                return this.$route.params.catelv1id;
            }
        },
        created () {

            this.$getDataFromServerOrCache('/wp-json/wp/v2/categories/?fields=id,name&orderby=id&parent='+this.parentCateId,'cateLv2List','categorySubs'+this.parentCateId,this.optionUpdated,null,false,null,null);

        }
    }
</script>

<style lang="css">
</style>
