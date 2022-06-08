import { setToken, removeToken } from '@/util/auth'
import { setStore, getStore } from '@/util/store'
import { encryption, deepClone } from '@/util/util'
import { loginByUsername, getUserInfo, getMenu, getTopMenu, logout, refeshToken } from '@/api/user'
import { formatPath } from '@/router/avue-router'
const user = {
  state: {
    userInfo: getStore({ name: 'userInfo' }) || {},
    permission: {},
    roles: [],
    menuId: {},
    menu: getStore({ name: 'menu' }) || [],
    menuAll: getStore({ name: 'menuAll' }) || [],
    token: getStore({ name: 'token' }) || '',
  },
  actions: {
    //根据用户名登录
    LoginByUsername ({ commit }, userInfo = {}) {
      return new Promise((resolve) => {
        loginByUsername(userInfo.username, userInfo.password, userInfo.ifRemember).then(res => {
		  const data = res.data.data;
		  userInfo.password = "";
          commit('SET_USERIFNO', userInfo);
          commit('SET_TOKEN', data);
          commit('DEL_ALL_TAG');
          commit('CLEAR_LOCK');
          resolve();
        })
      })
    },
    //根据手机号登录
    LoginByPhone ({ commit }, userInfo) {
      return new Promise((resolve) => {
        loginByUsername(userInfo.phone, userInfo.code).then(res => {
          const data = res.data.data;
          commit('SET_TOKEN', data);
          commit('DEL_ALL_TAG');
          commit('CLEAR_LOCK');
          resolve();
        })
      })
    },
    GetUserInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        getUserInfo().then((res) => {
          const data = res.data.data;
          commit('SET_USERIFNO', data.userInfo);
          commit('SET_ROLES', data.roles);
          commit('SET_PERMISSION', data.permission)
          resolve(data);
        }).catch(err => {
          reject(err);
        })
      })
    },
    //刷新token
    RefeshToken ({ state, commit }) {
      return new Promise((resolve, reject) => {
        refeshToken(state.refeshToken).then(res => {
          const data = res.data.data;
          commit('SET_TOKEN', data);
          resolve(data);
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    LogOut ({ commit }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          commit('SET_TOKEN', '')
          commit('SET_USERIFNO', '')
          commit('SET_MENUALL_NULL', []);
          commit('SET_MENU', [])
          commit('SET_ROLES', [])
          commit('DEL_ALL_TAG', []);
          commit('CLEAR_LOCK');
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    //注销session
    FedLogOut ({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_USERIFNO', '')
        commit('SET_MENUALL_NULL', []);
        commit('SET_MENU', [])
        commit('SET_ROLES', [])
        commit('DEL_ALL_TAG', []);
        commit('CLEAR_LOCK');
        removeToken()
        resolve()
      })
    },
    GetTopMenu () {
      return new Promise(resolve => {
        getTopMenu().then((res) => {
          const data = res.data.data || []
          resolve(data)
        })
      })
    },
    //获取系统菜单
    GetMenu ({ commit }, parentId) {
      return new Promise(resolve => {
        getMenu(parentId).then((res) => {
          const data = res.data.data
          let menu = deepClone(data);
          menu.forEach(ele => formatPath(ele, true));
          commit('SET_MENUALL', menu)
          commit('SET_MENU', menu)
          resolve(menu)
        })
      })
    },
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      setToken(token)
      state.token = token;
      setStore({ name: 'token', content: state.token })
    },
    SET_MENUID (state, menuId) {
      state.menuId = menuId;
    },
    SET_USERIFNO: (state, userInfo) => {
      state.userInfo = userInfo;
      setStore({ name: 'userInfo', content: state.userInfo })
    },
    SET_MENUALL: (state, menuAll) => {
      let menu = state.menuAll;
      menuAll.forEach(ele => {
        let index = menu.findIndex(item => item.path == ele.path)
        if (index == -1) {
          menu.push(ele);
        } else {
          menu[index] = ele;
        }
      })
      state.menuAll = menu
      setStore({ name: 'menuAll', content: state.menuAll })
    },
    SET_MENUALL_NULL: (state) => {
      state.menuAll = []
      setStore({ name: 'menuAll', content: state.menuAll })
    },
    SET_MENU: (state, menu) => {
      state.menu = menu
      setStore({ name: 'menu', content: state.menu })
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    SET_PERMISSION: (state, permission) => {
      state.permission = {};
      permission.forEach(ele => {
        state.permission[ele] = true;
      });
    }
  }

}
export default user