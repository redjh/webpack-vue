import Vue from 'vue';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import App from './App.vue';
import router from './router';
import './assets/styles/index.css';
import './assets/styles/index.less';

Vue.use(Antd);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
