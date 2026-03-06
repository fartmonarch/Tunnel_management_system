import { defineStore } from "pinia";

export const useSystemStore = defineStore("system", {
	state: () => {
		return {
			togglestore: true,
		};
	},
	persist: {
		enabled: true, //开启持久化
		strategies: [
			{
				key: "system", //自定义key值  存储到本地时候的key
				storage: localStorage, //选择存储方式
			},
		],
	},
});
