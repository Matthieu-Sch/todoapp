const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    // Création du champs "userId" qui fera référence à la table "users"
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    title: { type: String, required: true },
    description: String,
    isCompleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Task = mongoose.model("tasks", taskSchema);

module.exports = Task;
