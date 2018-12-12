<template lang="html">
    <div class="ask_item_anwsers" v-if="isAnwsered">
        <div class="ask_item_a" v-for="anwserItem in anwserData">
            <div class="ask_item_a_content">
                <div class="ask_item_a_content_admin">
                    <span class="ask_item_a_admin">吴彬律师：</span>
                </div>
                <div class="ask_item_a_content_reply" v-html="anwserItem.content.rendered">
                </div>
            </div>
            <div class="ask_item_a_time">
                <span>回复时间：</span>{{anwserItem.date.replace(/T/,' ')}}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            parentCommentId: {
                type: Number
            }
        },
        data () {
            return {
                anwserData: [],
                isAnwsered: false
            };
        },
        methods: {
            getAnwserData () {

                this.isAnwsered = false;

                let afterGetFunc = () => {
                    if (this.anwserData.length > 0) {
                        this.isAnwsered = true;
                    }
                }

                this.$getData('/wp-json/wp/v2/comments/?fields=id,date,content&parent='+this.parentCommentId,'anwserData',null,false,null,afterGetFunc,null,'no-dataProcessor');

            }
        },
        created () {
            this.getAnwserData();
        },
        watch: {
            parentCommentId () {
                this.getAnwserData();
            }
        }
    }
</script>

<style lang="css">
</style>
