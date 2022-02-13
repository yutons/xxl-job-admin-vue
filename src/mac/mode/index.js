import Main from './index.vue';
import Vue from 'vue'
export default (function () {
  let MessageConstructor = Vue.extend(Main);
  const obj = function (opts = {}) {
    let options = {
      app: opts
    }
    let instance = new MessageConstructor({
      data: options
    });
    instance.vm = instance.$mount();
    document.body.appendChild(instance.vm.$el);
    instance.vm.isShow = true;
    instance.dom = instance.vm.$el;
    return instance.vm;
  }
  return obj
})()