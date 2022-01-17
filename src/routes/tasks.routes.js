const { Router } = require("express");
const router = Router();
const {
	getTasks,
	createTask,
	getTask,
	updateTask,
	deleteTask,
} = require("../controllers/tasks.controller");

router.route("/tasks").get(getTasks).post(createTask);

router.route("/tasks/:id").get(getTask).put(updateTask).delete(deleteTask);

module.exports = router;
