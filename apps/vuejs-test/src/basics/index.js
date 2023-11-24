/*
-
Vue 스타일 가이드
https://kr.vuejs.org/v2/style-guide/index.html
*/

import AsyncComponent from './async-component';
import CustomDirective from './custom-directive';
import CustomEvent from './custom-event';
import Directive from './directive';
import DynamicComponent from './dynamic-component';
//import EventBinding from './event-binding';
import Filters from './filters';
import LifeCycle from './life-cycle-hooks';
import Mixin from './mixin-component';
import Property from './property';
import Props from './props';
//import {} from './reactivity';
import SingleFileComponent from './single-file-component.vue';
import Slot from './slot';
//import {} from './template';
import { store as moduleStore } from './store/store';
import { store as singleStore } from './vuex-store';
import VuexHelper from './vuex-helper';
//import { mapGetters } from 'vuex';

export const basicTest = {
  el: '#basic',
  template: `
    <div class="group-line">
      <div>
        <h1>Lifecycle 테스트</h1>
        <lifecycle-test></lifecycle-test>
      </div>
      <div>
        <h1>Property 테스트</h1>
        <property-test></property-test>
      </div>
      <div>
        <h1>Directive 테스트</h1>
        <directive-test></directive-test>
      </div>
      <div>
        <h1>Custom Directive 테스트</h1>
        <custom-directive></custom-directive>
      </div>
      <div>
        <h1>Filter 테스트</h1>
        <filter-test></filter-test>
      </div>
      <div>
        <h1>커스텀 이벤트 테스트</h1>
        {{counter}}<br />
        <button v-on:click="incrementCounter">부모 컴포넌트에서 카운터 증가</button>
        <!-- 자식 컴포넌트로 부터 이벤트 수신 //-->
        <custom-event v-on:increment-me="incrementCounter" :my-counter.sync="counter"></custom-event>
      </div>
      <div>
        <h1>Props 테스트</h1>
        <props-test str="YSM" :num="counter"></props-test>
      </div>
      <div>
        <h1>싱글 파일 컴포넌트 테스트</h1>
        <single-file-component></single-file-component>
      </div>
      <div>
        <h1>슬롯(slot) 테스트</h1>
        <slot-test :author="author" :title="title" :books="books">
          <p>{{header}}</p>

          <!-- 지정 slot //-->
          <label for="titleSlot" slot="titleSlot">{{titleLabel}}</label>
          <label for="authorSlot" slot="authorSlot">{{authorLabel}}</label>

          <!-- 범위 slot //-->
          <template slot="book" slot-scope="props">
            <!-- {{props.text.title}} 이 {{book.title}} 과 같은 의미 //-->
            <h2>
              <i>{{props.text.title}}</i>
              <small>by: {{props.text.author}}</small>
            </h2>
          </template>
        </slot-test>
      </div>
      <div>
        <h1>동적 컴포넌트 테스트</h1>
        <dynamic-component></dynamic-component>
      </div>
      <div>
        <h1>비동기 컴포넌트 테스트</h1>
        <async-component></async-component>
      </div>
      <div>
        <h1>믹스인 컴포넌트 테스트</h1>
        <mixin-component></mixin-component>
      </div>
      <div>
        <h1>Vuex Helper</h1>
        <vuex-helper></vuex-helper>
      </div>
    </div>
  `,
  store: moduleStore,
  data() {
    return {
      counter: 0,
      title: '제목:',
      author: '저자:',
      header: 'HEADER',
      titleLabel: '제목:',
      authorLabel: '저자:',
      books: [
        { author: 'YSM1', title: 'TITLE1' },
        { author: 'YSM2', title: 'TITLE2' },
        { author: 'YSM3', title: 'TITLE3' },
        { author: 'YSM4', title: 'TITLE4' },
      ],
    };
  },
  components: {
    'lifecycle-test': LifeCycle,
    'property-test': Property,
    'directive-test': Directive,
    'filter-test': Filters,
    'props-test': Props,
    'single-file-component': SingleFileComponent,
    'slot-test': Slot,
    'custom-directive': CustomDirective,
    'custom-event': CustomEvent,
    'async-component': AsyncComponent,
    'dynamic-component': DynamicComponent,
    'mixin-component': Mixin,
    'vuex-helper': VuexHelper,
  },
  created() {
    // vuex 스토어 테스트
    this.$store.commit('products/increment', 1);
    console.log(this.$store.getters['products/getTest']?.data);
  },
  methods: {
    // 커스텀 이벤트 테스트
    incrementCounter() {
      this.counter++;
    },
  },
};

export const vuexTest = {
  el: '#vuex-store',
  template: `
    <div class="group-line">
      <div>
        <h1>{{header}}</h1>
        <h2>{{welcome}}</h2>
        <h3>{{counter}}</h3>
        <button @click="increment">Press Me</button>
      </div>
    </div>
  `,
  // "store" 옵션을 사용하여 저장소를 제공하십시오.
  // 그러면 모든 하위 컴포넌트에 저장소 인스턴스가 삽입됩니다.
  //store: singleStore,
  data() {
    return {
      header: 'Vuex App',
    };
  },
  computed: {
    // vuex 테스트
    welcome() {
      // store 직접 접근
      //return singleStore.state.msg;

      // getters 통해 접근
      return singleStore.getters.msg;
    },
    // vuex 테스트
    counter() {
      // store 직접 접근
      //return singleStore.state.count;

      // getters 통해 접근
      return singleStore.getters.count;
    },
    // 또는 Vuex 헬퍼 사용
    /*...mapGetters([
      'count'
    ]),*/
  },
  methods: {
    // vuex 테스트
    increment() {
      // Vuex increment 뮤테이션(store 의 mutations 에 위치한 것)을 트리거 합니다. - 동기적 방식
      //store.commit('increment', 10);

      // increment 액션(store 의 actions 에 위치한 것)을 디스패치 합니다. - 비동기적 방식
      store.dispatch('increment', 10);
    },
  },
};
