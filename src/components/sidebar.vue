<template lang="html">
    <div class="sidebar sidebar_list">
        <SidebarCatesInfo :optionUpdated="optionUpdated" v-if="isCateHasOnlyLv2"></SidebarCatesInfo>
        <SidebarCatesService :optionUpdated="optionUpdated" v-if="isCateHasLv3"></SidebarCatesService>
        <div class="sidebar_contact">
            <div class="mod_info_panel">
                <div class="mod_info_panel_head">联系律师</div>
                <div class="mod_info_panel_body" v-html="sidebarContact">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import SidebarCatesInfo from './sidebar_cates_info.vue';
    import SidebarCatesService from './sidebar_cates_service.vue';

    export default {
        components: {
            SidebarCatesInfo,
            SidebarCatesService
        },
        props: {
            sidebarContact: {
                type: String,
                required: true
            },
            optionUpdated: {
                type: Boolean
            }
        },
        computed: {
            routeCateLv1Id () {
                return this.$route.params.catelv1id;
            },
            isCateHasOnlyLv2 () {
                if (this.routeCateLv1Id == 4) {
                    return true;
                } else {
                    return false;
                }
            },
            isCateHasLv3 () {
                if (this.routeCateLv1Id == 1) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    }
</script>

<style lang="css">
</style>
