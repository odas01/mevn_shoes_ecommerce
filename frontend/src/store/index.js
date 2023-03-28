import Vuex from 'vuex';

// import getters from './getters';
import mutations from './mutations';
import actions from './actions';

export default new Vuex.Store({
    state: {
        isLogin: false,
        user: {},
        filter: {},
        quantityCart: 0,
    },
    mutations,
    actions,
});
