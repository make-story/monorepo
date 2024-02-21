const state = () => ({
  name: 'appExclusiveProduct',
  toggle: false,
  message: {
    heading: 'APP 전용 상품입니다',
    notice: '',
    appStore: 'APP Store 가기',
    mobileWeb: '모바일웹으로 볼래요.',
  },
});
const getters = {
  name: (state, getters, rootState) => state.name,
  toggle: (state, getters, rootState) => state.toggle,
  message: (state, getters, rootState) => state.message,
};
const actions = {};
const mutations = {
  setToggle(state, payload = false) {
    console.log('mutations > setToggle', payload);
    state.toggle = payload;
  },
  setMessage(state, payload = {}) {
    // payload: { heading: '', notice: '', ... }
    console.log('mutations > setMessage', payload);
    state.message = {
      ...state.message,
      ...payload,
    };
  },
};

export default {
  namespaced: true, // true : 자동으로 등록된 모듈의 경로를 기반하여 네임스페이스 지정
  state: state(),
  getters,
  actions,
  mutations,
};
