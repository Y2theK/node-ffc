const express = require("express");
const {
  getAllTasks,
  createTask,
  getOneTask,
  updateTask,
  deleteTask,
} = require("../controller/tasks");
const router = express.Router();
router.route("/").get(getAllTasks).post(createTask);
router.route("/:id").get(getOneTask).patch(updateTask).delete(deleteTask);

module.exports = router;
