// 모든 Vuex 상태를 가집니다.
const state = {
  test: {
    data: 1234,
  },
};

// 모든 Vue 게터를 가집니다.
// getters
const getters = {
  getTest: (state, getters, rootState) => state.test,
};

// 모든 Vue 액션을 가집니다.
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
};

// 모든 Vuex 뮤테이션을 가집니다.
// commit(type: string, payload?: any, options?: Object)
// commit(mutation: Object, options?: Object)
const mutations = {
  increment(state, payload) {
    console.log('mutations > increment', payload);
  },
  SET_STORE(state /* Vuex 상태값 */, payload /* 사용자 데이터 */) {
    state.test = payload;
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
