<template lang="html">
    <ul class="index_service_item_cates clearfix">
        <li v-for="serviceCate in serviceCates">
            <router-link :to="{ name: 'PostCate', params: {catelv1id: 1, cateid: serviceCate.id} }">{{serviceCate.name}}</router-link>
        </li>
    </ul>
</template>

<script>
    export default {
        props: {
            serviceCateId: {
                type: Number,
                required: true
            },
            optionUpdated: {
                type: Boolean
            }
        },
        data () {
            return {
                serviceCates: []
            };
        },
        methods: {
            getServiceCatesData () {

                this.$getDataFromServerOrCache('/wp-json/wp/v2/categories/?fields=id,name&orderby=id&parent='+this.serviceCateId,'serviceCates','categorySubs'+this.serviceCateId,this.optionUpdated,null,false,null,null);

            }
        },
        created () {
            this.getServiceCatesData();
        }
    }
</script>

<style lang="css">
</style>
