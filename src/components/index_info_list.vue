<template lang="html">
    <ul class="mod_info_panel_list info_list has_symbol">
        <li v-if="!infoListDataLoaded">加载中...</li>
        <li v-for="infoItem in infoListData">
            <router-link :to="{ name: 'PostDetail', params: {catelv1id: 4, cateid: infoCateId, postid: infoItem.id} }">{{infoItem.title.rendered}}</router-link>
        </li>
    </ul>
</template>

<script>
    export default {
        props: {
            infoCateId: {
                type: Number,
                required: true
            },
        },
        data () {
            return {
                infoListData: [],
                infoListDataLoaded: false
            };
        },
        created () {

            this.$getData('/wp-json/wp/v2/posts/?fields=id,title&per_page=5&categories='+this.infoCateId,'infoListData','infoListDataLoaded',false,null,null,null,'no-dataProcessor');

        }

    }
</script>

<style lang="css">
</style>
