// 모든 Vuex 상태(state)를 가집니다.
const state = {
  test: {
    data: 1234,
  },
  message: '',
};

// 모든 Vue 게터(getters)를 가집니다.
// 특정 state 값을 반환하거나, state 를 가공한 값을 반환
// state 값을 가져와 여러 컴포넌트에서 동일한 가공을 해야할 때, 가공로직 공통화 할 수 있음
const getters = {
  getTest: (state, getters, rootState) => state.test,
  getMsg: (state, getters, rootState) => state.message,
};

/**
 * actions / mutations
 * 컴포넌트 -> 액션호출 -> 액션에서 비동기처리(API 호출) -> 비동기처리 응답값 뮤테이션 호출 -> 뮤테이션에서 상태(state)값 변경
 */

// 모든 Vue 액션(actions)을 가집니다.
// 비동기 코드를 위해 액션 객체를 사용합니다.
// dispatch(type: string, payload?: any, options?: Object): Promise<any>
// dispatch(action: Object, options?: Object): Promise<any>
const actions = {
  increment({ state, commit, rootState }) {
    console.log('actions > increment', rootState);
  },
  initStore: ({ state, commit, rootState }) => {
    // 비동기 통신이 들어가는 곳
    setTimeout(function () {
      // 뮤테이션(mutations) 트리거
      commit('SET_STORE', { test: 'YSM' });
    }, 5000);
  },
  callMutation: ({ state, commit, rootState }) => {
    console.log('actions > callMutation', rootState);
  },
};

// 모든 Vuex 뮤테이션을 가집니다.
// Mutation 은 State 의 변경역할
// Vuex는 공식적으로 Component로부터 Mutation을 직접 commit하는 것을 허가
// commit(type: string, payload?: any, options?: Object)
// commit(mutation: Object, options?: Object)
const mutations = {
  increment(state, payload) {
    console.log('mutations > increment', payload);
  },
  SET_STORE(state /* Vuex 상태값 */, payload /* 사용자 데이터 */) {
    state.test = payload;
  },
  changeMessage(state, payload) {
    state.message = payload;
  },
};

export const namespace = 'products';
export default {
  namespaced: true, // true : 자동으로 등록된 모듈의 경로를 기반하여 네임스페이스 지정
  state,
  getters,
  actions,
  mutations,
};

/**
 * Vuex Store를 바인딩하는 4가지 방법
 * https://kdydesign.github.io/2019/04/06/vuejs-vuex-helper/
 *
 * import { mapState, mapGetters, mapMutations, mapActions, createNamespacedHelpers, } from 'vuex';
 */
