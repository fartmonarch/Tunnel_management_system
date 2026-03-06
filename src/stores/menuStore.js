import { defineStore } from "pinia";

export const useMenuStore = defineStore("menu", {
	state: () => {
		return {
			isCollapse: false,
			breadcrumb: "首页",
			menus: [],
		};
	},
	persist: {
		enabled: true, //开启持久化
		strategies: [
			{
				key: "menus", //自定义key值  存储到本地时候的key
				storage: localStorage, //选择存储方式
			},
		],
	},
});
