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
    products,
  },
});

/*
// https://velog.io/@art11010/Vue-Vuex-%EB%AA%A8%EB%93%88
const store = new Vuex.Store({
  modules: {
    account: {
      namespaced: true,

      // 모듈 자산
      state: () => ({
        // 모듈 상태는 이미 중첩되어 있고, 네임스페이스 옵션의 영향을 받지 않음
        // ...
      }),
      getters: {
        isAdmin() {
          // -> getters['account/isAdmin']
          // ...
        },
      },
      actions: {
        login() {
          // -> dispatch('account/login')
          // ...
        },
      },
      mutations: {
        login() {
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
