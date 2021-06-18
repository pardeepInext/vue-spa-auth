import Vue from 'vue';
import router from './router/index';
import store from './store/index';
import App from './App';

Vue.config.productionTip = false;

import 'bootstrap/scss/bootstrap.scss';

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})