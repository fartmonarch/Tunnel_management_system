<template>
    <!-- 搜索与添加 start -->
    <div class="search">
        <span>项目状态:</span>
        <el-input class="input" @keyup.enter="searchHandler" v-model="searchInfo" size="large"
            placeholder="请输入想要搜索的内容" />
        <el-button @click="searchHandler" class="button" size="large" type="primary" plain>搜索</el-button>
        <el-button class="button" size="large" type="primary" plain>添加</el-button>
    </div>
    <!-- 搜索与添加 end -->
    <!-- 表格展示数据 start -->
    <el-table :data="projectInfo.list" :header-cell-style="headerClass" style="width: 100%">
        <el-table-column prop="name" label="项目名称" width="180" />
        <el-table-column prop="number" label="项目编码" width="120" />
        <el-table-column prop="money" label="项目金额" width="120" />
        <el-table-column prop="address" label="项目地址" width="150" />
        <el-table-column prop="duration" label="项目工期(月)" width="120" />
        <el-table-column :formatter="value => dateFormatter(Number(value.startTime))" prop="startTime" label="开工时间"
            width="150" />
        <el-table-column :formatter="value => dateFormatter(Number(value.endTime))" prop="endTime" label="终止时间"
            width="150" />
        <el-table-column prop="quantity" label="隧道数量" width="120" />
        <el-table-column prop="status" label="项目状态" width="120">
            <template #default="scope">
                <el-tag :type="scope.row.status === '1' ? '' : 'success'">{{ statusHandle(scope.row.status) }}</el-tag>
            </template>
        </el-table-column>
        <!-- show-overflow-tooltip是为了这个备注只在一行通过hover显示 -->
        <el-table-column show-overflow-tooltip prop="remark" label="备注">
            <template #default="scope">
                <div v-html="scope.row.remark"></div>
            </template>
        </el-table-column>

        <el-table-column width="135" lable="操作">
            <template #default="scope">
                <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
                    编辑
                </el-button>
                <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">
                    删除
                </el-button>
            </template>
        </el-table-column>
    </el-table>
    <!-- 表格展示数据 end -->
</template>

<script setup>
import api from '@/api'
import { onMounted, reactive, ref } from 'vue';
import { dateFormatter } from '@/utils/utils'

// 初始化搜索内容
const searchInfo = ref('')

const projectInfo = reactive({
    list: []
})

onMounted(() => {
    http(1)
})

/**
 * 网络请求
 */
const http = (page) => {
    api.projectInfo({ page }).then(res => {
        console.log(res);
        if (res.data.status === 200) {
            projectInfo.list = res.data.result
        }
    }).then((error) => {
        console.log(error)
    })
}

/**
 * 搜索事件
 */

const searchHandler = () => {
    api.getSearch({ search: searchInfo.value }).then(res => {
        if (res.data.status === 200) {
            projectInfo.list = res.data.result
        } else {
            ElMessage.error(res.data.msg)
        }
    }).catch(error => {
        console.log(error);
    })
}

/**
 * 隧道标签文本
 */

const statusHandle = (status) => {
    return status === '1' ? '施工中' : '已完工'
}

/**
 * 设置表格头部样式
 */
const headerClass = () => {
    return {
        background: "#dcdcdc",
        color: "#999",
        fontWeight: 700
    }
}

/**
 * 表格 编辑按钮
 */
const handleEdit = (index, row) => {
    dialogEditorVisible.value = true;
    editorID.value = row.id
    api.getPreProject({ id: row.id }).then(res => {
        if (res.data.status === 200) {
            editorFormInfo.name = res.data.result.name
            editorFormInfo.number = res.data.result.number
            editorFormInfo.money = res.data.result.money
            editorFormInfo.address = res.data.result.address
            editorFormInfo.duration = res.data.result.duration
            // 修改事件日期格式
            editorFormInfo.startTime = Number(res.data.result.startTime)
            editorFormInfo.endTime = Number(res.data.result.endTime)
            editorFormInfo.quantity = res.data.result.quantity
            editorFormInfo.status = res.data.result.status
            editorFormInfo.remark = res.data.result.remark
        } else {
            ElMessage.error(res.data.msg)
        }
    }).catch(error => {
        console.log(error);
    })
}
/**
 * 表格 删除按钮
 */
const handleDelete = (index, row) => {
    ElMessageBox.confirm(
        '确定要删除当前数据么?',
        '删除数据',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(() => {
            // 确定删除
            api.getDelProject({ id: row.id }).then(res => {
                if (res.data.status === 200) {
                    ElMessage({
                        type: 'success',
                        message: res.data.msg,
                    })
                    // 刷新UI
                    http(1)
                } else {
                    ElMessage({
                        type: 'error',
                        message: res.data.msg,
                    })
                }
            })

        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '取消删除',
            })
        })

}
</script>

<style scoped>
.search {
    margin-top: 10px;
    box-sizing: border-box;
    padding: 10px;
    width: 100%;
    background: #fff;
}

.search span {
    font-weight: 700;
}

.search .input {
    width: 300px;
}

.page {
    position: fixed;
    right: 10px;
    bottom: 100px;
}
</style>