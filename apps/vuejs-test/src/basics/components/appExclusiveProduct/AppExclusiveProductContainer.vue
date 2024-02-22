<template>
  <app-exclusive-product-popup
    @closed="closed"
    :message="{
      heading: message.heading,
      notice: message.notice,
      appStore: message.appStore,
      mobileWeb: message.mobileWeb,
    }"
    :event="{ onClickAppStore, onClickMobileWeb }"
  ></app-exclusive-product-popup>
</template>
<script>
/**
 * App 전용 - 컨테이너 컴포넌트
 */
import { createNamespacedHelpers } from 'vuex';

import AppExclusiveProductPopup, {
  EVENT as POPUP_EVENT,
} from './AppExclusiveProductPopup';

const { mapState, mapGetters, mapActions, mapMutations } =
  createNamespacedHelpers('popup/appExclusiveProduct');

export default {
  name: 'AppExclusiveProductContainer',
  components: {
    AppExclusiveProductPopup,
  },
  props: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['name', 'toggle', 'message']),
  },
  watch: {
    $props: {
      deep: true,
      immediate: true,
      handler() {},
    },
    toggle: {
      deep: true,
      handler() {
        console.log(
          'AppExclusiveProductContainer > toggle 전역상태값 변경됨!!',
          this.toggle,
        );
        if (this.toggle) {
          this.show();
        } else {
          this.hide();
        }
      },
    },
    message: {
      deep: true,
      handler() {
        console.log(
          'AppExclusiveProductContainer > message 전역상태값 변경됨!!',
          this.message,
        );
      },
    },
  },
  created() {},
  mounted() {},
  methods: {
    show() {
      console.log('AppExclusiveProductContainer > show');
      this.$modal.show(POPUP_EVENT.SHOW);
      // 전역상태 확인하여 변경
      if (this.toggle !== true) {
        this.$store.commit('popup/appExclusiveProduct/setToggle', true);
      }
    },
    hide() {
      console.log('AppExclusiveProductContainer > hide');
      this.$modal.hide(POPUP_EVENT.HIDE);
      // 전역상태 확인하여 변경
      if (this.toggle !== false) {
        this.$store.commit('popup/appExclusiveProduct/setToggle', false);
      }
    },
    closed() {
      console.log('AppExclusiveProductContainer > closed');
      // 전역상태 확인하여 변경
      if (this.toggle !== false) {
        this.$store.commit('popup/appExclusiveProduct/setToggle', false);
      }
    },
    onClickAppStore() {
      console.log('AppExclusiveProductContainer > onClickAppStore');
    },
    onClickMobileWeb() {
      console.log('AppExclusiveProductContainer > onClickMobileWeb');
      this.hide();
    },
  },
};
</script>
