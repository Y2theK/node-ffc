const mongoose = require("mongoose");
const schema = mongoose.Schema;
const TaskSchema = new schema({
  name: {
    type: String,
    require: [true, "Name must be provided"],
    trim: true,
    maxlength: [20, "Name must be under 20 characters"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model("Task", TaskSchema);
