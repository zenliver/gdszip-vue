<template lang="html">
    <ul class="dropdown-menu lv3" v-if="serviceCatesLv3.length > 0? true : false">
        <li v-for="serviceCate in serviceCatesLv3">
            <router-link :to="{ name: 'PostCate', params: {catelv1id: 1, cateid: serviceCate.id} }">{{serviceCate.name}}</router-link>
        </li>
    </ul>
</template>

<script>
    export default {
        props: {
            parentCateId: {
                type: Number
            },
            optionUpdated: {
                type: Boolean
            }
        },
        data () {
            return {
                serviceCatesLv3: [],
            };
        },
        methods: {
            getServiceCatesLv3Data () {
                this.$getDataFromServerOrCache('/wp-json/wp/v2/categories/?fields=id,name,acf&orderby=id&parent='+this.parentCateId,'serviceCatesLv3','categorySubs'+this.parentCateId,this.optionUpdated,null,false,null,null);
            }
        },
        created () {
            this.getServiceCatesLv3Data();
        }
    }
</script>

<style lang="css">
</style>
