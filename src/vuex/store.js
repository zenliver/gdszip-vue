import Vue from 'vue';
import vuex from 'vuex';
Vue.use(vuex);

export default new vuex.Store({
    state: {

    },
    getters: {
        isPhone () {
            let windowWidth = window.innerWidth;
            if (windowWidth < 768) {
                return true;
            } else {
                return false;
            }
        }

    }
})
