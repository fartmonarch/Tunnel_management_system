<template>
    <div class="slider-navs" :style="{ width: menuStore.isCollapse ? '64px' : '210px' }">
        <div v-show="systemStore.togglestore" class="logo">{{ menuStore.isCollapse ? '隧道' : '隧道工程项目' }}</div>
        <el-menu background-color="#304156" text-color="#fff" active-text-color="#ffd04b" :default-active="active"
            router :collapse="menuStore.isCollapse" class="el-menu-vertical-demo">

            <!-- 使用template来循环生成视图，不会增加页面结构 -->
            <template v-for="(item, index) in menuStore.menus" :key="index">
                <el-sub-menu v-if="item.children">
                    <template #title>
                        <el-icon>
                            <component :is="item.icon" />
                        </el-icon>
                        <span>{{ item.name }}</span>
                    </template>
                    <el-menu-item :index="childItem.path" v-for="(childItem, childIndex) in item.children"
                        :key="childIndex">
                        <span>{{ childItem.name }}</span>
                    </el-menu-item>
                </el-sub-menu>
                <el-menu-item v-else :index="item.path">
                    <el-icon>
                        <component :is="item.icon" />
                    </el-icon>
                    <span>{{ item.name }}</span>
                </el-menu-item>
            </template>


        </el-menu>
    </div>
</template>

<script setup>

import { ref } from "vue"
import { useMenuStore } from "@/stores/menuStore"
import { useSystemStore } from "@/stores/systemStore"

const systemStore = useSystemStore()

const active = ref("/")
const menuStore = useMenuStore()
// // 父传子接收开关状态
// const props = defineProps({
//     myToggle: {
//         type: Boolean,
//         default: false
//     }
// })

if (localStorage.getItem("active")) {
    active.value = localStorage.getItem("active")
}
</script>

<style scoped>
.slider-navs {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    width: 210px;
    background-color: #304156;
    transition: 0.3s ease-in;
}

.logo {
    width: 100%;
    height: 60px;
    line-height: 60px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    background-color: #2f517e;
}
</style>