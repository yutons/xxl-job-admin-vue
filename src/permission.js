/**
 * 全站权限配置
 * 
 */
import router from './router/router'
import store from './store'
import { getToken } from '@/util/auth'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import website from '@/config/website'
NProgress.configure({ showSpinner: false });
const lockPage = website.lockPage; //锁屏页
router.beforeEach((to, from, next) => {
  const meta = to.meta || {};
  const isMenu = meta.menu === undefined ? to.query.menu : meta.menu;
  store.commit('SET_IS_MENU', isMenu === undefined);
  if (getToken()) {
    if (store.getters.isLock && to.path != lockPage) { //如果系统激活锁屏，全部跳转到锁屏页
      next({ path: lockPage })
    } else if (to.path === '/login') { //如果登录成功访问登录页跳转到主页
      next({ path: '/' })
    } else {
      const meta = to.meta || {}
      const query = to.query || {}
      if (meta.target) {
        window.open(query.url.replace(/#/g, "&"))
        return
      } else if (meta.isTab !== false) {
        store.commit('ADD_TAG', {
          name: query.name || to.name,
          path: to.path,
          fullPath: to.fullPath,
          params: to.params,
          query: to.query,
          meta: meta
        });
      }
      //如果用户信息为空则获取用户信息，获取用户信息失败，跳转到登录页
      if (store.getters.roles.length === 0) {
        store.dispatch('GetUserInfo').then(() => {
          next()
        }).catch(() => {
          store.dispatch('FedLogOut').then(() => {
            next({ path: '/login' })
          })
        })
      } else {
        next()
      }
    }
  } else {
    //判断是否需要认证，没有登录访问去登录页
    if (meta.isAuth === false) {
      next()
    } else {
      next('/login')
    }
  }
})

router.afterEach(to => {
  NProgress.done();
  let title = router.$avueRouter.generateTitle(to)
  router.$avueRouter.setTitle(title);
  //根据当前的标签也获取label的值动态设置浏览器标题
  router.$avueRouter.setTitle(title);
});