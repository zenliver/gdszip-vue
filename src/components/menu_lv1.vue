<template lang="html">
    <ul @click="emitClickEvent">
        <li>
            <router-link :to="{ name: 'Index', params: {} }">网站首页</router-link>
        </li>
        <li>
            <router-link :to="{ name: 'Page', params: {id: 22} }">律师介绍</router-link>
        </li>
        <li>
            <router-link :to="{ name: 'PostCate', params: {catelv1id: 1, cateid: 1} }">服务项目</router-link>
        </li>
        <li>
            <router-link :to="{ name: 'Page', params: {id: 27} }">服务优势</router-link>
        </li>
        <li>
            <router-link :to="{ name: 'PostCate', params: {catelv1id: 3, cateid: 3} }">律师动态</router-link>
        </li>
        <li>
            <router-link :to="{ name: 'PostCate', params: {catelv1id: 4, cateid: 4} }">法律知识</router-link>
        </li>
        <li>
            <router-link :to="{ name: 'Page', params: {id: 180} }">在线咨询</router-link>
        </li>
        <li>
            <router-link :to="{ name: 'Page', params: {id: 29} }">联系律师</router-link>
        </li>
    </ul>
</template>

<script>
    export default {
        methods: {
            emitClickEvent () {
                this.$emit('menuClicked');
            }
        }
    }
</script>

<style lang="css">
</style>
