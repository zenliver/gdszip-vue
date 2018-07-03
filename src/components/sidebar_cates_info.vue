<template lang="html">
    <div class="sidebar_cates">
        <div class="mod_info_panel">
            <div class="mod_info_panel_head">法律知识</div>
            <div class="mod_info_panel_body">
                <ul class="sidebar_cates_lv2_list clearfix">
                    <li v-for="cateLv1Item in infoCatesLv1">
                        <router-link :to="{ name: 'PostCate', params: {catelv1id: routeCateLv1Id, cateid: cateLv1Item.id} }">{{cateLv1Item.name}}</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            optionUpdated: {
                type: Boolean
            }
        },
        data () {
            return {
                infoCatesLv1: []
            };
        },
        computed: {
            routeCateLv1Id () {
                return this.$route.params.catelv1id;
            }
        },
        methods: {
            getInfoCatesLv1Data () {
                let getInfoCatesLv1 = () => {
                    this.$axios.get('/wp-json/wp/v2/categories/?fields=id,name&orderby=id&parent='+this.routeCateLv1Id).then( (response) => {
                        this.infoCatesLv1 = response.data;

                        localStorage.infoCatesLv1 = JSON.stringify(this.infoCatesLv1);
                    });
                }

                if (this.optionUpdated) {
                    getInfoCatesLv1();
                } else {
                    if (localStorage.infoCatesLv1 === undefined) {
                        getInfoCatesLv1();
                    } else {
                        this.infoCatesLv1 = JSON.parse(localStorage.infoCatesLv1);
                    }
                }

            },

        },
        created () {
            this.getInfoCatesLv1Data();
        }
    }
</script>

<style lang="css">
</style>
