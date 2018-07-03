<template>
    <transition name="back-top-fade">
        <div :class="className" v-show="visible" @click="backTop">
            <slot></slot>
        </div>
    </transition>
</template>

<script>

    export default {
        name: 'BackTop',
        props: {
            visibleOffset: {
                type: [String, Number],
                default: 500
            },
            className: {
                type: String
            }
        },
        data () {
            return {
                visible: false
            }
        },
        created () {
            let catchScroll = () => {
                this.visible = (window.pageYOffset > parseInt(this.visibleOffset))
            };

            window.smoothscroll = () => {
                let currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
                if (currentScroll > 0) {
                    window.requestAnimationFrame(window.smoothscroll);
                    window.scrollTo(0, currentScroll - (currentScroll / 5))
                }
            };

            window.onscroll = catchScroll
        },
        methods: {
            backTop () {
                window.smoothscroll()
            }
        }
    }
</script>
<style rel="stylesheet/scss" lang="less">
    .back-top-fade-enter-active, .back-top-fade-leave-active {
        transition: opacity .2s;
    }
    .back-top-fade-enter, .back-top-fade-leave-to {
        opacity: 0;
    }
</style>
