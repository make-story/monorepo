<template></template>
<script>
/**
 * Vuex 변경 감지 방법
 * - watch
 * - subscribe
 * - subscribeAction ※ Vuex 2.5.0～
 */
/*
const store = new Vuex.Store({
  state: {
    prefecture: null
  },
  getters: {
    prefecture(state) { return state.prefecture }
  },
  mutations: {
    setPrefecture(state, payload) {
      state.prefecture = payload.prefecture
    }
  },
  actions: {
    doUpdatePrefecture({ commit }, prefecture) {
      commit('setPrefecture', { prefecture })
    }
  }
})
*/
export default {
  name: 'VuexWatch',
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {
    prefecture() {
      // 스토어 접근 및 반환
      // ...
    },
  },
  watch: {
    $props: {
      deep: true,
      immediate: true,
      handler() {},
    },
    prefecture: function (newValue, oldValue) {
      console.log('prefecture changed! %s => %s', oldValue, newValue);
    },
  },
  created() {},
  mounted() {
    // Vuex 상태변화 감지
    this.$store.watch(
      (state, getters) => getters.prefecture,
      (newValue, oldValue) => {
        console.log('prefecture changed! %s => %s', oldValue, newValue);
      },
    );
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'setPrefecture') {
        console.log('update prefecture! %s', state.prefecture);
      }
    });
    this.$store.subscribeAction((action, state) => {
      if (action.type === 'doUpdatePrefecture') {
        console.log('Call doUpdatePrefecture action! %s', state.prefecture);
      }
    });
  },
  beforeUnmount() {},
  methods: {},
};
</script>

<style lang="scss" scoped></style>
