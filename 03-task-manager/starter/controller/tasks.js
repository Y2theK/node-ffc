const Task = require("../model/Task");
const getAllTasks = async (req, res) => {
  // throw new Error("sth wribg");
  try {
    const tasks = await Task.find().sort({ createAt: -1 });
    return res.status(200).json({ tasks });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    return res.status(200).json({ task });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getOneTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "No such task" });
    }
    return res.status(200).json({ task });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!task) {
      return res.status(404).json({ message: "No such task" });
    }
    return res.status(200).json({ task });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "No such task" });
    }
    return res.status(200).json({ task });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getOneTask,
  updateTask,
  deleteTask,
};
