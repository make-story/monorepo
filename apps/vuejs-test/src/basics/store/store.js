import Vue from 'vue';
import Vuex from 'vuex';
//import createPersistedState from "vuex-persistedstate";

import products from './modules/products';
import popup from './modules/popup';

Vue.use(Vuex);

// store.state.products;
// store.getters.products;
// store.commit('SET_STORE'); // mutations
// store.dispatch('initStore'); // actions
export const store = new Vuex.Store({
  modules: {
    products,
    popup,
  },
  plugins: [
    /*createPersistedState({
      storage: window.sessionStorage,
      paths: ["common"]
    })*/
  ],
});

/*
// https://velog.io/@art11010/Vue-Vuex-%EB%AA%A8%EB%93%88
// https://vuex.vuejs.org/guide/state.html
const store = new Vuex.Store({
  // Vuex는 저장소를 모듈로 나눌 수 있다.
  // 각 모듈은 자체 상태(state), 변이(mutation), 액션(action), 게터(getter) 및 심지어 중첩된 모듈을 포함 할 수 있다.
  modules: {
    account: {
      namespaced: true,

      // 모듈 자산
      state: () => ({
        // 모듈 상태는 이미 중첩되어 있고, 네임스페이스 옵션의 영향을 받지 않음
        // ...
      }),
      getters: {
        isAdmin(state, getters, rootState, rootGetters) {
          // -> getters['account/isAdmin']
          // ...
        },
      },
      actions: {
        login({ dispatch, commit, getters, rootGetters }) {
          // -> dispatch('account/login')
          // ...
        },
      },
      mutations: {
        login(state) {
          // -> commit('account/login')
          // ...
        },
      },

      // 중첩 모듈
      modules: {
        // 부모 모듈로부터 네임스페이스를 상속받음
        myPage: {
          state: () => ({
            // ...
          }),
          getters: {
            profile() {
              // -> getters['account/profile']
              // ...
            },
          },
        },

        // 네임스페이스를 더 중첩
        posts: {
          namespaced: true,

          state: () => ({
            // ...
          }),
          getters: {
            popular() {
              // -> getters['account/posts/popular']
              // ...
            },
          },
        },
      },
    },
  },
});
*/
