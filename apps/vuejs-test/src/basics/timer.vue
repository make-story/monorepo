<template>
  <div>{{ hours }}:{{ minutes }}:{{ seconds }}</div>
</template>
<script>
const MILLISECONDS_SECOND = 1000;
const MILLISECONDS_MINUTE = 60 * MILLISECONDS_SECOND;
const MILLISECONDS_HOUR = 60 * MILLISECONDS_MINUTE;
const MILLISECONDS_DAY = 24 * MILLISECONDS_HOUR;
const EVENT_VISIBILITY_CHANGE = 'visibilitychange';

export default {
  name: 'Timer',
  components: {},
  props: {
    currentTime: {
      type: Number,
      default: Date.now(),
    },
    targetTime: {
      type: Number,
      default: Date.now(),
    },
  },
  data() {
    return {
      isCounting: false,
      endTime: 0,
      totalMilliseconds: 0,
      interval: 1000,
      intervalCode: 0,
      correctionTimestamp: null,
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
  },
  watch: {
    $props: {
      deep: true,
      immediate: true,
      handler() {
        this.totalMilliseconds = this.targetTime;
        this.endTime = this.currentTime + this.targetTime;
        this.start();
      },
    },
  },
  created() {},
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
    start() {
      if (this.isCounting) {
        return;
      }
      this.isCounting = true;
      if (document.visibilityState === 'visible') {
        this.correctionTimestamp = Date.now(); // 현재 디바이스의 시간 기록 (시간 보정을 위한 값)
        this.continue();
      }
    },
    continue() {
      if (!this.isCounting) {
        return;
      }
      this.pause();
      this.intervalCode = setInterval(() => {
        const second = Date.now() - this.correctionTimestamp; // 타이머 시작시 디바이스 시간과 현재 디바이스 시간 비교 (시간 보정을 위한 값)
        console.log('보정된 second', second);
        this.totalMilliseconds = Math.max(
          0,
          this.endTime - new Date(this.currentTime + second).getTime(),
        );
      }, this.interval);
    },
    pause() {
      clearInterval(this.intervalCode);
    },
    end() {
      if (!this.counting) {
        return;
      }

      this.pause();
      this.totalMilliseconds = 0;
      this.counting = false;
    },
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

    onCountdownEnd() {
      console.log('onCountdownEnd');
    },
    transformSlotProps(props) {
      const formattedProps = {};

      Object.entries(props).forEach(([key, value]) => {
        formattedProps[key] = value < 10 ? `0${value}` : String(value);
      });

      return formattedProps;
    },
  },
};
</script>

<style lang="scss" scoped></style>
