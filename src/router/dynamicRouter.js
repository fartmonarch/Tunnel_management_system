const manage = [
	{
		path: "/work",
		name: "work",
		component: () => import("../views/WorkManage/index.vue"),
		meta: {
			requiresAuth: true,
			key: "工作监督管理",
		},
	},
	{
		path: "/system",
		name: "system",
		component: () => import("../views/SystemManage/index.vue"),
		meta: {
			requiresAuth: true,
			key: "系统信息管理",
		},
	},
];

export default manage;
