<template>
    <div class="add-user">
        <span>用户状态:</span>
        <el-input @keyup.enter="searchHandler" class="input" v-model="searchInfo" size="large" placeholder="请输入用户信息">
        </el-input>
        <el-button @click="searchHandler" size="large" type="primary" class="button" plain>搜索</el-button>
        <el-button @click="addUserHandler" size="large" type="primary" class="button" plain>添加</el-button>
    </div>
    <el-table :data="userList.list" style="width:100%">
        <el-table-column label="ID" prop="id" width="180"></el-table-column>
        <el-table-column label="用户名" prop="username" width="200"></el-table-column>
        <el-table-column label="权限" width="200">
            <template #default="scope">
                <div>{{ scope.row.permission === 'admin' ? '管理员' : '普通用户' }}</div>
            </template>
        </el-table-column>
        <el-table-column label="电话" prop="phone" width="200"></el-table-column>
        <el-table-column label="操作">
            <template #default="scope">
                <el-button size="small" @click="handleEditor(scope.$index, scope.row)">编辑权限</el-button>
                <el-button size="small" @click="handleDelete(scope.$index, scope.row)" type="danger">删除用户</el-button>
            </template>
        </el-table-column>
    </el-table>
    <!-- 添加用户对话框 start -->
    <el-dialog v-model="dialogAddVisible" title="添加用户" width="35%" center>
        <el-form :model="userForm" status-icon label-width="120px">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="userForm.username" type="text"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="userForm.password" type="password"></el-input>
            </el-form-item>
            <el-form-item label="权限" prop="permission">
                <el-radio-group v-model="userForm.permission" size="large">
                    <el-radio-button label="admin">管理员</el-radio-button>
                    <el-radio-button label="vip">普通用户</el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="电话号码" prop="phone">
                <el-input v-model="userForm.phone" type="text"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button @click="dialogAddVisible = false">取消</el-button>
            <el-button type="primary" @click="sureAddUserHandler">确定</el-button>
        </template>
    </el-dialog>
    <!-- 添加用户对话框 end -->
    <!-- 修改用户对话框 start -->
    <el-dialog v-model="dialogUpdateVisible" title="修改用户" width="35%" center>
        <el-form :model="userUpdateForm" status-icon label-width="120px">
            <el-form-item label="用户名" prop="username">
                <h3>{{ userUpdateForm.username }}</h3>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="userUpdateForm.password" type="password"></el-input>
            </el-form-item>
            <el-form-item label="权限" prop="permission">
                <el-radio-group v-model="userUpdateForm.permission" size="large">
                    <el-radio-button label="admin">管理员</el-radio-button>
                    <el-radio-button label="vip">普通用户</el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="电话号码" prop="phone">
                <el-input v-model="userUpdateForm.phone" type="text"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button @click="dialogUpdateVisible = false">取消</el-button>
            <el-button type="primary" @click="sureUpdateUserHandler">确定</el-button>
        </template>
    </el-dialog>
    <!-- 修改用户对话框 end -->
</template>
<script setup>

import api from "@/api"
import { onMounted, reactive, ref } from "vue"

const userList = reactive({
    list: []
})

const userForm = reactive({
    username: "",
    password: "",
    permission: "",
    phone: ""
})

const userUpdateForm = reactive({
    username: "",
    password: "",
    permission: "",
    phone: ""
})

const searchInfo = ref("")
const dialogAddVisible = ref(false)
const dialogUpdateVisible = ref(false)
const EditorID = ref(0)

onMounted(() => {
    http()
})

const http = () => {
    api.getUserList().then(res => {
        if (res.data.status === 200) {
            userList.list = res.data.result
        }
    }).catch(error => {
        console.log(error);
    })
}

const handleEditor = (index, row) => {
    EditorID.value = row.id
    if (row.id === 1) {
        return
    }
    dialogUpdateVisible.value = true
    //预更新
    api.getPreViewUser({
        id: row.id
    }).then(res => {
        if (res.data.status === 200) {
            userUpdateForm.username = res.data.result[0].username
            userUpdateForm.password = res.data.result[0].password
            userUpdateForm.permission = res.data.result[0].permission
            userUpdateForm.phone = res.data.result[0].phone
        }
    })
}

const handleDelete = (index, row) => {
    ElMessageBox.confirm('是否确定删除用户', 'Warning', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(() => {
        api.getDelUser({
            id: row.id
        }).then(res => {
            if (res.data.status === 200) {
                ElMessage({
                    type: 'success',
                    message: res.data.msg,
                })
                // 刷新UI
                http()
            } else {
                ElMessage({
                    type: 'danger',
                    message: res.data.msg,
                })
            }
        })
    }).catch(() => {
        ElMessage({
            type: 'info',
            message: '已经取消删除',
        })
    })

}

/**
 * 搜索按钮事件
 */
const searchHandler = () => {
    api.getSearchUser({
        search: searchInfo.value
    }).then(res => {
        userList.list = res.data.result
    })
}

/**
 * 确定添加用户
 */

const sureAddUserHandler = () => {
    api.getAddUser({
        username: userForm.username,
        password: userForm.password,
        permission: userForm.permission,
        phone: userForm.phone
    }).then(
        res => {
            console.log(userForm);
            if (res.data.status === 200) {
                dialogAddVisible.value = false
                http()
            }
        }).catch(error => {
            console.log(error);
        })
}

const addUserHandler = () => {
    dialogAddVisible.value = true
}


/**
 * 确定修改用户信息
 */

const sureUpdateUserHandler = () => {
    api.getUpdateUser({
        id: EditorID.value,
        password: userUpdateForm.password,
        permission: userUpdateForm.permission,
        phone: userUpdateForm.phone
    }).then(res => {
        if (res.data.status === 200) {
            http();
            dialogUpdateVisible.value = false
        } else {
            ElMessage.error(res.data.msg)
        }
    })
}

</script>
<style scoped>
.add-user {
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 10px;
    width: 100%;
    background-color: #fff;
    box-sizing: border-box;
}

.add-user span {
    font-weight: 700;
}

.add-user .input {
    width: 300px;
}
</style>