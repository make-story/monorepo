//import Vue from 'vue';

// method
// method 는 재 렌더링 할때마다 항상 메소드를 호출

// computed
// computed 는 특정 값이 변했을 경우에만 재 렌더링, 값이 변하지 않으면 호출시 이전에 계산한 값을 바로 반환

// watch / computed
// https://v2.ko.vuejs.org/v2/guide/computed.html
// watch 속성은 감시할 데이터를 지정하고 그 데이터가 바뀌면 이런 함수를 실행하라는 방식 (소프트웨어 공학에서 이야기하는 ‘명령형 프로그래밍’ 방식)
// computed 속성은 계산해야 하는 목표 데이터를 정의하는 방식 (소프트웨어 공학에서 이야기하는 ‘선언형 프로그래밍’ 방식)

// data 는 함수여야 합니다.
// https://v2.ko.vuejs.org/v2/guide/components.html#data-%EB%8A%94-%EB%B0%98%EB%93%9C%EC%8B%9C-%ED%95%A8%EC%88%98%EC%97%AC%EC%95%BC%ED%95%A9%EB%8B%88%EB%8B%A4
// 공통 컴포넌트에서 data 의 동일한 객체가 아닌 새로운 객체를 반환 (불변성)

/*
-
정리
1. computed 
함수로 정의하고 data객체 등을 사용하여 계산된 값을 리턴해 줌. 
methods와 차이점은 캐싱을 시켜놓고 동일한 요청이 또 올 경우는 함수를 실행하지 않고 캐싱된 값만 리턴해 줌 
화살표함수는 사용 불가 

2. methods 
함수로 정의하고 data객체 등을 사용하여 계산된 값을 리턴해 줌. 
(뷰의 메서드는 특정 기능 별로 묶을 수 있는 자바스크립트 함수를 의미) 
computed와 차이점은 캐싱이 되지 않고 호출될때마다 계속 함수를 실행함 
화살표함수는 사용 불가 

3. watch 
지정된 변수를 계속 지켜보고 있다가 값이 변경되었을때 정의된 함수를 실행시킴 
watch: { 
	// x는 관찰하고자 하는 지정된 변수
	// 긴 시간이 필요한 비동기 처리가 필요할 경우 주로 사용됨(axios, fetch 등등..)
	x : function(v) {
		retuen v++;
	}
}
*/

export default {
  template: `
		<div>
			<p>원본 메시지: "{{ message }}"</p>
			<p>역순으로 표시한 메시지: "{{ reversedMessage }}"</p>
			<p>{{ fullName }}</p>
			<p>넓이: {{ area }}</p>
			<p>
				<button v-on:click="length += 1">세로 추가</button>
				<button v-on:click="width += 1">가로 추가</button>
			</p>
		</div>
	`,
  data() {
    return {
      message: '안녕하세요',
      firstName: 'Foo',
      lastName: 'Bar',
      length: 5,
      width: 3,
    };
  },
  // 계산된 속성, 캐싱
  computed: {
    // 계산된 getter
    reversedMessage: function () {
      return this.message.split('').reverse().join('');
    },
    fullName: {
      // getter
      // 인스턴스.fullName
      get: function () {
        return this.firstName + ' ' + this.lastName;
      },
      // setter
      // 인스턴스.fullName = 'John Doe'
      set: function (newValue) {
        let names = newValue.split(' ');
        this.firstName = names[0];
        this.lastName = names[names.length - 1];
      },
    },
    area: function () {
      return this.width * this.length;
    },
  },
  // 렌더링을 다시 할 때마다 항상 함수를 실행
  method: {},
  // 데이터 변경을 관찰하고 이에 반응
  watch: {
    length: function (newVal, oldVal) {
      console.log(`이전 새로 길이: ${oldVal}, 새 세로 길이: ${newVal}`);
    },
    width(newVal, oldVal) {
      console.log(`이전 가로 길이: ${oldVal}, 새 가로 길이: ${newVal}`);
    },
    area(newVal, oldVal) {
      console.log(`이전 넓이: ${oldVal}, 새 넓이: ${newVal}`);
    },
  },
};
