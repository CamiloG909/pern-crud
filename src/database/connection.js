const { Pool } = require("pg");

const db = new Pool({
	user: "postgres",
	host: "localhost",
	database: "task_manager",
	password: "123456",
	port: 5432,
});

module.exports = db;
