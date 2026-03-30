export interface ApiStatusResponse {
	status: number;
	msg?: string;
}

export interface LoginParams {
	username: string;
	password: string;
}

export interface LoginResponse {
	status: number;
	username?: string;
	permission?: string;
	token?: string;
	msg?: string;
}

export interface MenuItem {
	path: string;
	name: string;
	icon?: string;
	children?: MenuItem[];
}

export interface RouterResponse {
	status: number;
	menuData: {
		menus: MenuItem[];
	};
}

export interface LineSeries {
	name: string;
	type: string;
	stack?: string;
	data: number[];
}

export interface LineResponse {
	status: number;
	result: {
		lines: LineSeries[];
	};
}

export interface ProjectItem {
	id: number;
	name: string;
	number: string;
	money: string;
	address: string;
	duration: string;
	startTime: string;
	endTime: string;
	quantity: string;
	status: string;
	remark: string;
}

export interface ProjectListResponse {
	status: number;
	result?: ProjectItem[];
	msg?: string;
}

export interface ProjectTotalResponse {
	status: number;
	result?: Array<{ total: number }>;
	msg?: string;
}

export type QueryParams = Record<string, unknown>;

export interface ProjectPreResponse extends ApiStatusResponse {
    result?: ProjectItem;
}

export interface TunnelItem {
    id: number;
    name: string;
    cid?: number | string;
}

export interface TunnelChildItem {
    id: number;
    cid: number | string;
    name: string;
    content: string;
}

export interface TunnelContentItem {
    id: number;
    tunnelname: string;
    imagename: string;
    num: string;
    urlName: string;
    content: string;
}

export interface TunnelListResponse extends ApiStatusResponse {
    result?: TunnelItem[];
}

export interface TunnelListChildResponse extends ApiStatusResponse {
    result?: TunnelChildItem[];
}

export interface TunnelContentResponse extends ApiStatusResponse {
    result?: TunnelContentItem[];
}

export interface PdfPreViewResponse extends ApiStatusResponse {
    result?: TunnelContentItem;
}

export interface UserItem {
    id: number;
    username: string;
    password?: string;
    permission: string;
    phone: string;
}

export interface UserListResponse extends ApiStatusResponse {
    result?: UserItem[];
}
