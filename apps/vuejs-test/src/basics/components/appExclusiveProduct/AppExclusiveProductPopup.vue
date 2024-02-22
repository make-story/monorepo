<template>
  <!-- <modal> : vue-js-modal - https://www.npmjs.com/package/vue-js-modal //-->
  <modal
    name="AppExclusiveProductPopup"
    height="auto"
    classes="popRound whiteSpace"
    @before-open="beforeOpen"
    @opened="opened"
    @before-close="beforeClose"
    @closed="closed"
  >
    <div class="popContents team-popup-contents">
      <div class="team-popup-contents__type2">
        <h2
          v-if="!!message.heading"
          class="team-popup-contents--heading"
          v-html="message.heading"
        ></h2>
        <div
          class="team-popup-contents__notice-area"
          v-html="message.notice"
        ></div>
        <div class="team-popup-contents__btn-group">
          <button
            v-if="typeof event.onClickAppStore === 'function'"
            type="button"
            class=""
            @click="event.onClickAppStore"
            v-html="message.appStore"
          ></button>
        </div>
        <button
          v-if="typeof event.onClickMobileWeb === 'function'"
          type="button"
          class="team-popup-contents--btn-no-problem"
          @click="event.onClickMobileWeb"
          v-html="message.mobileWeb"
        ></button>
      </div>
    </div>
  </modal>
</template>

<script>
/**
 * App 전용 팝업 - 프레젠테이션 컴포넌트
 */
import ButtonGroup from '@/components/common/ButtonGroup.vue';
import ButtonBox from '@/components/common/ButtonBox.vue';

const EVENT = {
  BEFORE_OPEN: 'beforeOpen',
  OPENED: 'opened',
  BEFORE_CLOSE: 'beforeClose',
  CLOSED: 'closed',
  SHOW: 'AppExclusiveProductPopup',
  HIDE: 'AppExclusiveProductPopup',
};
export { EVENT };

export default {
  name: 'AppExclusiveProductPopup',
  components: {
    ButtonGroup,
    ButtonBox,
  },
  props: {
    message: {
      type: Object,
      default: () => ({
        heading: 'APP 전용 구매 상품입니다.',
        notice:
          '<p>APP에서만 구매 가능한 상품입니다.<br />롯데온 App에서 구매해 주세요.</p>',
        appStore: '롯데ON APP으로 가기',
        mobileWeb: '모바일웹으로 볼래요.',
      }),
    },
    event: {
      type: Object,
      default: () => ({ onClickAppStore: null, onClickMobileWeb: null }),
    },
  },
  watch: {
    message: {
      deep: true,
      handler() {},
    },
  },
  methods: {
    beforeOpen() {
      this.$emit(EVENT.BEFORE_OPEN);
    },
    opened() {
      this.$emit(EVENT.OPENED);
    },
    beforeClose() {
      this.$emit(EVENT.BEFORE_CLOSE);
    },
    closed() {
      this.$emit(EVENT.CLOSED);
    },
  },
};
</script>
<style lang="scss">
.popContents {
  &.team-popup-contents {
    border-radius: 10px;
    padding: 0;
  }
}
.team-popup-contents {
  &--heading {
    font-size: 17px;
    font-weight: bold;
    line-height: 1.29;
    letter-spacing: -0.4px;
  }
  &__notice-area {
    padding: 30px 20px;
    p {
      font-size: 16px;
      line-height: 1.44;
      letter-spacing: -0.27px;
    }
  }
  &__btn-confirm {
    display: block;
    width: 100%;
    padding: 20px;
    border-top: solid 1px #eee;
    text-align: center;
    font-size: 16px;
    line-height: 1.13;
    letter-spacing: -0.25px;
  }
  &__btn-group {
    padding: 0 20px 20px 20px;
  }
  &--btn-no-problem {
    font-size: 13px;
    line-height: 1.38;
    letter-spacing: -0.2px;
    text-decoration: underline;
    color: #757575;
  }
  &__type2 {
    padding: 24px 0 21px;
    .team-popup-contents__notice-area {
      padding: 10px 20px 16px;
      p {
        font-size: 12px;
        line-height: 1.33;
        letter-spacing: -0.2px;
        color: #757575;
      }
    }
    .team-popup-contents__btn-group {
      padding-bottom: 14px;
    }
  }
}
</style>
