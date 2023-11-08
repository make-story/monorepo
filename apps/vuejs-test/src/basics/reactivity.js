/**
 * 반응형
 * 데이터 변경 추적
 * https://v2.ko.vuejs.org/v2/guide/reactivity.html
 */

// 배열 : Vue.set(arr, index, value) // this.$set(arr, index, value)
// 객체 : Vue.set(obj, key, value) // this.$set(obj, key, value)
// Vue.delete(obj, key) // this.$delete(obj, key)

new Vue({
  el: '#app',
  data: {
    obj: { a: 'a' },
    arr: [0, 1, 2],
  },
  methods: {
    changeData: function () {
      // 배열의 값 변경
      // this.$set(arr, index, value)
      Vue.set(this.arr, 2, 3);

      // 객체의 값 변경 및 추가
      // this.$set(obj, key, value)
      Vue.set(this.obj, 'it', 'record');
    },
    removeProperty: function () {
      // 객체의 속성 제거
      // this.$delete(obj, key)
      Vue.delete(this.obj, 'a');
    },
  },
});
