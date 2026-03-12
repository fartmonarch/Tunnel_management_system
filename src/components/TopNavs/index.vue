<template>
    <div class="nav">
        <div class="toggle-menu">
            <div class="toggle-menu-toggle">
                <el-icon v-if="menuStore.isCollapse" class="icon" @click="closeMenu(false)">
                    <Expand />
                </el-icon>
                <el-icon v-else="menuStore.isCollapse" class="icon" @click="openMenu(true)">
                    <Fold />
                </el-icon>
            </div>

            <div class="toggle-menu-breadcrumb">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item>{{ $t("message.navs") }}</el-breadcrumb-item>
                    <el-breadcrumb-item>{{ menuStore.breadcrumb }}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="lang">
                <el-dropdown>
                    <span class="el-dropdown-link">
                        语言切换
                        <el-icon class="el-icon--right">
                            <arrow-down />
                        </el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-item @click="changeLang('zh')">中文</el-dropdown-item>
                        <el-dropdown-item @click="changeLang('en')">英文</el-dropdown-item>
                    </template>
                </el-dropdown>
            </div>
            <!-- 下拉菜单 -->
            <div class="user">
                <el-dropdown>
                    <span class="el-dropdown-link">
                        {{ loginStore.username }}
                        <el-icon class="el-icon--right">
                            <arrow-down />
                        </el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item>
                                <router-link to="/usercenter">
                                    个人中心
                                </router-link>
                            </el-dropdown-item>
                            <el-dropdown-item @click="logoutHandler">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { useLoginStore } from "@/stores/loginStore"
import { useRouter } from "vue-router"
import { useMenuStore } from "@/stores/menuStore"

const { locale } = useI18n()  // 获取 locale 对象
const loginStore = useLoginStore()
const router = useRouter()
const menuStore = useMenuStore()
/**
 * 退出登录按钮
 */
const logoutHandler = () => {
    // 存储信息清空并且回到登录页面
    loginStore.token = ""
    loginStore.permissions = ""
    loginStore.username = ""
    router.push("/login")
}

/**
 * 关闭侧边菜单栏
 */
const closeMenu = (flag) => {
    menuStore.isCollapse = flag
}

const openMenu = (flag) => {
    menuStore.isCollapse = flag
}

/**
 * 切换语言
 */
const changeLang = (lang) => {
    // 更新 i18n 的语言
    locale.value = lang  // 如果是 'zh' 或 'en'
    localStorage.setItem("lang", lang)
}
</script>

<style scoped>
.nav {
    width: 100%;
    height: 60px;
    background-color: #fff;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 12%), 0 0 3px 0 rgb(0 0 0 / 4%);
}

.toggle-menu {
    padding: 17.5px;
    padding-left: 10px;
}

.icon {
    font-size: 25px;
}

.toggle-menu-toggle {
    float: left;
}

.toggle-menu-breadcrumb {
    float: left;
    line-height: 60px;
    margin-top: 6px;
    margin-left: 20px;
}

.user {
    font-size: 15px;
    position: absolute;
    right: 20px;
    top: 20px;
}

.lang {
    float: right;
    margin-right: 120px;
    margin-top: 5px;
}
</style>