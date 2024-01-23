/**
 * -
 * actions / mutations
 * 컴포넌트 -> 액션호출 -> 액션에서 비동기처리(API 호출) -> 비동기처리 응답값 뮤테이션 호출 -> 뮤테이션에서 상태(state)값 변경
 *
 * -
 * Vuex Store를 바인딩하는 4가지 방법
 * https://kdydesign.github.io/2019/04/06/vuejs-vuex-helper/
 * import { mapState, mapGetters, mapMutations, mapActions, createNamespacedHelpers, } from 'vuex';
 */

/**
 * 모든 Vuex 상태(state)를 가집니다.
 */
const state = {
  test: {
    data: 1234,
  },
  message: '',
};

/**
 * 모든 Vue 게터(getters)를 가집니다.
 * https://vuex.vuejs.org/api/#getters
 *
 * 특정 state 값을 반환하거나, state 를 가공한 값을 반환
 * state 값을 가져와 여러 컴포넌트에서 동일한 가공을 해야할 때, 가공로직 공통화 할 수 있음
 *
 * https://vuex.vuejs.org/guide/getters.html#property-style-access
 * Vue 컴포넌트에서 this.$store.getters.XXX 를 통해 접근 가능 (this.$store 는 Vuex 기본 제공 변수)
 */
const getters = {
  getTest: (state, getters, rootState) => state.test,
  getMsg: (state, getters, rootState) => state.message,
};

/**
 * 모든 Vue 액션(actions)을 가집니다.
 * https://vuex.vuejs.org/api/#actions
 *
 * 비동기 코드를 위해 액션 객체를 사용합니다.
 *
 * https://vuex.vuejs.org/api/#dispatch
 * dispatch(type: string, payload?: any, options?: Object): Promise<any>
 * dispatch(action: Object, options?: Object): Promise<any>
 */
/*
여러 작업을 동기적으로 디스패치해야 하는 경우
try {
  await this.$store.dispatch('action1');
  await this.$store.dispatch('action2');
  await this.$store.dispatch('action3');
} catch (error) {
  // Handle errors if any of the actions fail
  console.error(error);
}
*/
const actions = {
  test(context) {
    /*
    context 구조
    {
      state,      // same as `store.state`, or local state if in modules
      rootState,  // same as `store.state`, only in modules
      commit,     // same as `store.commit`
      dispatch,   // same as `store.dispatch`
      getters,    // same as `store.getters`, or local getters if in modules
      rootGetters // same as `store.getters`, only in modules
    }
    */
    console.debug('actions > test', context);
  },
  increment(
    { state, commit, rootState },
    payload /* dispatch 할 때 사용자 파라미터 */,
  ) {
    console.log('actions > increment', rootState);
  },
  initStore: (
    { state, commit, rootState },
    payload /* dispatch 할 때 사용자 파라미터 */,
  ) => {
    // 비동기 통신이 들어가는 곳
    setTimeout(function () {
      // 뮤테이션(mutations) 트리거
      commit('SET_STORE', { test: 'YSM' });
    }, 5000);
  },
  callMutation: (
    { state, commit, rootState },
    payload /* dispatch 할 때 사용자 파라미터 */,
  ) => {
    console.log('actions > callMutation', rootState);
  },
  /**
   * API 호출 예
   */
  //store.dispatch('actionAPI1').then(() => {})
  actionAPI1({ commit }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        //commit('someMutation');
        resolve();
      }, 1000);
    });
  },
  //store.dispatch('actionAPI2').then(() => {})
  actionAPI2({ dispatch, commit }) {
    return dispatch('actionAPI1').then(() => {
      //commit('someOtherMutation')
    });
  },
  async actionAPI3({ commit }) {
    //commit('gotData', await getData())
  },
  async actionAPI4({ dispatch, commit }) {
    await dispatch('actionAPI1'); // wait for `actionA` to finish
    //commit('gotOtherData', await getOtherData())
  },
};

/**
 * 모든 Vuex 뮤테이션을 가집니다.
 * https://vuex.vuejs.org/api/#mutations
 *
 * Mutation 은 State 의 변경역할
 * Vuex는 공식적으로 Component 로부터 Mutation 을 직접 commit 하는 것을 허가
 *
 * https://vuex.vuejs.org/api/#commit
 * commit(type: string, payload?: any, options?: Object)
 * commit(mutation: Object, options?: Object)
 */
const mutations = {
  increment(state, payload) {
    console.log('mutations > increment', payload);
    state.test.data = payload;
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
