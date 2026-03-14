const express = require("express");
const app = express();
const router = require("./router.js");
const cors = require("cors");

app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	})
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);
// upload文件夹作为静态资源目录，访问路径为localhost:3000/文件名
app.use(express.static("upload"));

app.listen(3000, () => {
	console.log("Server is running on port 3000");
});
