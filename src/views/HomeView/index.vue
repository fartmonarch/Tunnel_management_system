<template>
    <div class="card">
        <div class="box">
            <el-icon class="box-icon" style="color:#40c9c6">
                <Notification />
            </el-icon>
            <span class="box-title">隧道数量：1000个</span>
        </div>
        <div class="box">
            <el-icon class="box-icon" style="color:#36a3f7">
                <Compass />
            </el-icon>
            <span class="box-title">检验合格：805个</span>
        </div>
        <div class="box">
            <el-icon class="box-icon" style="color:#f4516c">
                <Bell />
            </el-icon>
            <span class="box-title">正在施工：302个</span>
        </div>
        <div class="box">
            <el-icon class="box-icon" style="color:#34bfa3">
                <Odometer />
            </el-icon>
            <span class="box-title">地址预报：5000个</span>
        </div>
    </div>
    <div class="line" id="line"></div>
    <div class="charts">
        <div class="charts-radar" id="charts-radar"></div>
        <div class="charts-pie" id="charts-pie"></div>
        <div class="charts-bar" id="charts-bar"></div>
    </div>
</template>

<script setup>
import { getCurrentInstance, onMounted } from "vue"
import api from "@/api/index.js"

const { proxy } = getCurrentInstance()
// onMounted的作用是为了确保组件已经挂载到DOM上，这样我们才能正确地获取到元素并进行操作。在这个例子中，我们在onMounted中调用了proxy.$line("line")，这意味着当组件挂载完成后，我们会调用一个名为$line的方法，并传入一个参数"line"，这个参数可能是一个元素的ID或者其他标识符，用于在$line方法中进行相关的操作。
onMounted(() => {
    api.getLine().then(res => {
        if (res.data.status === 200) {
            proxy.$line("line", res.data.result.lines)
        }
    }).catch(error => {
        console.log(error)
    })
    // 加载图表
    proxy.$radar("charts-radar")
    proxy.$pie("charts-pie")
    proxy.$bar("charts-bar")
})

</script>

<style scoped>
.card {
    display: flex;
}

.card .box {
    flex: 1;
    height: 130px;
    margin: 20px;
    padding: 20px;
    background: #fff;
}

.card .box .box-icon {
    display: block;
    font-size: 80px;
    color: #40c9c6;
    line-height: 130px;
    float: left;
    padding-left: 20px;
}

.card .box:nth-child(1) {
    margin-left: 0;
}

.card .box:nth-child(4) {
    margin-right: 0;
}

.box-title {
    display: block;
    font-size: 20px;
    color: #666;
    line-height: 130px;
    float: right;
    padding-right: 20px;
}

.line {
    width: 100%;
    height: 300px;
    background-color: #fff;
}

.charts {
    display: flex;
}

.charts div {
    flex: 1;
    height: 450px;
    margin: 20px;
    padding: 10px;
    background-color: #fff;
}

.charts div :nth-child(1) {
    margin-left: 0;
}

.charts div :nth-child(3) {
    margin-right: 0;
}
</style>