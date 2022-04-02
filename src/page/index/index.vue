<template>
  <div class="avue-contail"
       :class="{'avue--collapse':isCollapse,}">
    <screenshot v-if="setting.screenshot"></screenshot>
    <!-- <setting></setting> -->
    <div class="avue-layout"
         :class="{'avue-layout--horizontal':isHorizontal}">
      <div class="avue-sidebar"
           v-show="validSidebar">
        <!-- 左侧导航栏 -->
        <logo />
        <sidebar />
      </div>
      <div class="avue-main">
        <!-- 顶部导航栏 -->
        <top ref="top" />
        <!-- 顶部标签卡 -->
        <tags />
        <transition name="fade-scale">
          <search class="avue-view"
                  v-show="isSearch"></search>
        </transition>
        <!-- 主体视图层 -->
        <div style="flex:auto;overflow-y:auto;overflow-x:hidden;"
             id="avue-view"
             v-show="!isSearch">
          <keep-alive>
            <router-view class="avue-view"
                         :key="key"
                         v-if="isRefresh" />
          </keep-alive>
        </div>
        <!-- <div class="avue-footer">
          <p class="copyright">© 2018-2021 Avue designed by smallwei</p>
        </div> -->
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from "vuex";
import tags from "./tags";
import screenshot from './screenshot';
import setting from './setting';
import search from "./search";
import logo from "./logo";
import top from "./top/";
import sidebar from "./sidebar/";
import admin from "@/util/admin";
import { validatenull } from "@/util/validate";
import index from '@/mixins/index'
export default {
  components: {
    top,
    logo,
    tags,
    search,
    sidebar,
    setting,
    screenshot
  },
  name: "index",
  mixins: [index],
  provide () {
    return {
      index: this
    };
  },
  data () {
    return {
      //搜索控制
      isSearch: false
    };
  },
  mounted () {
    this.init();
  },
  computed: {
    ...mapGetters(["isHorizontal", "setting", "isRefresh", "isCollapse", "menu"]),
    key () {
      return this.$route.path
    },
    validSidebar () {
      return !((this.$route.meta || {}).menu == false || (this.$route.query || {}).menu == 'false')
    }
  },
  props: [],
  methods: {
    // 屏幕检测
    init () {
      this.$store.commit("SET_SCREEN", admin.getScreen());
      window.onresize = () => {
        setTimeout(() => {
          this.$store.commit("SET_SCREEN", admin.getScreen());
        }, 0);
      };
    },
    //打开菜单
    openMenu (item = {}) {
      this.$store.dispatch("GetMenu", item.parentId).then(data => {
        if (data.length !== 0) {
          this.$router.$avueRouter.formatRoutes(data, true);
        }
        //当点击顶部菜单做的事件
        if (!validatenull(item)) {
          let itemActive = {},
            childItemActive = 0;
          //vue-router路由
          if (item.path) {
            itemActive = item;
          } else {
            if (this.menu[childItemActive].length == 0) {
              itemActive = this.menu[childItemActive];
            } else {
              itemActive = this.menu[childItemActive].children[childItemActive];
            }
          }
          this.$store.commit('SET_MENUID', item);
          this.$router.push({
            path: itemActive.path
          });
        }

      });
    },
  }
};
</script>