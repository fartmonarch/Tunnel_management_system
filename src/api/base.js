/**
 * 存放所有网络请地址
 */
const base = {
	baseUrl: "http://localhost:3000", //公共地址
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
};

export default base;
