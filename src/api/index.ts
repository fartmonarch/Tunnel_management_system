import axios from "../utils/request";
import base from "./base";
import type { AxiosResponse } from "axios";
import type {
	ApiStatusResponse,
	LineResponse,
	LoginParams,
	LoginResponse,
	ProjectListResponse,
	ProjectTotalResponse,
        ProjectPreResponse,
        TunnelListResponse,
        TunnelListChildResponse,
        TunnelContentResponse,
        PdfPreViewResponse,
        UserListResponse,
        QueryParams,
        RouterResponse,
} from "@/types/api";

type ApiResult<T = unknown> = Promise<AxiosResponse<T>>;

const get = <T = unknown>(url: string, params?: QueryParams): ApiResult<T> => {
	return axios.get<T>(url, { params });
};

const post = <T = unknown>(url: string, params?: unknown): ApiResult<T> => {
	return axios.post<T>(url, params);
};

const put = <T = unknown>(url: string, params?: unknown): ApiResult<T> => {
	return axios.put<T>(url, params);
};

const api = {
	/**
	 * 登录
	 */
	getLogin(params: LoginParams): ApiResult<LoginResponse> {
		return post<LoginResponse>(`${base.baseUrl}${base.login}`, params);
	},
	/**
	 * 用户权限
	 */
	getRouter(params: { user: string }): ApiResult<RouterResponse> {
		return get<RouterResponse>(`${base.baseUrl}${base.router}`, params);
	},
	/**
	 * echarts数据接口
	 */
	getLine(): ApiResult<LineResponse> {
		return get<LineResponse>(`${base.baseUrl}${base.line}`);
	},
	/**
	 * 读取隧道信息
	 */
	projectInfo(params: QueryParams): ApiResult<ProjectListResponse> {
		return get<ProjectListResponse>(`${base.baseUrl}${base.projectInfo}`, params);
	},
	/**
	 * 模糊查询
	 */
	getSearch(params: QueryParams): ApiResult<ProjectListResponse> {
		return get<ProjectListResponse>(`${base.baseUrl}${base.search}`, params);
	},
	/**
	 * 总页数
	 */
	getTotal(): ApiResult<ProjectTotalResponse> {
		return get<ProjectTotalResponse>(`${base.baseUrl}${base.total}`);
	},
	getAddProject(params: QueryParams): ApiResult<ApiStatusResponse> {
		return get<ApiStatusResponse>(`${base.baseUrl}${base.addProject}`, params);
	},
	getDelProject(params: QueryParams): ApiResult<ApiStatusResponse> {
		return get<ApiStatusResponse>(`${base.baseUrl}${base.delProject}`, params);
	},
	getPreProject(params: QueryParams): ApiResult<ProjectPreResponse> {
		return get<ProjectPreResponse>(`${base.baseUrl}${base.preProject}`, params);
	},
	getUpdateProject(id: string | number, params: QueryParams): ApiResult<ApiStatusResponse> {
		return put<ApiStatusResponse>(`${base.baseUrl}${base.updateProject}${id}`, params);
	},
	getTunnelList(): ApiResult<TunnelListResponse> {
		return get<TunnelListResponse>(`${base.baseUrl}${base.tunnelList}`);
	},
	// 隧道设计信息-tree -二级
	getTunnelListChild(params: QueryParams): ApiResult<TunnelListChildResponse> {
		return get<TunnelListChildResponse>(`${base.baseUrl}${base.tunnelListChild}`, params);
	},
	// 隧道设计信息-content
	getTunnelContent(params: QueryParams): ApiResult<TunnelContentResponse> {
		return get<TunnelContentResponse>(`${base.baseUrl}${base.tunnelContent}`, params);
	},
	// 隧道设计信息-content-上传
	getUploadTunnelContent(params: QueryParams): ApiResult<ApiStatusResponse> {
		return get<ApiStatusResponse>(base.baseUrl + base.uploadTunnelContent, params);
	},
	// PDF预览接口
	getPdfPreView(params: QueryParams): ApiResult<PdfPreViewResponse> {
		return get<PdfPreViewResponse>(base.baseUrl + base.pdfPreView, params);
	},
	// 用户列表接口
	getUserList(): ApiResult<UserListResponse> {
		return get<UserListResponse>(`${base.baseUrl}${base.userList}`);
	},
	// 用户搜索接口
	getSearchUser(params: QueryParams): ApiResult<UserListResponse> {
		return get<UserListResponse>(`${base.baseUrl}${base.searchUser}`, params);
	},
	// 用户添加接口
	getAddUser(params: QueryParams): ApiResult<ApiStatusResponse> {
		return get<ApiStatusResponse>(`${base.baseUrl}${base.addUser}`, params);
	},
	// 用户删除接口
	getDelUser(params: QueryParams): ApiResult<ApiStatusResponse> {
		return get<ApiStatusResponse>(base.baseUrl + base.delUser, params);
	},
	// 用户预更新接口
	getPreViewUser(params: QueryParams): ApiResult<UserListResponse> {
		return get<UserListResponse>(base.baseUrl + base.preViewUser, params);
	},
	// 用户修改接口
	getUpdateUser(params: QueryParams): ApiResult<ApiStatusResponse> {
		return get<ApiStatusResponse>(base.baseUrl + base.updateUser, params);
	},
};

export default api;
