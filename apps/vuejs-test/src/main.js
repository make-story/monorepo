import Vue from 'vue';

import App from './App.vue';
import { basicTest, vuexTest } from './basics';

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
new Vue(basicTest);
new Vue(vuexTest);
