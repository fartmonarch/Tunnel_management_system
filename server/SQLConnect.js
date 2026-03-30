const mysql = require("mysql");

const MySQLObj = {
	host: process.env.MYSQL_HOST || process.env.DB_HOST || "localhost",
	user: process.env.MYSQL_USERNAME || process.env.DB_USER || "root",
	password: process.env.MYSQL_PASSWORD || process.env.DB_PASSWORD || "",
	database: process.env.MYSQL_DATABASE || process.env.DB_NAME || "vue3_it1",
	port: Number(process.env.MYSQL_PORT || process.env.DB_PORT || 3306),
	connectTimeout: Number(process.env.DB_CONNECT_TIMEOUT || 30000),
	acquireTimeout: Number(process.env.DB_ACQUIRE_TIMEOUT || 30000),
	waitForConnections: true,
	connectionLimit: Number(process.env.DB_POOL_LIMIT || 10),
	queueLimit: 0,
};

const pool = mysql.createPool(MySQLObj);

console.log(
	`DB config host=${MySQLObj.host} port=${MySQLObj.port} db=${MySQLObj.database}`,
);

// 启动时先做一次连通性探测，便于在部署日志里快速定位问题。
pool.getConnection((err, connection) => {
	if (err) {
		console.error("数据库启动自检失败:", err.message);
		return;
	}
	connection.release();
	console.log("数据库启动自检成功");
});

function SQLConnnect(sql, arr, callback) {
	pool.getConnection((err, connection) => {
		if (err) {
			console.error(err);
			console.error("数据库连接失败");
			if (typeof callback === "function") callback([]);
			return;
		}
		connection.query(sql, arr, (err, result) => {
			// 释放连接
			connection.release();
			if (err) {
				console.error(err);
				if (typeof callback === "function") callback([]);
				return;
			}
			callback(result);
		});
	});
}

module.exports = SQLConnnect;
