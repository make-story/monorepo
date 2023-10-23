
// Vuex Store를 바인딩하는 4가지 방법
// https://kdydesign.github.io/2019/04/06/vuejs-vuex-helper/

import { mapState, mapGetters, mapMutations, mapActions, createNamespacedHelpers, } from 'vuex'

/*
// store 모듈 단위 사용
const productsHelper = createNamespacedHelpers('products');
export default {
	computed: {
		...productsHelper.mapState({
			message: state => state.message     // -> this.message
		}),
		...productsHelper.mapGetters([
			'getMsg'       // -> this.getMsg
		])
	},
	methods: {
		...productsHelper.mapMutations([
			'changeMessage'     // -> this.changeMessage()
		]),
		...productsHelper.mapActions([
			'callMutation'      // -> this.callMutation()
		])
	}
}

// 또는

export default {
	computed: {
		...mapState('products', {
			message: state => state.message     // -> this.message
		}),
		...mapGetters('products', [
		'getMsg'       // -> this.getMsg
		])
	},
	methods: {
		...mapMutations('products', [
			'changeMessage'     // -> this.changeMessage()
		]),
		...mapActions('products', [
			'callMutation'      // -> this.callMutation()
		])
	}
}
*/






/*
// mapState 헬퍼
export default {
	// ...
	computed: mapState({
		// 화살표 함수는 코드를 매우 간결하게 만들어 줍니다!
		count: state => state.count,
  
		// 문자열 값 'count'를 전달하는 것은 `state => state.count`와 같습니다.
		countAlias: 'count',
  
		// `this`를 사용하여 로컬 상태에 액세스하려면 일반적인 함수를 사용해야합니다
		countPlusLocalState (state) {
			return state.count + this.localCount
		}
	})
}

// 매핑 된 계산된 속성의 이름이 상태 하위 트리 이름과 같을 때 문자열 배열을 mapState에 전달할 수 있습니다.
computed: mapState([
	// this.count를 store.state.count에 매핑 합니다.
	'count'
])


// mapGetters 헬퍼
// mapGetters 헬퍼는 저장소 getter를 로컬 계산된 속성에 매핑합니다.
export default {
	// ...
	computed: {
		// getter를 객체 전개 연산자(Object Spread Operator)로 계산하여 추가합니다.
		...mapGetters([
			'doneTodosCount',
			'anotherGetter',
			// ...
		])
	}
}

...mapGetters({
	// this.doneCount를 store.getters.doneTodosCount에 매핑하십시오.
	doneCount: 'doneTodosCount'
})


// mapMutations 헬퍼
// mu1 은 this.mu1() 을 this.$store.commit('mu1')에 매핑합니다.
export default {
	// ...
	methods: {
		...mapMutations([
			'mu1',
			'mu2',
			// ...
		])
	}
}


// mapActions 헬퍼
// act1 은 this.act1() 을 this.$store.dispatch('act1')에 매핑합니다.
export default {
	// ...
	methods: {
		...mapActions([
			'act1',
			'act2',
			// ...
		])
	}
}
*/