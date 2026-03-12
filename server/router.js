const express = require("express");
const router = express.Router();
// 可以使用get
const url = require("url");
const SQLConnect = require("./SQLConnect");
const jwt = require("jsonwebtoken");
const jwtSecret = require("./jwtSecret");
const { permission } = require("process");
const adminData = require("./data/admin");
const vipData = require("./data/vip");
const lineData = require("./data/line");

// 登录接口
router.post("/login", (req, res) => {
	// 接受username password
	const { username, password } = req.body;
	// 连接数据库查询
	const sql = "select * from user where username=? and password=?";
	SQLConnect(sql, [username, password], (result) => {
		if (result.length > 0) {
			// 生成token
			const token = jwt.sign(
				{
					id: result[0].id,
					username: result[0].username,
					permission: result[0].permission,
				},
				jwtSecret.secret
			);
			res.send({
				code: 200,
				username: result[0].username,
				permission: result[0].permission,
				token,
			});
		} else {
			res.send({
				code: 500,
				msg: "用户名密码错误",
			});
		}
	});
});

/**
 * 用户权限管理
 */

router.get("/router", (req, res) => {
	const user = url.parse(req.url, true).query.user;
	switch (user) {
		case "admin":
			res.send({
				status: 200,
				menuData: adminData,
			});
			break;
		case "vip":
			res.send({
				status: 200,
				menuData: vipData,
			});
			break;
		default:
			res.send({
				status: 200,
				menuData: vipData,
			});
			break;
	}
});

/**
 * 获取折线图数据
 */

router.get("/line", (req, res) => {
	res.send({
		status: 200,
		result: lineData,
	});
});

/**
 * 隧道信息查询
 */
router.get("/project/all", (req, res) => {
	// 分页功能
	// parse是将url字符串转换成对象，第二个参数true表示将查询字符串转换成对象
	// 如果不传第二个参数，查询字符串会被解析成字符串，需要自己手动解析
	// req.url是请求的url字符串，例如/project/all?page=1&size=10
	// url.parse()返回的对象中query属性就是查询字符串解析后的对象，例如{ page: '1', size: '10' }
	var page = url.parse(req.url, true).query.page || 1;
	const sql =
		"select * from project order by id desc limit 15 offset " +
		(page - 1) * 15;
	SQLConnect(sql, null, (result) => {
		if (result.length > 0) {
			res.send({
				status: 200,
				result,
			});
		} else {
			res.send({
				status: 500,
				msg: "暂无信息",
			});
		}
	});
});

/**
 * 模糊查询功能
 */
router.get("/project/search", (req, res) => {
	// 接受参数：查询内容
	const search = url.parse(req.url, true).query.search;
	// 模糊查询sql语句编写
	const sql =
		"select * from project where concat(`name`,`address`,`remark`) like '%" +
		search +
		"%'";
	SQLConnect(sql, null, (result) => {
		if (result.length > 0) {
			res.send({
				status: 200,
				result,
			});
		} else {
			res.send({
				status: 500,
				msg: "暂无数据",
			});
		}
	});
});

/**
 * 获得总页数
 */
router.get("/project/total", (req, res) => {
	const sql = "select count(*) as total from project";
	SQLConnect(sql, null, (result) => {
		if (result.length > 0) {
			res.send({
				status: 200,
				result,
			});
		} else {
			res.send({
				status: 500,
				msg: "暂无数据",
			});
		}
	});
});

/**
 * 隧道添加
 */
router.get("/project/add", (req, res) => {
	var name = url.parse(req.url, true).query.name || "";
	var number = url.parse(req.url, true).query.number || "";
	var money = url.parse(req.url, true).query.money || "";
	var address = url.parse(req.url, true).query.address || "";
	var duration = url.parse(req.url, true).query.duration || "";
	var startTime = url.parse(req.url, true).query.startTime || "";
	var endTime = url.parse(req.url, true).query.endTime || "";
	var quantity = url.parse(req.url, true).query.quantity || "";
	var status = url.parse(req.url, true).query.status || "";
	var remark = url.parse(req.url, true).query.remark || "";
	const sql = "insert into project values (null,?,?,?,?,?,?,?,?,?,?)";
	const arr = [
		name,
		number,
		money,
		address,
		duration,
		startTime,
		endTime,
		quantity,
		status,
		remark,
	];
	SQLConnect(sql, arr, (result) => {
		if (result.affectedRows > 0) {
			res.send({
				status: 200,
				msg: "添加成功",
			});
		} else {
			res.send({
				status: 500,
				msg: "添加失败",
			});
		}
	});
});

module.exports = router;
