import axios from "../utils/request";
import base from "./base";

const api = {
	/**
	 * 登录
	 */
	getLogin(params) {
		// 得到网络请求的结果
		return axios.post(`${base.baseUrl}${base.login}`, params);
	},
	/**
	 * 用户权限
	 */
	getRouter(params) {
		return axios.get(`${base.baseUrl}${base.router}`, { params });
	},
	/**
	 * echarts数据接口
	 */
	getLine() {
		return axios.get(`${base.baseUrl}${base.line}`);
	},
	/**
	 * 读取隧道信息
	 */
	projectInfo(params) {
		return axios.get(`${base.baseUrl}${base.projectInfo}`, { params });
	},
	/**
	 * 模糊查询
	 */
	getSearch(params) {
		return axios.get(`${base.baseUrl}${base.search}`, { params });
	},
	/**
	 * 模糊查询
	 */
	getTotal() {
		return axios.get(`${base.baseUrl}${base.total}`);
	},
	/**
	 * 添加隧道接口
	 */
	getAddProject(params) {
		return axios.get(`${base.baseUrl}${base.addProject}`, { params });
	},
};

export default api;
