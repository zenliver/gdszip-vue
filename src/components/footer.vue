<template lang="html">
    <div id="footer">
        <div class="container">
            <div class="footer">
                <div class="row">
                    <div class="col-md-4 col-sm-4">
                        <div class="footer_col footer_nav">
                            <div class="footer_col_title">网站导航</div>
                            <MenuLv1 class="footer_nav_list clearfix"></MenuLv1>
                        </div>
                    </div>
                    <div class="col-md-4 col-sm-4">
                        <div class="footer_col footer_contact">
                            <div class="footer_col_title">联系律师</div>
                            <div class="footer_contact_info" v-html="reduxData['site-contacts-footer']">
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 col-sm-4">
                        <div class="footer_col footer_weixin">
                            <div class="footer_col_title">微信公众号</div>
                            <div class="footer_weixin_qrcode">
                                <img src="./../assets/images/footer_weixin_qrcode.jpg" alt="" class="img-responsive">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- footer end -->
</template>

<script>
    export default {
        props: {
            reduxData: {
                type: Object,
                required: true
            }
        }
    }
</script>

<style lang="less">
</style>
