<template>
    <div class="setting">
        <!-- 控制抽屉按钮 -->
        <el-button size="large" type="primary" @click=" drawer = true">
            <el-icon class="setting-icon">
                <Setting />
            </el-icon>
        </el-button>
        <!-- 抽屉 -->
        <el-drawer v-model="drawer" title="系统设置" size="20%">
            <span class="logo-show">logo显示与隐藏</span>
            <el-switch v-model="systemStore.togglestore" />
        </el-drawer>
    </div>
</template>
<script setup>
import { ref, watch } from 'vue';
import { useSystemStore } from "@/stores/systemStore"

// emit是用来触发事件的函数，可以在组件内部调用它来触发父组件监听的事件
// const emit = defineEmits(["onToggleEvent"])

// 使用pinia实现兄弟组件之间的通信
const systemStore = useSystemStore()

const drawer = ref(false);
// const logoToggle = ref(false);
// 监听logoToggle的变化
// watch(logoToggle, (newValue, oldValue) => {
//     // 在这里可以执行相应的操作，例如更新界面或发送请求等
//     emit("onToggleEvent", newValue) // 触发事件并传递新的值 可以在父组件中监听这个事件来获取新的值
// })
</script>

<style scoped>
.setting {
    position: fixed;
    right: 0;
    top: 300px;
    z-index: 100;
}

.setting-icon {
    font-size: 25px;
}

.logo-show {
    display: block;
    margin-right: 20px;
}
</style>