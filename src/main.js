import Vue from 'vue';
import App from './App.vue';
import Axios from 'axios';
import VueRouter from 'vue-router';

Vue.config.productionTip = false;
Vue.prototype.$http = Axios;
Vue.use(VueRouter);

new Vue({
    render: h => h(App),
}).$mount('#app')