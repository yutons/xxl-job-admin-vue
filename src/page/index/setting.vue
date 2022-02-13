<template>
  <div class="setting">
    <el-button class="setting"
               type="primary"
               :class="{'setting--show':show}"
               @click="show=!show"
               :icon="show?'el-icon-close':'el-icon-s-tools'"></el-button>
    <el-drawer append-to-body
               class="setting-panel"
               :with-header="false"
               :visible.sync="show"
               size="320px">
      <h5>导航模式</h5>
      <div class="setting-checkbox">
        <el-tooltip class="item"
                    effect="dark"
                    content="侧边菜单布局"
                    placement="top">
          <div @click="setting.sidebar='vertical'"
               class="setting-checkbox-item setting-checkbox-item--side">
            <i v-if="!isHorizontal"
               class="el-icon-check setting-checkbox--check">
            </i>
          </div>
        </el-tooltip>
        <el-tooltip class="item"
                    effect="dark"
                    content="顶部菜单布局"
                    placement="top">
          <div @click="setting.sidebar='horizontal'"
               class="setting-checkbox-item setting-checkbox-item--top">
            <i v-if="isHorizontal"
               class="el-icon-check setting-checkbox--check">
            </i>
          </div>
        </el-tooltip>
      </div>
      <h5>页面布局</h5>
      <div class="setting-checkbox">
        <div class="setting-item"
             v-for="(item,index) in list1"
             :key="index">
          {{item.label}}:
          <el-checkbox v-model="setting[item.value]"
                       size="small">
          </el-checkbox>
        </div>
      </div>
      <h5>功能调试</h5>
      <div class="setting-checkbox">
        <div class="setting-item"
             v-for="(item,index) in list2"
             :key="index">
          {{item.label}}:
          <el-checkbox v-model="setting[item.value]"
                       size="small">
          </el-checkbox>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data () {
    return {
      show: false,
      list1: [{
        label: '导航标签',
        value: 'tag'
      }, {
        label: '菜单折叠',
        value: 'collapse'
      }, {
        label: '菜单搜索',
        value: 'search'
      }, {
        label: '屏幕全屏',
        value: 'fullscren'
      }, {
        label: '主题选择',
        value: 'theme'
      }, {
        label: '主题颜色',
        value: 'color'
      }, {
        label: '顶部菜单',
        value: 'menu'
      }],
      list2: [{
        label: '意见反馈',
        value: 'screenshot'
      }, {
        label: '日志调试',
        value: 'debug'
      }, {
        label: '屏幕锁定',
        value: 'lock'
      }]
    }
  },
  computed: {
    ...mapGetters(["isHorizontal", 'setting']),
  }
}
</script>


<style lang="scss" >
.setting {
  position: fixed;
  top: 50%;
  right: -2px;
  z-index: 2048;
  transition: right 0.3s;
  &--show {
    right: 320px;
  }
  &-panel {
    .el-drawer__body {
      padding: 0 20px;
    }
  }
  &-item {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    margin-bottom: 8px;
  }
  &-checkbox {
    margin: 0 auto 20px 0;
    &--check {
      position: absolute;
      color: #409eff;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    &-item {
      display: inline-block;
      position: relative;
      width: 44px;
      height: 36px;
      margin-right: 16px;
      overflow: hidden;
      background-color: #f0f2f5;
      border-radius: 4px;
      box-shadow: 0 1px 2.5px 0 rgba(0, 0, 0, 0.18);
      cursor: pointer;
      &:before {
        position: absolute;
        top: 0;
        left: 0;
        width: 33%;
        height: 100%;
        background-color: #fff;
        content: "";
      }
      &:after {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 25%;
        background-color: #fff;
        content: "";
      }
      &--side {
        &:before {
          z-index: 1;
          background-color: #001529;
          content: "";
        }
        &:after {
          background-color: #fff;
        }
      }
      &--top {
        &:after {
          background-color: #001529;
        }
      }
    }
  }
}
</style>