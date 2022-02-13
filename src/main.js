import Vue from 'vue';
import axios from './router/axios';
import VueAxios from 'vue-axios';
import App from './App';
import router from './router/router';
import './permission'; // 权限
import './error'; // 日志
import './cache';//页面缓冲
import store from './store';
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import AVUE from '@smallwei/avue'
import '@smallwei/avue/lib/index.css'
import i18n from './lang' // Internationalization
import './styles/common.scss';
import basicBlock from './components/basic-block/main'
import basicContainer from './components/basic-container/main'
import crudCommon from '@/mixins/crud.js'
import dayjs from 'dayjs'
import website from '@/config/website'
window.$crudCommon = crudCommon
Vue.prototype.$dayjs = dayjs
Vue.prototype.website = website;
Vue.config.productionTip = false;
Vue.use(VueAxios, axios)
Vue.use(Element, {
  i18n: (key, value) => i18n.t(key, value)
})
Vue.use(AVUE, {
  i18n: (key, value) => i18n.t(key, value)
})
//注册全局容器
Vue.component('basicContainer', basicContainer)
Vue.component('basicBlock', basicBlock)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')