<template lang="html">
    <div class="element_loading_sm" v-loading="true" :element-loading-background="bg"></div>
</template>

<script>
    export default {
        props: {
            bg: {
                type: String,
                default: 'rgba(255,255,255,0.9)'
            },
        }
    }
</script>

<style lang="less">
    .element_loading_sm {
        display: inline-block;
        margin-left: 5px;
        .el-loading-spinner {
            margin-top: -18px;
            .circular {
                width: 18px;
                height: 18px;
            }
        }
    }
</style>
