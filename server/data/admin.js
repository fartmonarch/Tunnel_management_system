module.exports = {
	menus: [
		{
			path: "/",
			name: "首页",
			icon: "House",
		},
		{
			path: "/project",
			name: "项目基础信息",
			icon: "Connection",
		},
		{
			path: "/tunnel",
			name: "隧道设计信息",
			icon: "MessageBox",
		},
		{
			path: "/work",
			name: "工作监督管理",
			icon: "EditPen",
		},
		{
			path: "/build",
			name: "施工监控检测",
			icon: "Remove",
			children: [
				{
					path: "/plan",
					name: "检测计划",
				},
				{
					path: "/section",
					name: "切面检测",
				},
			],
		},
		{
			path: "/geological",
			name: "超前地质预报",
			icon: "PieChart",
		},
		{
			path: "/system",
			name: "系统信息管理",
			icon: "Setting",
		},
	],
};
