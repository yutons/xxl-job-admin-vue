/**
 * 全站路由配置
 *
 * meta参数说明
 * keepAlive是否缓冲页面
 * isTab是否加入到tag导航
 * isAuth是否需要授权
 */
import Vue from 'vue'
import VueRouter from 'vue-router';
import PageRouter from './page/'
import ViewsRouter from './views/'
import AvueRouter from './avue-router';
import i18n from '@/lang'// Internationalization
import Store from '../store/';
Vue.use(VueRouter)
const Router = new VueRouter({
  base: process.env.VUE_APP_BASE_URL,
  mode: 'hash',
  routes: [...PageRouter, ...ViewsRouter]
})
AvueRouter.install({
  store: Store,
  router: Router,
  i18n: i18n,
  keepAlive: false,
});
Router.$avueRouter.formatRoutes(Store.state.user.menuAll, true);
export default Router