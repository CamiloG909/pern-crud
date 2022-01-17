const TasksCtrl = {};
const db = require("../database/connection");

TasksCtrl.getTasks = async (req, res) => {
	try {
		let tasks = await db.query("SELECT * FROM task");
		tasks = tasks.rows;

		res.json({
			data: tasks,
		});
	} catch (e) {
		res.json({
			error: e.message,
		});
	}
};

TasksCtrl.createTask = async (req, res) => {
	try {
		const { title, description } = req.body;

		const response = await db.query(
			`INSERT INTO task (title, description) VALUES ('${title}', '${description}') RETURNING *`
		);

		res.json({
			message: "Task created",
			task: response.rows[0],
		});
	} catch (e) {
		res.json({
			error: e.message,
		});
	}
};

TasksCtrl.getTask = async (req, res) => {
	try {
		let task = await db.query(`SELECT * FROM task WHERE id = ${req.params.id}`);
		task = task.rows;

		if (task.length === 0)
			return res.status(404).json({
				message: "Task not found",
			});

		res.json(task[0]);
	} catch (e) {
		res.json({
			error: e.message,
		});
	}
};

TasksCtrl.updateTask = async (req, res) => {
	try {
		const response = await db.query(
			`UPDATE task SET title = '${req.body.title}', description = '${req.body.description}' WHERE id = ${req.params.id} RETURNING *`
		);

		if (response.rows.length === 0)
			return res.status(404).json({ message: "Task not found" });

		res.json({
			message: "Task updated",
			data: response.rows[0],
		});
	} catch (e) {
		res.json({
			error: e.message,
		});
	}
};

TasksCtrl.deleteTask = async (req, res) => {
	try {
		const response = await db.query(
			`DELETE FROM task WHERE id = ${req.params.id}`
		);

		if (response.rowCount === 0)
			return res.status(404).json({
				message: "Task not found",
			});

		res.status(204).json({
			message: "Task deleted",
		});
	} catch (e) {
		res.json({
			error: e.message,
		});
	}
};

module.exports = TasksCtrl;
