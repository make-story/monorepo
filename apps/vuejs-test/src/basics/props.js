//import Vue from 'vue';

// props
// 속성은 부모에서 자식 컴포넌트로 데이터를 전달할 때 씁니다.

// 리터럴 속성 방식 - 컴포넌트에 전달할 수 있는 단순 문자열
// <my-component text="World"></my-component>
// 단순 문자열만 전달하지 않고, 실제 값을 속성으로 전달하고 싶을 때, v-bind 지시자를 사용해야 합니다.
// <my-component v-bind:text="message"></my-component>

// 동적 속성
// 동적 속성(dynamic prop)은 변경될 수 있는 속성(정적 문자인 리터럴 속성과 다르게)을 가지고 있는 부모에게 전달받은 속성입니다.
// <my-component v-bind:text="message"></my-component>
// message 는 데이터 함수에서 가져온 속성입니다.

// 속성 검증
// Vue.js 는 부모에게 받은 속성의 유효성 여부를 검증하는 '속성 검증(prop validation)' 기능이 있습니다.
// 문자열(string), 숫자(number), 불(boolean), 함수(function), 객체(object), 배열(array), 기호(symbol)
// 타입으로는 필수(required) 또는 기본값(default)을 추가할 수 있습니다. 
// 기본값은 속성에 아무 값도 전달되지 않았을 때의 값을 의미합니다.
// 속성 타입이 객체하면 반드시 기본값이 할당되어야 합니다.
// 필수 속성은 말 그대로 템플릿에서 컴포넌트가 생성될 때 필요한 속성입니다.

export default {
	template: `
		<div>
			숫자: {{num}}<br />
			문자: {{str}}<br />
			여부: {{even}}<br />
			객체: {{obj.message}}
		</div>
	`,
	// Non-Prop 속성
	// non-prop 속성은 attribute로 전달 되었지만, 컴포넌트에서 props로 정의 되지 않은 속성
	/*
	<date-input class="date-picker-theme-dark" data-date-picker="activated"></date-input>
	위와 같이 컴포넌트에 속성으로 값을 전달했을 때, 해당 컴포넌트에 props 설정이 없으면, 기본 태그의 속성으로 적용됨
	<input class="form-control date-picker-theme-dark" data-date-picker="activated">
	*/
	// Attribute 상속 받지 않기
	// inheritAttrs: false로 설정한다면, 부모 컴포넌트로부터 전달 받은 Attribute가 자식 컴포넌트의 Attribute로 설정되지 않습니다.
	/*
	<base-input placeholder="inherit"></base-input>
	Vue.component('base-input', { 
		inheritAttrs: false, 
		template: '<input />' 
	})
	*/
	props: {
		num: {
			type: Number,
		},
		str: {
			type: String,
			default: '안녕',
			required: true,
		},
		obj: {
			type: Object,
			default: () => {
				return {
					message: '안녕 객체',
				};
			},
		},
		even: {
			valudator: (value) => {
				return value % 2 === 0;
			},
		},
	},
	data() {
		return {
			
		};
	},
	methods: {
		
	},
};