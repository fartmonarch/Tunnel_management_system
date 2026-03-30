## 项目所需基本技术栈

1. 基本框架： Vue3
2. 网络请求： axios
3. 路由：Vue-Router4.x
4. 状态管理： Pinia
5. 图表： echarts
6. 语言切换: vue-i18n
7. UI 组件库: element-plus
8. 仓库持久化存储：pinia-plugin-persist
9. ElementPlus 字体图标:element-plus/icons-vue

## 跨域的解决方案

1. 前台
    1. JSONP
    2. Proxy(开发环境生效)
2. 后台解决
    1. CORS

## 编辑功能，数据回显

1. 拿到当前表格中的数据，重新赋值到编辑对话框中（适合 1~3 人使用）
2. 通过网络请求获取新的对应此条数据（预更新）(适合多人团体使用)
3. 懒加载

## 打包

1.  npm run build
2.  服务器

## 🚀 TypeScript API 层全面重构与类型安全升级

**升级内容**:

基于消除前后端接口联调时缺乏类型约束导致字段拼写错误等痛点，我们对本项目的底层 API 交互层进行了 **100% End-to-End TypeScript** 重构。项目实现了自请求发出、跨接路由、一直到拿到后端 JSON 响应体的全面强类型覆盖。

### 1. 核心模块与文件迁移
移除了此前所有松散的 `.js` 请求文件，并在 TypeScript 下增加了严格的 Axios 拦截器参数与返回值推导：
- `src/utils/request.js` ➡️ `src/utils/request.ts` (基于泛型的高强约束 Axios 拦截器包装)
- `src/api/base.js` ➡️ `src/api/base.ts` (独立 API 路径字典定义)
- `src/api/index.js` ➡️ `src/api/index.ts` (所有具体业务请求入口已全部与强类型 Interface 绑定)

### 2. 构建独立的数据通信契约库 (`src/types/api.ts`)
通过审阅 Node.js + MySQL (库 `vue3_it1`) 的物理结构，提取涵盖了所有真实业务表（Tunnel, Project, User 等）的字段定义，作为跨前后端开发联调的“字典”层：
- **公共请求/响应体**：`ApiResult<T>`, `ApiStatusResponse`, `QueryParams`
- **全站基础支撑大盘**：`LoginResponse`, `RouterResponse`, `LineResponse`
- **隧道业务 (Tunnel Layer)**：`TunnelItem`, `TunnelChildItem`, `TunnelContentItem`, `PdfPreViewResponse`, `TunnelListResponse` 等
- **项目与用户运维 (Project & User)**：`ProjectItem`, `UserItem` 及相应的列表响应体类型等。

### 3. Node.js 后台服务响应体规范化治理
在推进前端 TypeScript 强制约束机制时，为了抹平接口返回协议的分歧，清理了现有后端 `server/router.js` 里的部分历史包袱：
- **标准化响应码字段**：旧版本中 `/api/login` 会返回 `code: 200` 导致同构判断失败，现已排查并强行归一化修正为 `status: 200`。
- 确保了前端 axios 拦截器以及各 Vue 组件中能够全局统一使用 `res.data.status === 200` 实施鉴权与校验。

### 4. Zero-Any 达成，带来的工程级收益
目前，所有涉及 HTTP 请求的地方，诸如：
```ts
api.getUserList().then(res => {
  // 当书写 res.data.result[0]. 时，
  // 编辑器已能完美提示出 username、password、phone、permission 等实体模型属性。
})
```
- **智能基建**：得益于真实 DB 表结构的类型映射，彻底消灭了需要来回查阅后端 Router/MySQL 才能确认字段拼写的历史体验。
- **构建层阻断隐患**：通过 Vite 调用 `npm run type-check` (vue-tsc)，如果发生错拼或缺失传参，在本地构建时就会直接报错从而拦截故障代码。
