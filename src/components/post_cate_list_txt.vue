<template lang="html">
    <div class="content_list_txt">
        <PostCateListTxtSkeleton v-if="!postListLoaded"></PostCateListTxtSkeleton>
        <div class="article_list link_hover" v-else>
            <div class="article_item" v-for="postItem in postList.posts">
                <div class="article_item_title">
                    <router-link :to="{ name: 'PostDetail', params: {catelv1id: routeCateLv1Id, cateid: postItem.categories[0].id, postid: postItem.id} }">{{postItem.title}}</router-link>
                </div>
                <div class="article_item_desc" v-html="postItem.excerpt.replace(/\[&hellip;\]/,'&hellip;')"></div>
                <div class="article_item_time">{{postItem.date.replace(/ .*$/,'')}}</div>
            </div>
        </div>
        <div class="mod_pagination">
            <!-- <pagination :records="54" :per-page="10" :options="{chunk: 3, edgeNavigation: true, texts: {count: '第 {page} 页，共 {pages} 页', first: '首页', last: '尾页'}}" @paginate="getPagiPostsData"></pagination> -->

            <paginate :page-count="postList.pages" :initial-page="paginateInitialPageNum" :click-handler="changeRoute" :prev-text="'&lt;'" :next-text="'&gt;'" :container-class="'pagination'" v-if="postListLoaded"></paginate>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                postListLoaded: false,
                postList: {},
                apiBase: '/json-api/get_category_posts/?include=id,title,excerpt,date,categories&id='
            };
        },
        computed: {
            routeCateLv1Id () {
                return this.$route.params.catelv1id-0;
            },
            routeCateId () {
                return this.$route.params.cateid-0;
            },
            routePagiId () {
                return this.$route.params.pagiid;
            },
            routeName () {
                return this.$route.name;
            },
            paginateInitialPageNum () {
                if (this.routePagiId === undefined) {
                    return 0;
                } else {
                    return this.routePagiId-1;
                }
            },
            apiUrl () {
                if (this.routePagiId === undefined) {
                    return this.apiBase+this.routeCateId;
                } else {
                    return this.apiBase+this.routeCateId+'&page='+this.routePagiId;
                }
            }
        },
        methods: {
            getPostsData () {

                this.$getData(this.apiUrl,'postList','postListLoaded',true,null,null,null,'no-dataProcessor');

            },
            changeRoute (clickedPageNum) { // clickedPageNum是从paginate组件回传的点击的页码
                // console.log(clickedPageNum);

                this.$router.push({
                    name: 'PostCatePagi',
                    params: {
                        catelv1id: this.routeCateLv1Id,
                        cateid: this.routeCateId,
                        pagiid: clickedPageNum
                    }
                });
            }
        },
        created () {
            this.getPostsData();
        },
        watch: {
            routeCateLv1Id () {
                this.getPostsData();
            },
            routeCateId () {
                this.getPostsData();
            },
            routePagiId () {
                this.getPostsData();
            },
            routeName () {
                // console.log(this.routeName);
                if (this.routeName === 'PostCate') {
                    this.postListLoaded = false;
                }
            }
        }
    }
</script>

<style lang="css">
</style>
