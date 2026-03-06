import { defineStore } from "pinia";

export const useLoginStore = defineStore("login", {
	// 组合式API
	state: () => {
		return {
			token: "",
			permission: "",
			username: "",
		};
	},
	persist: {
		enabled: true, //开启持久化
		strategies: [
			{
				key: "login", //自定义key值  存储到本地时候的key
				storage: localStorage, //选择存储方式
			},
		],
	},
});
