/**
 * 全局配置文件
 */
export default {
  title: "任务调度平台",
  logo: "JOB",
  key: 'avue',//配置主键,目前用于存储
  indexTitle: 'XXL-JOB 任务调度平台',
  lockPage: '/lock',
  tokenTime: 6000,//token过期时间
  Authorization: 'Authorization',
  //http的status默认放行不才用统一处理的,
  statusWhiteList: [400],
  //配置首页不可关闭
  isFirstPage: false,
  setting: {
    sidebar: 'vertical',
    tag: true,
    debug: false,
    collapse: true,
    search: false,
    lock: false,
    screenshot: false,
    fullscren: false,
    theme: false,
    menu: true,
    color: false,
  },
  fistPage: {
    name: "首页",
    path: "/wel/index"
  },
  //配置菜单的属性
  menu: {
    iconDefault: 'icon-caidan',
    label: 'label',
    path: 'path',
    icon: 'icon',
    children: 'children',
    query: 'query',
    href: 'href',
    meta: 'meta'
  }
}