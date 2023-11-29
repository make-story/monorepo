import Vue from 'vue';

import './assets/css/index.css';
import App from './App.vue';
import { basicTest, vuexTest } from './basics';

Vue.config.productionTip = false;
const eventBus = (Vue.prototype.EventBus = new Vue());

new Vue({
  render: h => h(App),
}).$mount('#app');
new Vue(basicTest);
new Vue(vuexTest);

export { eventBus };
