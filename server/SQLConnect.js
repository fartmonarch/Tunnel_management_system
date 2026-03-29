const mysql = require("mysql");
const MySQLObj = {
	host: process.env.DB_HOST || "localhost",
	user: process.env.DB_USER || "root",
	password: process.env.DB_PASSWORD || "",
	database: process.env.DB_NAME || "vue3_it1",
};

const pool = mysql.createPool(MySQLObj);

function SQLConnnect(sql, arr, callback) {
	pool.getConnection((err, connection) => {
		if (err) {
			console.log(err);
			console.error("数据库连接失败");
			return;
		}
		connection.query(sql, arr, (err, result) => {
			// 释放连接
			connection.release();
			if (err) {
				console.log(err);
				return;
			}
			callback(result);
		});
	});
}

module.exports = SQLConnnect;
