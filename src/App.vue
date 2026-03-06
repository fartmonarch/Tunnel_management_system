<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
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
</style>
