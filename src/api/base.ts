/**
 * 存放所有网络请地址
 */
interface ApiBaseMap {
	baseUrl: string;
	[key: string]: string;
}

const base: ApiBaseMap = {
	baseUrl:
		import.meta.env.VITE_API_BASE_URL || "https://happycoke.zeabur.app", //公共地址（未配置时回退为空，避免拼出 undefined）
	login: "/api/login", //登录接口
	router: "/api/router", //用户权限
	line: "/api/line", //echarts数据接口
	projectInfo: "/api/project/all", //隧道信息获取接口
	search: "/api/project/search", //搜索接口
	total: "/api/project/total", //总页数接口
	addProject: "/api/project/add", //添加接口
	delProject: "/api/project/del", //删除接口
	preProject: "/api/project/update/pre", //隧道预更新
	updateProject: "/api/project/update/", //隧道更新
	tunnelList: "/api/tunnel/list", //隧道设计信息-tree -一级
	tunnelListChild: "/api/tunnel/list/child", //隧道设计信息-tree -二级
	tunnelContent: "/api/tunnel/content", //隧道设计内容
	uploadTunnelContent: "/api/tunnel/content/url", // 隧道设计信息-content-上传
	pdfPreView: "/api/tunnel/pdf", // PDF预览
	userList: "/api/user/list", //用户列表接口
	searchUser: "/api/user/search", //用户搜索接口
	addUser: "/api/user/add", //用户添加接口
	delUser: "/api/user/del", // 用户删除
	preViewUser: "/api/user/preview", // 用户预更新
	updateUser: "/api/user/update", // 用户修改
};

export default base;
