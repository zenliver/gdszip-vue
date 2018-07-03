<template lang="html">
    <ul class="mod_info_panel_list info_list has_symbol">
        <li v-if="showLoading">加载中...</li>
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
                showLoading: true,
                infoListData: []
            };
        },
        created () {
            this.$axios.get('/wp-json/wp/v2/posts/?fields=id,title&per_page=5&categories='+this.infoCateId).then( (response) => {
                this.infoListData = response.data;
                this.showLoading = false;
            });
        }

    }
</script>

<style lang="css">
</style>
