import Vue from 'vue';
import router from './router/index';
import store from './store/index';
import App from './App';

Vue.config.productionTip = false;



new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App)
})
