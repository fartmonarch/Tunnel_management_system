<template>
    <div class="login-wrapper">
        <div class="bg-decoration"></div>

        <div class="login-card">
            <el-form class="login-form" size="large" :model="user">
                <div class="title-container">
                    <h3 class="title">隧道后台管理系统</h3>
                    <p class="subtitle">Tunnel Management System</p>
                </div>

                <el-form-item prop="username">
                    <el-input :prefix-icon="User" v-model="user.username" placeholder="请输入用户名" class="tech-input" />
                </el-form-item>

                <el-form-item prop="password">
                    <el-input :prefix-icon="Lock" type="password" v-model="user.password" placeholder="请输入密码"
                        show-password class="tech-input" />
                </el-form-item>

                <el-button class="submit-btn" type="primary" @click="handleLogin">
                    立即登录
                </el-button>
            </el-form>
        </div>
    </div>
</template>

<script setup>
import { reactive } from "vue"
import { User, Lock } from "@element-plus/icons-vue"
import api from "@/api"
import { useLoginStore } from "@/stores/loginStore.js"
import { useRouter } from "vue-router"

const router = useRouter()

// 登录仓库对象
const loginStore = useLoginStore()


// 声明用户信息
const user = reactive({
    username: "",
    password: ""
})

// 登录事件
const handleLogin = () => {
    console.log("登录信息：", user)
    api.getLogin({
        username: user.username,
        password: user.password
    }).then(res => {
        if (res.data.status === 200) {
            loginStore.token = res.data.token // 存储 token
            loginStore.username = user.username // 存储用户名
            loginStore.permission = res.data.permission // 存储权限
            router.push("/") // 登录成功后跳转到主页
        } else {
            // 失败给出提示
            ElMessage.error(res.data.msg)
        }
    })
}
</script>

<style scoped>
/* 全局背景 */
.login-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: radial-gradient(circle at center, #1a2a44 0%, #0a0f18 100%);
    overflow: hidden;
    position: relative;
}

/* 科技背景装饰 */
.bg-decoration {
    position: absolute;
    width: 150%;
    height: 150%;
    background-image:
        linear-gradient(rgba(0, 242, 255, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0, 242, 255, 0.03) 1px, transparent 1px);
    background-size: 50px 50px;
    transform: rotate(15deg);
    z-index: 0;
    animation: bgMove 60s linear infinite;
}

@keyframes bgMove {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

/* 登录卡片 - 玻璃拟态 */
.login-card {
    z-index: 1;
    width: 420px;
    padding: 50px 40px;
    background: rgba(255, 255, 255, 0.04);
    backdrop-filter: blur(15px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
}

/* 标题设计 */
.title-container {
    text-align: center;
    margin-bottom: 40px;
}

.title {
    font-size: 26px;
    font-weight: 600;
    color: #fff;
    letter-spacing: 2px;
    margin: 0;
    text-shadow: 0 0 10px rgba(0, 242, 255, 0.3);
}

.subtitle {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.4);
    text-transform: uppercase;
    margin-top: 8px;
    letter-spacing: 1px;
}

/* 输入框样式定制 */
:deep(.tech-input .el-input__wrapper) {
    background-color: rgba(255, 255, 255, 0.05) !important;
    box-shadow: none !important;
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.3s;
}

:deep(.tech-input .el-input__wrapper.is-focus) {
    border-color: #00f2ff;
    box-shadow: 0 0 8px rgba(0, 242, 255, 0.2) !important;
}

:deep(.tech-input .el-input__inner) {
    color: #fff !important;
}

/* 按钮样式 */
.submit-btn {
    width: 100%;
    height: 48px;
    margin-top: 20px;
    font-size: 16px;
    font-weight: bold;
    background: linear-gradient(90deg, #00c6ff 0%, #0072ff 100%);
    border: none;
    border-radius: 8px;
    transition: all 0.3s;
}

.submit-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 114, 255, 0.4);
    filter: brightness(1.1);
}

.submit-btn:active {
    transform: translateY(0);
}
</style>