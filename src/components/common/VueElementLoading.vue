<template lang="html">
    <div class="element_loading" v-loading="true" :element-loading-text="text" :element-loading-background="bg" :style="{height: height}"></div>
</template>

<script>
    export default {
        props: {
            text: {
                type: String,
                default: '加载中...'
            },
            bg: {
                type: String,
                default: 'rgba(255,255,255,0.9)'
            },
            height: {
                type: String,
                default: '200px'
            }
        }
    }
</script>

<style lang="less">
    // 通用elementUI loading效果
    .element_loading {
        
    }
</style>
