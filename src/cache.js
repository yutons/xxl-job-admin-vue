import Vue from 'vue'
import store from './store';
Vue.mixin({
  beforeRouteLeave: function (to, from, next) {
    let list = store.state.tags.tagList
    if (this.$vnode) {
      if (this.$vnode.parent && this.$vnode.parent.componentInstance && this.$vnode.parent.componentInstance.cache) {
        if (this.$vnode.componentOptions) {
          var cache = this.$vnode.parent.componentInstance.cache;
          var keys = this.$vnode.parent.componentInstance.keys;
          keys.forEach(key => {
            let t = {}
            let i = list.findIndex(tag => {
              if (key.indexOf(tag.path) !== -1) {
                t = tag;
                return true;
              }
              return false;
            })
            let meta = t.meta || {}
            if (i == -1 || meta.keepAlive == false) {
              keys.splice(i, 1);
              delete cache[key];
            }
          })
        }
      }
    }
    next();
  }
});