import Vue from 'vue';
import Vuex from 'vuex';
import products from './modules/products';

Vue.use(Vuex);

// store.state.products;
// store.getters.products;
// store.commit('SET_STORE'); // mutations
// store.dispatch('initStore'); // actions
export const store = new Vuex.Store({
    modules: {
        products
    }
});