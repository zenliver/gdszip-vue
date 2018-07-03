<template lang="html">
    <div class="content_list_imgtxt">
        <div class="article_list article_list_honor link_hover">
            <div class="row">
                <div class="col-md-4 col-sm-4 col-xs-6" v-for="postItem in postList.posts">
                    <div class="article_item">
                        <div class="article_item_img">
                            <router-link :to="{ name: 'PostDetail', params: {catelv1id: routeCateLv1Id, cateid: postItem.categories[0].id, postid: postItem.id} }">
                                <img :src="postItem.thumbnail_images.full.url" alt="" class="img-responsive">
                            </router-link>
                        </div>
                        <div class="article_item_title">
                            <router-link :to="{ name: 'PostDetail', params: {catelv1id: routeCateLv1Id, cateid: postItem.categories[0].id, postid: postItem.id} }">{{postItem.title}}</router-link>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div class="mod_pagination">
            <paginate :page-count="postList.pages" :click-handler="getPagiPostsData" :prev-text="'&lt;'" :next-text="'&gt;'" :container-class="'pagination'" v-if="isPostListLoaded"></paginate>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                apiBase: '/json-api/get_category_posts/?include=id,title,categories,thumbnail&count=6&id=',
                isPostListLoaded: false,
                postList: {},
                pagiNum: 1
            };
        },
        computed: {
            routeCateLv1Id () {
                return this.$route.params.catelv1id;
            },
            routeCateId () {
                return this.$route.params.cateid;
            },
            apiUrl () {
                return this.apiBase+this.routeCateId+'&page='+this.pagiNum;
            }
        },
        methods: {
            getPostsData () {
                this.$axios.get(this.apiUrl).then( (response) => {
                    this.postList = response.data;
                    this.isPostListLoaded = true;
                });
            },
            getPagiPostsData (clickedPageNum) {
                // 设置新页码
                this.pagiNum = clickedPageNum;
                // 重新获取分页数据
                this.getPostsData();
            }
        },
        created () {
            this.getPostsData();
        }
    }
</script>

<style lang="css">
</style>
