/**
 * vue countdown
 * https://github.com/fengyuanchen/vue-countdown/blob/main/src/index.ts
 * https://fengyuanchen.github.io/vue-countdown/
 * https://joshua1988.github.io/vue-camp/reuse/v-slot.html#v-slot-%E1%84%80%E1%85%B5%E1%84%87%E1%85%A9%E1%86%AB-%E1%84%89%E1%85%A1%E1%84%8B%E1%85%AD%E1%86%BC-%E1%84%87%E1%85%A1%E1%86%BC%E1%84%87%E1%85%A5%E1%86%B8
 */
import Vue from 'vue';

const MILLISECONDS_SECOND = 1000;
const MILLISECONDS_MINUTE = 60 * MILLISECONDS_SECOND;
const MILLISECONDS_HOUR = 60 * MILLISECONDS_MINUTE;
const MILLISECONDS_DAY = 24 * MILLISECONDS_HOUR;
const EVENT_END = 'end';
const EVENT_START = 'start';
const EVENT_VISIBILITY_CHANGE = 'visibilitychange';

export default Vue.component('countdown-helper', {
  name: 'CountdownHelper',
  props: {
    serverTimestamp: {
      type: Number,
      default: 0,
    },
    targetTimestamp: {
      type: Number,
      default: 0,
      validator: value => value >= 0,
    },
  },
  emits: [EVENT_END, EVENT_START],
  data() {
    return {
      isCounting: false,
      endTime: 0,
      totalMilliseconds: 0,
      interval: 1000,
      intervalCode: 0,
      isDeviceTime: false,
      correctionTimestamp: 0,
    };
  },
  computed: {
    days() {
      return Math.floor(this.totalMilliseconds / MILLISECONDS_DAY);
    },
    hours() {
      return Math.floor(
        (this.totalMilliseconds % MILLISECONDS_DAY) / MILLISECONDS_HOUR,
      );
    },
    minutes() {
      return Math.floor(
        (this.totalMilliseconds % MILLISECONDS_HOUR) / MILLISECONDS_MINUTE,
      );
    },
    seconds() {
      return Math.floor(
        (this.totalMilliseconds % MILLISECONDS_MINUTE) / MILLISECONDS_SECOND,
      );
    },
    milliseconds() {
      return Math.floor(this.totalMilliseconds % MILLISECONDS_SECOND);
    },
    totalDays() {
      return this.days;
    },
    totalHours() {
      return Math.floor(this.totalMilliseconds / MILLISECONDS_HOUR);
    },
    totalMinutes() {
      return Math.floor(this.totalMilliseconds / MILLISECONDS_MINUTE);
    },
    totalSeconds() {
      return Math.floor(this.totalMilliseconds / MILLISECONDS_SECOND);
    },
  },

  watch: {
    $props: {
      deep: true,
      immediate: true,
      handler() {
        this.totalMilliseconds = this.targetTimestamp;
        this.correctionTimestamp = this.deviceNow(); // 현재 디바이스의 시간 기록 (시간 보정을 위한 값)
        this.isDeviceTime =
          !this.serverTimestamp ||
          Math.abs(this.serverTimestamp - this.correctionTimestamp) <= 60000; // 디바이스타임 사용가능 여부판단, 서버타임과 디바이스타임 시간차이 비교 (60000 밀리초 === 1 분)
        if (this.isDeviceTime) {
          this.endTime = this.correctionTimestamp + this.targetTimestamp;
        } else {
          this.endTime = this.serverTimestamp + this.targetTimestamp;
        }
        this.start();
      },
    },
  },

  mounted() {
    document.addEventListener(
      EVENT_VISIBILITY_CHANGE,
      this.handleVisibilityChange,
    );
  },

  beforeUnmount() {
    document.removeEventListener(
      EVENT_VISIBILITY_CHANGE,
      this.handleVisibilityChange,
    );
    this.pause();
  },

  methods: {
    // 타이머 시작
    start() {
      if (this.isCounting) {
        return;
      }
      this.isCounting = true;
      this.$emit(EVENT_START);
      if (document.visibilityState === 'visible') {
        this.continue();
      }
    },
    // 타이머 진행
    continue() {
      if (!this.isCounting) {
        return;
      }
      this.pause();
      // update
      this.intervalCode = setInterval(() => {
        if (this.isDeviceTime) {
          // 디바이스타임 기준
          this.totalMilliseconds = Math.max(0, this.endTime - this.deviceNow());
        } else {
          // 서버타임 기준
          const second = Date.now() - this.correctionTimestamp; // 타이머 시작시 디바이스 시간과 현재 디바이스 시간 비교 (시간 보정을 위한 값)
          //console.log("보정된 second", second);
          this.totalMilliseconds = Math.max(
            0,
            this.endTime - new Date(this.serverTimestamp + second).getTime(),
          );
        }
        if (Math.min(this.totalMilliseconds, this.interval) <= 0) {
          this.end();
        }
      }, this.interval);
    },
    // 타이머 정지
    pause() {
      clearInterval(this.intervalCode);
    },
    // 타이머 종료
    end() {
      if (!this.isCounting) {
        return;
      }

      this.pause();
      this.totalMilliseconds = 0;
      this.isCounting = false;

      this.$emit(EVENT_END);
    },
    // 디바이스 시간 반환
    deviceNow() {
      return Date.now();
    },
    // 화면 노출 이벤트 핸들러
    handleVisibilityChange() {
      switch (document.visibilityState) {
        case 'visible':
          this.continue();
          break;

        case 'hidden':
          this.pause();
          break;

        default:
      }
    },
    // 노출시간 '0' -> '00'
    padTo2Digits(num) {
      return num.toString().padStart(2, '0');
    },
  },
  render(createElement) {
    // 하위컴포넌트 <slot name="default"></slot>
    // 상위컴포넌트 v-slot:default=""
    return createElement(this.tag, [
      this.$scopedSlots.default(
        this.transform({
          days: this.days,
          hours: this.padTo2Digits(this.hours),
          minutes: this.padTo2Digits(this.minutes),
          seconds: this.padTo2Digits(this.seconds),
          milliseconds: this.milliseconds,
          totalDays: this.totalDays,
          totalHours: this.totalHours,
          totalMinutes: this.totalMinutes,
          totalSeconds: this.totalSeconds,
          totalMilliseconds: this.totalMilliseconds,
        }),
      ),
    ]);
  },
});
