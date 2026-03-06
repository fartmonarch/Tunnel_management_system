/**
 * echarts图表库
 */
import * as echarts from "echarts";

export default {
	/* echarts挂载到Vue全局 */
	install: (app) => {
		// 折线图
		app.config.globalProperties.$line = (element, data) => {
			// 加载 ecahrts 图标
			var myChart = echarts.init(document.getElementById(element));
			const option = {
				tooltip: {
					trigger: "axis",
				},
				legend: {
					top: 10, // 强制放到顶部
					data: ["隧道增加数量", "地质预测数量"],
				},
				grid: {
					top: 60, // 给 legend 预留空间
					left: "3%",
					right: "4%",
					bottom: "3%",
					containLabel: true,
				},
				toolbox: {
					feature: {
						saveAsImage: {},
					},
				},
				xAxis: {
					type: "category",
					boundaryGap: false,
					data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
				},
				yAxis: {
					type: "value",
				},
				series: data,
			};
			myChart.setOption(option);
		};
		// 雷达图
		app.config.globalProperties.$radar = (element, data) => {
			var myChart = echarts.init(document.getElementById(element));
			const option = {
				title: {
					text: "Basic Radar Chart",
				},
				legend: {
					data: ["Allocated Budget", "Actual Spending"],
				},
				radar: {
					// shape: 'circle',
					indicator: [
						{ name: "Sales", max: 6500 },
						{ name: "Administration", max: 16000 },
						{ name: "Information Technology", max: 30000 },
						{ name: "Customer Support", max: 38000 },
						{ name: "Development", max: 52000 },
						{ name: "Marketing", max: 25000 },
					],
				},
				series: [
					{
						name: "Budget vs spending",
						type: "radar",
						data: [
							{
								value: [4200, 3000, 20000, 35000, 50000, 18000],
								name: "Allocated Budget",
							},
							{
								value: [
									5000, 14000, 28000, 26000, 42000, 21000,
								],
								name: "Actual Spending",
							},
						],
					},
				],
			};
			myChart.setOption(option);
		};
		// 饼状图
		app.config.globalProperties.$pie = (element, data) => {
			var myChart = echarts.init(document.getElementById(element));
			const option = {
				legend: {
					top: "bottom",
				},
				toolbox: {
					show: true,
					feature: {
						mark: { show: true },
						dataView: { show: true, readOnly: false },
						restore: { show: true },
						saveAsImage: { show: true },
					},
				},
				series: [
					{
						name: "Nightingale Chart",
						type: "pie",
						radius: [5, 150],
						center: ["50%", "50%"],
						roseType: "area",
						itemStyle: {
							borderRadius: 8,
						},
						data: [
							{ value: 40, name: "rose 1" },
							{ value: 38, name: "rose 2" },
							{ value: 32, name: "rose 3" },
							{ value: 30, name: "rose 4" },
							{ value: 28, name: "rose 5" },
							{ value: 26, name: "rose 6" },
							{ value: 22, name: "rose 7" },
							{ value: 18, name: "rose 8" },
						],
					},
				],
			};
			myChart.setOption(option);
		};
		// 柱状图
		app.config.globalProperties.$bar = (element, data) => {
			var myChart = echarts.init(document.getElementById(element));
			const option = {
				xAxis: {
					type: "category",
					data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
				},
				yAxis: {
					type: "value",
				},
				series: [
					{
						data: [
							120,
							{
								value: 200,
								itemStyle: {
									color: "#505372",
								},
							},
							150,
							80,
							70,
							110,
							130,
						],
						type: "bar",
					},
				],
			};
			myChart.setOption(option);
		};
	},
};
