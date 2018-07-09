<template lang="html">
    <div class="content_page_wrapper">
        <VueElementLoading v-if="!pageDataLoaded"></VueElementLoading>
        <div class="content_page" v-if="pageDataLoaded">
            <h1 class="content_page_title">{{pageData.title.rendered}}</h1>
            <div class="content_page_detail content_page_detail_contact" v-html="pageData.content.rendered">
            </div>
            <div class="ask_form">
                <form class="form-horizontal" role="form" method="post">
                    <div class="form-group">
                        <label for="ask_form_name" class="col-sm-2 control-label">您的称呼：</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="ask_form_name" placeholder="必填" v-model="askFormName">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="ask_form_tel" class="col-sm-2 control-label">联系电话：</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="ask_form_tel" placeholder="必填，仅律师可见" v-model="askFormTel">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="ask_form_content" class="col-sm-2 control-label">咨询内容：</label>
                        <div class="col-sm-10">
                            <textarea class="form-control" id="ask_form_content" name="" rows="8" cols="80" placeholder="请详细描述您的案情，以便律师给您更好的建议" v-model="askFormContent"></textarea>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-offset-2 col-sm-10">
                            <button type="button" class="btn btn-default" @click="postComment">提交咨询</button>
                        </div>
                    </div>
                </form>
            </div>
            <div class="ask_list">
                <div class="ask_item" v-for="askItem in askData">
                    <div class="ask_item_q">
                        <div class="ask_item_q_name">{{askItem.author_name}}</div>
                        <div class="ask_item_q_content" v-html="askItem.content.rendered"></div>
                        <div class="ask_item_q_time"><span>咨询时间：</span>{{askItem.date.replace(/T/,' ')}}</div>
                    </div>
                    <AskItemAnwser :parentCommentId="askItem.id"></AskItemAnwser>
                </div>
            </div>
            <div class="mod_pagination">
                <paginate :page-count="askPagiCount" :click-handler="getPagiAskData" :prev-text="'&lt;'" :next-text="'&gt;'" :container-class="'pagination'" v-if="hasComments"></paginate>
            </div>
        </div>
    </div>
</template>

<script>
    import AskItemAnwser from './page_ask_item_anwser.vue';

    export default {
        components: {
            AskItemAnwser,
        },
        props: {
            contentUpdated: {
                type: Boolean
            }
        },
        data () {
            return {
                pageDataLoaded: false,
                pageData: {},
                askFormName: '',
                askFormTel: '',
                askFormContent: '',
                aboutAllAskData: [],
                askPagiCount: 1,
                askPerPage: 5,
                askData: [],
                apiBase: '/wp-json/wp/v2/comments/?fields=id,author_name,date,content&parent=0',
                apiBase0: '/wp-json/wp/v2/comments/?fields=id&parent=0',
                pagiNum: 1,
                hasComments: false
            };
        },
        computed: {
            routeId () {
                return this.$route.params.id;
            },
            apiUrl () {
                return this.apiBase+'&per_page='+this.askPerPage+'&post='+'180'+'&page='+this.pagiNum;
            }
        },
        methods: {
            getPageData () {

                // this.$axios.get('/wp-json/wp/v2/pages/'+this.routeId+'?fields=id,title,content').then( (response) => {
                //     this.pageData = response.data;
                //     this.pageDataLoaded = true;
                //
                //     this.$emit('pageDataLoaded',this.pageData.title.rendered);
                // });

                let afterGetFunc = () => {
                    this.$emit('pageDataLoaded',this.pageData.title.rendered);
                }
                this.$getDataFromServerOrCache('/wp-json/wp/v2/pages/'+this.routeId+'?fields=id,title,content','pageData','pageData'+this.routeId,this.contentUpdated,'pageDataLoaded',false,null,afterGetFunc);

            },
            getAskData () {
                this.$axios.get(this.apiUrl).then( (response) => {
                    this.askData = response.data;
                });
            },
            getAboutAllAskData () {
                this.$axios.get(this.apiBase0+'&per_page=100&post='+'180').then( (response) => {
                    this.aboutAllAskData = response.data;
                    this.askPagiCount = Math.ceil((this.aboutAllAskData.length)/(this.askPerPage));

                    if (this.askPagiCount > 0) {
                        this.hasComments = true;
                    }
                });
            },
            getPagiAskData (clickedPageNum) {
                this.pagiNum = clickedPageNum;

                this.getAskData();
            },
            postComment () {

                this.$axios.post('/json-api/respond/submit_comment/?post_id=180&name='+this.askFormName+'&email=everyone@gdszip.com&url='+this.askFormTel+'&content='+this.askFormContent+' [本条咨询来自APP]').then( (response) => {
                    // console.log(response);
                    alert('您的咨询已提交成功，将在律师阅读后显示。吴彬律师会尽快联系您，希望能帮助您解决问题。');
                    this.askFormContent = '';
                }).catch( (error) => {
                    if (error.response) {
                        // console.log(error.response);
                    }
                    alert('抱歉，提交失败，请修改后重新提交。');
                });

            },
        },
        created () {
            this.getPageData();
            this.getAskData();
            this.getAboutAllAskData();
        }
    }
</script>

<style lang="css">
</style>
