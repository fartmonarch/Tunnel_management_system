<script setup>
import { RouterView } from 'vue-router'
import { computed } from "vue"
import { useI18n } from "vue-i18n"

import zhCn from "element-plus/es/locale/lang/zh-cn"
import en from "element-plus/es/locale/lang/en"

const { locale } = useI18n()

const elementLocale = computed(() => {
  return locale.value === "zh" ? zhCn : en
})
</script>

<template>
  <el-config-provider :locale="elementLocale">
    <router-view />
  </el-config-provider>
</template>

<style>
/* 公共样式 */

body,
html,
#app {
  height: 100%;
  width: 100%;
  margin: 0;
  /* 关键：清除浏览器默认外边距 */
  padding: 0;
  /* 关键：清除浏览器默认内边距 */
  overflow-x: hidden;
  /* 强制隐藏横向外层的滚动条 */
}

* {
  box-sizing: border-box;
  /* 让边框和内边距不撑大盒子 */
}

/* 去掉elemnet menu的右边框 */
.el-menu {
  border-right: 0 !important;
}

/* dialog头部 */
.el-dialog__header {
  background: #304156;
  color: #fff;
  padding: 15px 20px;
  margin: -20px -20px 20px -20px;
}

.el-dialog__header span {
  color: #fff;
  font-weight: 600;
}

.el-dialog__headerbtn {
  top: 18px;
}

/* body */
.el-dialog__body {
  padding: 0 20px 20px 20px;
}

/* footer */
.dialog-footer {
  text-align: center;
}

/* tree 选中样式修改 */
.is-current .el-tree-node__content {
  background-color: #337ecc !important;
  color: #fff;
}
</style>
