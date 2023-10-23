
// 모든 Vuex 상태를 가집니다.
const state = {
	products: {}
};

// 모든 Vue 게터를 가집니다.
const getters = {
	products: state => state.products
};

// 모든 Vue 액션을 가집니다.
// 비동기 코드를 위해 액션 객체를 사용합니다.
const actions = {
	initStore: ({ commit/* context.commit */ }) => {
		// 비동기 통신이 들어가는 곳
		setTimeout(function() {
			// 뮤테이션(mutations) 트리거 
			commit('SET_STORE', {'test': 'YSM'});
		}, 5000);
	}
};

// 모든 Vuex 뮤테이션을 가집니다.
const mutations = {
	'SET_STORE'(state/* Vuex 상태값 */, products/* 사용자 데이터 */) {
		state.products = products;
	}
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
};