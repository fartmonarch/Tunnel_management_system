<template>
    <div class="layout-container">
        <Drawsettings @onToggleEvent="getToggleEvent" />
        <SliderNavs :myToggle="myToggle" />
        <div class="right-container" :style="{ marginLeft: menuStore.isCollapse ? '64px' : '210px' }">
            <TopNavs />
            <div class="content">
                <router-view></router-view>
            </div>

        </div>

    </div>
</template>

<script setup>

import SliderNavs from "@/components/SliderNavs/index.vue"
import TopNavs from "@/components/TopNavs/index.vue"
import { useMenuStore } from "@/stores/menuStore";
import { useLoginStore } from "@/stores/loginStore";
import { onMounted, ref } from "vue"
import api from "@/api/index.js"
import { useRouter } from "vue-router";
import manageRouter from "@/router/dynamicRouter.js"
import Drawsettings from "@/components/DrawerSettings/index.vue"

const menuStore = useMenuStore()
const loginStore = useLoginStore()
const router = useRouter()
const myToggle = ref(false) // 定义一个响应式变量来存储开关状态
const getToggleEvent = (data) => {
    myToggle.value = data; // 传输新的值
}

/**
 * 用户权限的数据获取
 */
onMounted(() => {
    api.getRouter({
        user: loginStore.permission
    }).then(res => {
        if (res.data.status === 200) {
            menuStore.menus = res.data.menuData.menus;
            // 判断当前用户权限
            if (loginStore.permission === "admin") {
                router.addRoute('layout', manageRouter)
            }

        }
    }).catch(err => {
        console.log(err);
    })
})
</script>

<style scoped>
.right-container {
    margin-left: 210px;
    transition: 0.3s ease-in;
}

.content {
    padding: 10px;
}
</style>