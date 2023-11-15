import Vue from 'vue';

// 커스텀 지시자 
// 지시자에는 지역과 전역 두 종류가 있습니다.
// 전역 지시자는 앱 어디에서든 모든 요소에 접근할 수 있습니다.
// 지역 지시자는 해당 지시자를 등록한 컴포넌트에서만 사용할 수 있습니다.

// 모든 커스텀 지시자는 v-* 로 시작합니다.

// 모든 커스텀 지시자는 훅 하나를 명시해야 합니다.
// 해당 훅은 커스텀 지시자의 생명 주기 여러곳에서 호출됩니다.
/*
bind: 이 훅은 요소에 지시자가 바인딩될 때 한번만 호출됩니다. 설정 작업을 하기 좋은 곳입니다.
inserted: 바인딩된 요소가 부모 노드에 삽입될 때 호출됩니다.
update: 컴포넌트를 포함하는 VNode 가 업데이트된 후 호출됩니다.
componentUpdate: 컴포넌트를 포함하는 VNode 와 VNode 의 자식이 업데이트된 후 호출됩니다.
unbind: 지시자가 요소에서 바인딩 해제될 때 호출됩니다.
*/

// 전역 커스텀 지시자 등록
Vue.directive('style-global', {
	bind(el, binding) {
		el.style.color = binding.value || "blue";
		// <div v-style-global.small>안녕하세요.</div>
		if(binding.modifiers.small) {
			el.style.fontSize = "17px";
		}
		el.className = binding.arg;
	}
});

export default {
	template: `
		<div>
			<span v-style-global.small>
				전역 지시자 등록 테스트
			</span>
			<span v-style-me>
				지역 지시자 등록 테스트
			</span>
		</div>
	`,
	data() {
		return {

		};
	},
	// 지역 커스텀 지시자 등록
	directives: {
		// v-style-me 지시자
		styleMe(el/*, binding, vnode, oldVnode*/) {
			/*
			el: 지시자가 바인딩되어 있는 요소
			binding: name, value, oldValue, expression 을 포함한 여러 속성을 가진 객체
			vnode: Vue 컴파일러가 생성한 가상 노드
			oldVnode: 이전 가상 노드
			*/
			//bind: {
				el.style.color = "blue";
				el.style.fontSize = '42px';
				el.className = 'text-center';
			//};
		}
	}
};