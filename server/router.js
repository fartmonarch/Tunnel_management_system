const express = require("express");
const router = express.Router();
// 可以使用get
const url = require("url");
const SQLConnnect = require("./SQLConnect");
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
	SQLConnnect(sql, [username, password], (result) => {
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

module.exports = router;
