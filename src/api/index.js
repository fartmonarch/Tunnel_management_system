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
	/**
	 * 删除隧道接口
	 */
	getDelProject(params) {
		return axios.get(`${base.baseUrl}${base.delProject}`, { params });
	},
	/**
	 * 隧道预更新接口
	 */
	getPreProject(params) {
		return axios.get(`${base.baseUrl}${base.preProject}`, { params });
	},
	/**
	 * 隧道更新接口
	 */
	getUpdateProject(id, params) {
		return axios.put(`${base.baseUrl}${base.updateProject}${id}`, params);
	},
	/**
	 * 隧道设计信息-tree -一级
	 */
	getTunnelList() {
		return axios.get(`${base.baseUrl}${base.tunnelList}`);
	},
	/**
	 * 隧道设计信息-tree -二级
	 */
	getTunnelListChild(params) {
		return axios.get(`${base.baseUrl}${base.tunnelListChild}`, { params });
	},
	/**
	 * 隧道设计内容
	 */
	getTunnelContent(params) {
		return axios.get(`${base.baseUrl}${base.tunnelContent}`, { params });
	},
	/**
	 * 隧道设计信息-content-上传
	 */
	getUploadTunnelContent(params) {
		return axios.get(base.baseUrl + base.uploadTunnelContent, {
			params,
		});
	},
	/**
	 * PDF预览
	 */
	getPdfPreView(params) {
		return axios.get(base.baseUrl + base.pdfPreView, {
			params,
		});
	},
};

export default api;
