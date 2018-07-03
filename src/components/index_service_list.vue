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
                let getServiceCates = () => {
                    this.$axios.get('/wp-json/wp/v2/categories/?fields=id,name&orderby=id&parent='+this.serviceCateId).then( (response) => {
                        this.serviceCates = response.data;

                        localStorage.setItem('categorySubs'+this.serviceCateId,JSON.stringify(this.serviceCates));
                    });
                }

                if (this.optionUpdated) {
                    getServiceCates();
                } else {
                    if (localStorage.getItem('categorySubs'+this.serviceCateId) === null) {
                        getServiceCates();
                    } else {
                        this.serviceCates = JSON.parse( localStorage.getItem('categorySubs'+this.serviceCateId) );
                    }
                }

            }
        },
        created () {
            this.getServiceCatesData();
        }
    }
</script>

<style lang="css">
</style>
