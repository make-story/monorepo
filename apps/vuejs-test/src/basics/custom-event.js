// 커스텀 이벤트는 부모에서 자식 컴포넌트로 이벤트를 넘겨줄 때 사용합니다.
// $on(이벤트 이름)을 사용하여 이벤트를 수신하고,
// $emit(이벤트 이름)을 사용하여 이벤트를 트리거합니다.

// 일반적으로 $on(이벤트 이름)은 부모 자식 관계가 아닌, 컴포넌트 간에 이벤트를 송수신하는 데 사용합니다.
// 부모와 자식 이벤트는 v-on 지시자를 사용해야 합니다.

// .sync 를 사용해서 자식 속성 변경
// 대부분의 상황에서 자식 컴포넌트가 부모 속성을 변경하면 안 됩니다.
// .sync 변경자는 자식 컴포넌트 안에서 부모 컴포넌트 값을 변경할 수 있게 합니다.
// 원래 Vue 1.x 버전에서 처음 소개되었다가 Vue 2.0 에서 삭제되었고, Vue.js 코어 팀이 2.3.0+ 버전에서 다시 살리기로 했습니다. (그런 만큼 사용할 때 주의)

// native
// @click.native=""
// https://hj-tilblog.tistory.com/88
// https://v3-migration.vuejs.org/breaking-changes/v-on-native-modifier-removed.html

export default {
  props: ['my-counter'],
  template: `
		<div>
			<button v-on:click="childIncrementCounter1">자식으로 부터 증가</button>
			<button v-on:click="childIncrementCounter2">자식으로 부터 증가(.sync)</button>
		</div>
	`,
  methods: {
    childIncrementCounter1() {
      // 컴포넌트 이벤트 실행
      // 상위 컴포넌트에서 <custom-event v-on:increment-me="이벤트 핸들러 메소드(함수명)" /> 형태로 사용
      this.$emit('increment-me');
    },
    childIncrementCounter2() {
      // 자식 컴포넌트가 부모 속성을 변경
      // 상위 컴포넌트에서 <custom-event :my-counter.sync="이벤트 핸들러 메소드(함수명)" /> 형태로 사용
      this.$emit('update:myCounter', this.myCounter + 1);
    },
  },
};
