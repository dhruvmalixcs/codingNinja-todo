// models/task.model.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    title: { type: String, required: true },
    desc: { type: String, required: true },
    dueDate: { type: Date, required: true },
    listId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "List",
    },
    dueDate: {
      type: Date,
      default: null
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    status: { type: String, required: true, default: "to-do" },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = { Task };
