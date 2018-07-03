<template lang="html">
    <div class="article_list link_hover">
        <div class="article_item" v-for="item in list">
            <div class="article_item_title">
                <a href="" class="skeleton"></a>
            </div>
            <div class="article_item_desc skeleton"></div>
            <div class="article_item_time skeleton"></div>
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
    .article_item_title a.skeleton {
        display: block;
        width: 50%;
        height: 20px;
    }
    .article_item_time.skeleton {
        width: 20%;
        height: 20px;
        padding-top: 0;
        margin-top: 10px;
    }
</style>
