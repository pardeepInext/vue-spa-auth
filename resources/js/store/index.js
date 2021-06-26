import Vue from 'vue';
import Vuex, { mapState } from 'vuex';
import User from './user';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {User},
});
