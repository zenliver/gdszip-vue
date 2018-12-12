<template lang="html">
    <div class="content_detail_related link_hover">
        <div class="mod_info_panel">
            <div class="mod_info_panel_head">{{relatedPostsName}}</div>
            <div class="mod_info_panel_body">
                <div class="article_detail_related">
                    <ul class="article_detail_related_list mod_info_panel_list info_list has_symbol clearfix">
                        <li v-if="!relatedPostsLoaded">加载中...</li>
                        <li v-if="noRelatedPosts">暂无</li>
                        <li v-for="relatedPost in relatedPosts">
                            <router-link :to="{ name: 'PostDetail', params: {catelv1id: routeCateLv1Id, postid: relatedPost.id} }">{{relatedPost.title.rendered}}</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            cateId: {
                type: Number,
                required: true
            }
        },
        data () {
            return {
                relatedPosts: [],
                relatedPostsLoaded: false,
                noRelatedPosts: false
            };
        },
        computed: {
            routeCateLv1Id () {
                return this.$route.params.catelv1id;
            },
            routePostId () {
                return this.$route.params.postid;
            },
            relatedPostsName () {
                if (this.routeCateLv1Id == 4) {
                    return '相关知识';
                } else if (this.routeCateLv1Id == 3) {
                    return '相关动态';
                } else if (this.routeCateLv1Id == 28) {
                    return '相关荣誉';
                } else {
                    return '相关服务';
                }
            },
        },
        methods: {
            getRelatedPostsData () {

                let afterGetFunc = () => {
                    if (this.relatedPosts.length === 0) {
                        this.noRelatedPosts = true;
                    }
                }

                let dataProcessor = (originalData) => {
                    // 从相关文章信息数组中删除当前文章对象
                    let objectToFind = (obj) => {
                        // console.log(this);
                        if (obj.id == this.routePostId) {
                            return obj;
                        }
                    };
                    let objectIndex = originalData.findIndex(objectToFind);
                    originalData.splice(objectIndex,1);
                }

                this.$getData('/wp-json/wp/v2/posts/?fields=id,title&per_page=10&categories='+this.cateId,'relatedPosts','relatedPostsLoaded',false,null,afterGetFunc,null,dataProcessor);

            }
        },
        created () {
            this.getRelatedPostsData();
        },
        watch: {
            $route () {
                this.getRelatedPostsData();
            }
        }
    }
</script>

<style lang="css">
</style>
