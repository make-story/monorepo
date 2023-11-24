//import Vue from 'vue';

// https://v2.ko.vuejs.org/v2/guide/filters.html
// 출력 필터는 마크업에서 값이 표기되기 전에 값을 형식화하도록 도와줍니다.
// 일반적인 출력 필터 형식은 {{property | filter}} 입니다.

export default {
  template: `
        <div>
            {{price | formatNumber}}
        </div>
    `,
  data() {
    return {
      price: 1000,
    };
  },
  filters: {
    formatNumber: function (num) {
      if (!parseInt(num)) {
        return '';
      } else {
        return `가격: ${num}`;
      }
    },
  },
};
