/**
 * 비동기 컴포넌트
 * https://v2.ko.vuejs.org/v2/guide/components-dynamic-async.html#%EB%B9%84%EB%8F%99%EA%B8%B0-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8
 *
 * 각 컴포넌트는 비동기적으로 컴포넌트를 반환하는 함수로 정의할 수 있고, Vue.js 는 나중에 재렌더링할 경우를 위해 결과를 캐시로 저장합니다.
 * 비동기 컴포넌트를 만들 때 가장 중요한 점은 해결과 거절 콜백을 포함한 함수로 정의해야 한다는 것입니다.
 */

/**
 * 로딩 컴포넌트
 * Vue 2.3.0 이후 부터 고급 비동기 컴포넌트를 만들 수 있게 되었습니다.
 * 고급 컴포넌트에서는 컴포넌트가 로드되었을 때 표시되는 로딩 컴포넌트를 설정할 수 있습니다.
 */

export default function (resolve /*, reject*/) {
  setTimeout(function () {
    // 서버를 시뮬레이션해서 1,000ms 마다 작동하는 타임아웃입니다.
    resolve(
      /*컴포넌트를 파라미터로 반환*/ {
        template: `
                <div>
                    비동기 컴포넌트 입니다.
                </div>
            `,
      },
    );
  }, 1000);
}
