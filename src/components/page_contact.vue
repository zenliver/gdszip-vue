<template lang="html">
    <div class="content_page">
        <h1 class="content_page_title">{{pageTitle}}</h1>
        <div class="content_page_detail content_page_detail_contact" v-html="contactData">
        </div>
        <!-- 百度地图 -->
        <baidu-map id="contact_map_baidumap" :center="{lng: 114.078532, lat: 22.547488}" :zoom="20" :scroll-wheel-zoom="true">
            <bm-marker :position="{lng: 114.078532, lat: 22.547488}" animation="BMAP_ANIMATION_BOUNCE">
                <!-- <bm-label content="广东广和律师事务所"></bm-label> -->
            </bm-marker>
            <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
        </baidu-map>
    </div>
</template>

<script>
    export default {
        props: {
            contactData: {
                type: String
            }
        },
        data () {
            return {
                pageTitle: '联系律师'
            };
        },
        created () {
            this.$emit('componentCreated',this.pageTitle);
        }
    }
</script>

<style lang="css">
</style>
