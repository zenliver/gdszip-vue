<template lang="html">
    <div id="phone_fixed_bottom">
        <div class="container-fluid">
            <div class="phone_fixed_bottom">
                <div class="row">
                    <div class="col-xs-3">
                        <router-link :to="{ name: 'Index', params: {} }">
                            <div class="phone_fixed_bottom_menu">
                                <div class="phone_fixed_bottom_menu_icon">
                                    <i class="fa fa-home"></i>
                                </div>
                                <div class="phone_fixed_bottom_menu_txt">首页</div>
                            </div>
                        </router-link>
                    </div>
                    <div class="col-xs-3">
                        <router-link :to="{ name: 'PostCate', params: {catelv1id: 4, cateid: 4} }">
                            <div class="phone_fixed_bottom_menu">
                                <div class="phone_fixed_bottom_menu_icon">
                                    <i class="fa fa-book"></i>
                                </div>
                                <div class="phone_fixed_bottom_menu_txt">知识</div>
                            </div>
                        </router-link>
                    </div>
                    <div class="col-xs-3">
                        <router-link :to="{ name: 'Page', params: {id: 180} }">
                            <div class="phone_fixed_bottom_menu">
                                <div class="phone_fixed_bottom_menu_icon">
                                    <i class="fa fa-question-circle"></i>
                                </div>
                                <div class="phone_fixed_bottom_menu_txt">咨询</div>
                            </div>
                        </router-link>
                    </div>
                    <div class="col-xs-3">
                        <router-link :to="{ name: 'Page', params: {id: 29} }">
                            <div class="phone_fixed_bottom_menu">
                                <div class="phone_fixed_bottom_menu_icon">
                                    <i class="fa fa-map-marker"></i>
                                </div>
                                <div class="phone_fixed_bottom_menu_txt">联系</div>
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
    }
</script>

<style lang="css">
</style>
