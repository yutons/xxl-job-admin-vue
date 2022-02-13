import Layout from '@/page/index/'
import Store from '@/store/'
export default [{
  path: '/wel',
  component: () => Store.getters.isMacOs ? import('@/mac/index.vue') : import('@/page/index/index.vue'),
  redirect: '/wel/index',
  children: [{
    path: 'index',
    name: '首页',
    meta: {
      i18n: 'dashboard'
    },
    component: () =>
      import( /* webpackChunkName: "views" */ '@/views/wel/index')
  }, {
    path: 'more',
    name: '控制台',
    meta: {
      i18n: 'more',
      menu: false,
    },
    component: () =>
      import( /* webpackChunkName: "views" */ '@/views/wel/dashboard.vue')
  }]
}, {
  path: '/form-detail',
  component: Layout,
  children: [{
    path: 'index',
    name: '详情页',
    meta: {
      i18n: 'detail'
    },
    component: () =>
      import( /* webpackChunkName: "views" */ '@/views/util/form-detail')
  }]
}, {
  path: '/info',
  component: Layout,
  redirect: '/info/index',
  children: [{
    path: 'index',
    name: '个人信息',
    meta: {
      i18n: 'info'
    },
    component: () =>
      import( /* webpackChunkName: "views" */ '@/views/user/info')
  }, {
    path: 'setting',
    name: '个人设置',
    meta: {
      i18n: 'setting'
    },
    component: () =>
      import( /* webpackChunkName: "views" */ '@/views/user/setting')
  }]
}, {
  path: '/query',
  name: '参数',
  component: Layout,
  children: [{
    path: ':params',
    name: '参数传递',
    meta: {
      activeMenu: '/params'
    },
    component: () =>
      import( /* webpackChunkName: "views" */ '@/views/util/params')
  }]
}, {
  path: '/tabs',
  redirect: '/tabs/index',
  component: Layout,
  children: [{
    name: '测试页面',
    meta: {
      i18n: 'test',
      isTab: false
    },
    path: 'index',
    component: () =>
      import( /* webpackChunkName: "views" */ '@/views/util/test')
  }]

}, {
  path: '/test',
  redirect: '/test/index',
  component: Layout,
  children: [{
    name: '测试页面',
    meta: {
      i18n: 'test'
    },
    path: 'index',
    component: () =>
      import( /* webpackChunkName: "views" */ '@/views/util/test')
  }]

}, {
  path: '/detail/create',
  component: Layout,
  children: [{
    path: '',
    name: (query) => {
      return query.id ? "编辑页面" : "新增页面";
    },
    meta: {
      activeMenu: '/detail'
    },
    component: () =>
      import( /* webpackChunkName: "views" */ '@/views/util/detail.vue'),
  }]
}]