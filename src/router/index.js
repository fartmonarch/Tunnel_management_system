import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView/index.vue";
import Layout from "@/views/Layout.vue";
import Login from "@/views/LoginInfo/index.vue";
import { useLoginStore } from "../stores/loginStore";
import { useMenuStore } from "@/stores/menuStore";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "layout",
			component: Layout,
			meta: {
				requiresAuth: true, //这个是路由守卫的标志，表示这个路由需要验证登录状态才能访问
			},
			children: [
				{
					path: "/",
					name: "home",
					component: HomeView,
					meta: {
						requiresAuth: true,
						key: "首页",
					},
				},
				{
					path: "/project",
					name: "project",
					component: () => import("../views/ProjectInfo/index.vue"),
					meta: {
						requiresAuth: true,
						key: "项目基础信息",
					},
				},
				{
					path: "/tunnel",
					name: "tunnel",
					component: () => import("../views/TunnelInfo/index.vue"),
					meta: {
						requiresAuth: true,
						key: "隧道基础信息",
					},
				},
				{
					path: "/build",
					name: "build",
					component: () => import("../views/BuildManage/index.vue"),
					meta: {
						requiresAuth: true,
						key: "施工检测检测",
					},
				},
				{
					path: "/geological",
					name: "geological",
					component: () =>
						import("../views/GeologicallInfo/index.vue"),
					meta: {
						requiresAuth: true,
						key: "超前地质预报",
					},
				},
				{
					path: "/usercenter",
					name: "usercenter",
					component: () => import("../views/UserCenter/index.vue"),
					meta: {
						requiresAuth: true,
					},
				},
				{
					path: "/plan",
					name: "检查计划",
					component: () =>
						import("../views/BuildManage/PlanTest/index.vue"),
					meta: {
						requiresAuth: true,
					},
				},
				{
					path: "/section",
					name: "切面检测",
					component: () =>
						import("../views/BuildManage/SectionTest/index.vue"),
					meta: {
						requiresAuth: true,
					},
				},
			],
		},
		{
			path: "/login",
			name: "login",
			component: Login,
		},
		{
			path: "/pdf/:id",
			name: "pdf",
			component: () => import("../views/TunnelInfo/PDFviewer/index.vue"),
		},
		{
			// 404路径匹配
			path: "/:pathMatch(.*)*",
			name: "notfound",
			// 这个是懒加载的方式引入组件，只有当访问这个路径时才会加载这个组件节约资源
			component: () => import("../views/NotFound/index.vue"),
		},
	],
});
/**
 * 路由守卫 路由权限
 */
router.beforeEach((to, from, next) => {
	// 看是否需要要验证
	const requiresAuth = to.meta.requiresAuth;
	// 这是看是否登录
	const loginStore = useLoginStore();
	const token = loginStore.token;
	if (requiresAuth && !token) {
		next("/login");
	} else {
		next();
	}
});

router.afterEach((to, from) => {
	// 存储路由路径
	localStorage.setItem("active", to.path);
	if (to.meta.key) {
		// 存储当前路由的key到pinia
		const menuStore = useMenuStore();
		menuStore.breadcrumb = to.meta.key;
	}
});

export default router;
