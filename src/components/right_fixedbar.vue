<template lang="html">
    <!-- 右侧固定侧栏 -->
    <div id="right_fixedbar">
        <div class="right_fixedbar_wrapper">
            <div class="right_fixedbar_item right_fixedbar_tel">
                <div class="right_fixedbar_item_icon right_fixedbar_tel_icon">
                    <i class="fa fa-phone"></i>
                </div>
                <div class="right_fixedbar_item_tip">
                    律师热线：136-3296-1172
                </div>
            </div>
            <div class="right_fixedbar_item right_fixedbar_qq">
				<a href="http://wpa.qq.com/msgrd?v=3&uin=147187568&site=www.gdszip.com&menu=yes" target="_blank">
					<div class="right_fixedbar_item_icon right_fixedbar_qq_icon">
						<i class="fa fa-qq"></i>
					</div>
					<div class="right_fixedbar_item_tip right_fixedbar_qq_tip">
						点击咨询或加律师QQ：147187568
					</div>
				</a>
            </div>
            <div class="right_fixedbar_item right_fixedbar_weixin">
                <div class="right_fixedbar_item_icon right_fixedbar_weixin_icon">
                    <i class="fa fa-weixin"></i>
                </div>
                <div class="right_fixedbar_item_tip right_fixedbar_weixin_tip">
                    <div class="right_fixedbar_weixin_tip_qrcode">
                        <img :src="reduxData['site-qrcode-weixin'].url" alt="" class="img-responsive">
                    </div>
                    <div class="right_fixedbar_weixin_tip_txt">{{reduxData['site-contacts-weixintxt']}}</div>
                </div>
            </div>
            <div class="right_fixedbar_item right_fixedbar_ask">
                <router-link :to="{ name: 'Page', params: {id: 180} }">
                    <div class="right_fixedbar_item_icon right_fixedbar_ask_icon">
                        <i class="fa fa-pencil"></i>
                    </div>
                    <div class="right_fixedbar_item_tip right_fixedbar_ask_tip">
                        在线咨询
                    </div>
                </router-link>
            </div>
            <VueBackTop class="right_fixedbar_item right_fixedbar_backtotop">
                <div class="right_fixedbar_item_icon right_fixedbar_backtotop_icon">
                    <i class="fa fa-chevron-up"></i>
                </div>
                <div class="right_fixedbar_item_tip right_fixedbar_backtotop_tip">
                    返回顶部
                </div>
            </VueBackTop>
            <!-- <VueGoTop :height="500" :duration="600" class="right_fixedbar_item right_fixedbar_backtotop">
                <div class="right_fixedbar_item_icon right_fixedbar_backtotop_icon">
                    <i class="fa fa-chevron-up"></i>
                </div>
                <div class="right_fixedbar_item_tip right_fixedbar_backtotop_tip">
                    返回顶部
                </div>
            </VueGoTop> -->
        </div>
    </div>
    <!-- 右侧侧栏结束 -->

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

<style lang="css">
</style>
