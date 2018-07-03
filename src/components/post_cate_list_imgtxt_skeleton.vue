<template lang="html">
    <div class="article_list link_hover">
        <div class="article_item" v-for="item in list">
            <div class="row">
                <div class="col-md-4 col-sm-4">
                    <div class="article_item_img">
                        <a>
                            <div class="img-responsive skeleton"></div>
                        </a>
                    </div>
                </div>
                <div class="col-md-8 col-sm-8">
                    <div class="article_item_txt">
                        <div class="article_item_title">
                            <a class="skeleton"></a>
                        </div>
                        <div class="article_item_desc skeleton"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        computed: {
            list () {
                let arr = [];
                for (var i = 0; i < 5; i++) {
                    arr[i] = i;
                }
                return arr;
            }
        }
    }
</script>

<style lang="less">
    .article_item_img {
        a {
            .skeleton {
                // max-width: 270px;
                height: 168px;
                @media (min-width: 992px) and (max-width: 1199px) {
                    height: 135px;
                }
                @media (min-width: 768px) and (max-width: 991px) {
                    height: 99px;
                }
            }
        }
    }
    .article_item_title {
        a.skeleton {
            display: block;
            width: 50%;
            height: 20px;
        }
    }
    .article_item_desc.skeleton {
        height: 44px;
    }
</style>
