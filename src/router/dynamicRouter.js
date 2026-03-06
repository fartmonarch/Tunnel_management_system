const manage = {
	path: "/work",
	name: "work",
	component: () => import("../views/WorkManage/index.vue"),
	meta: {
		requiresAuth: true,
		key: "工作监督管理",
	},
};

export default manage;
