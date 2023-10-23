import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex); // Vue 로 Vuex 를 설정합니다.

/*
-
Vuex 사용 가이드
1. Single Source of Truth
단일 스토어에서 상태를 관리 합니다.
2. Data is Read-Only
상태는 직접 접근하여 변경하지 않고, mutations 또는 actions 를 통해 상태를 변경합니다.
3. Mutations Are Synchronous
뮤테이션은 동기적, 액션은 비동기적 상태변경에 사용합니다.

-
왜 처리 로직의 성격에 따라 Mutations와 Actions로 나눠 등록해야 할까?
https://jamong-icetea.tistory.com/219

Mutations의 역할은 State 관리이다.
상태관리 자체가 한 데이터에 대해 여러 개의 컴포넌트가 관여하는 것을 효율적으로 관리하기 위함인데, 
Mutations에 비동기 처리 로직들이 포함되면 같은 값에 대해 여러 개의 컴포넌트에서 변경을 요청했을 때, 
그 "변경 순서 파악이 어렵기 때문" 이다.
따라서, setTimeout()이나 서버와의 HTTP 프로토콜 통신 처리 같이 "결과를 받는 타이밍이 예측되지 않는 로직들은 Actions에 선언" 하는 것이다.
*/


/*
// 전역 저장소 의존 방식
const Counter = {
	template: `<div>{{ count }}</div>`,
	computed: {
		count () {
			// store.state.count가 변경되면 계산된 속성이 다시 변경되고 관련 DOM 업데이트가 트리거됩니다.
			return store.state.count
		}
	}
}

// 루트 컴포넌트의 모든 자식 컴포넌트에 저장소를 "주입" 방식
// 루트 인스턴스에 store 옵션을 제공함으로써 저장소는 루트의 모든 하위 컴포넌트에 주입되고 this.$store로 사용할 수 있습니다.
const app = new Vue({
	el: '#app',
	// "store" 옵션을 사용하여 저장소를 제공하십시오.
	// 그러면 모든 하위 컴포넌트에 저장소 인스턴스가 삽입됩니다.
	store,
	components: { Counter },
	template: `
		<div class="app">
			<counter></counter>
		</div>
	`
})
const Counter = {
	template: `<div>{{ count }}</div>`,
	computed: {
		count () {
			return this.$store.state.count
		}
	}
}
*/

export const store = new Vuex.Store({
	// 상태 
	// 사용하는 쪽에서 store.state.count; 형태로 상태에 접근 - computed
	state: {
		msg: 'Hello World',
		count: 0
	},

	// 상태를 업데이트하기 위해 뮤테이션(mutations)을 사용
	// 뮤테이션은 애플리케이션 상태를 업데이트하는 데 사용
	// 뮤테이션은 동기적
	// 사용하는 쪽에서 store.commit('increment', 10); 형태로 상태 업데이트 접근 - methods
	mutations: {
		increment(state/* Vuex state(상태값) */, payload/*호출하는 쪽에서 전달하는 사용자 파라미터 값*/) {
			//state.count++;
			state.count += payload;
		},
	},

	// 게터(getters)를 사용하면 모든 컴포넌트가 동일한 방법으로 상태에 접근할 수 있습니다.
	// 동기적 처리
	// 사용하는 쪽에서 store.getters.msg; 형태로 게터에 접근 - computed
	getters: {
		msg(state) {
			return state.msg.toUpperCase();
		},
		count(state) {
			return state.count;
		},
	},
	
	// 액션(actions)
	// 비동기 처리
	// 사용하는 쪽에서 store.dispatch('increment', 10); 형태로 액션에 접근 - methods
	actions: {
		increment(context, payload) {
			// context 는 변경 사항을 커밋하는데 사용
			setTimeout(function() {
				// increment 뮤지이션을 트리거(commit)해서 페이로드를 전달합니다.
				context.commit('increment', payload);
			}, 2000);
		}
	}
});

/*
// 사용 예
import { store } from './basics/vuex-store';

const vuexTest = {
	el: '#vuex-store',
	template: `
	<div>
		<h1>{{header}}</h1>
		<h2>{{welcome}}</h2>
		<h3>{{counter}}</h3>
		<button @click="increment">Press Me</button>
	</div>
	`,
	data() {
		return {
			header: 'Vuex App',
		}
	},
	computed: {
		// Vuex 상태를 Vue 컴포넌트에서 가져오기
		welcome() {
			// store 직접 접근
			//return store.state.msg;

			// getters 통해 접근
			return store.getters.msg;
		},
		counter() {
			// store 직접 접근
			//return store.state.count;

			// getters 통해 접근
			return store.getters.count;
		},
	},
	methods: {
		increment() {
			// Vuex increment 뮤테이션(store 의 mutations 에 위치한 것)을 트리거 합니다. - 동기적 방식
			//store.commit('increment', 10); 

			// increment 액션(store 의 actions 에 위치한 것)을 디스패치 합니다. - 비동기적 방식
			store.dispatch('increment', 10);
		}
	},
};
new Vue(vuexTest);


// 컴포넌트 내부에서 this.$store.state.count; 로 접근 가능하도록 만들기
const Counter = {
	template: `<div>{{ count }}</div>`,
	computed: {
		count () {
			return this.$store.state.count
		}
	}
};
const app = new Vue({
	el: '#app',
	// "store" 옵션을 사용하여 저장소를 제공하십시오.
	// 그러면 모든 하위 컴포넌트에 저장소 인스턴스가 삽입됩니다.
	store,
	template: `
		<div class="app">
			<counter></counter>
		</div>
	`,
	components: { Counter },
})
*/