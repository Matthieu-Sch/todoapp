const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  // Création du champs "userId" qui fera référence à la table "users"
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  title: String,
  description: String,
  isCompleted: Boolean,
});

const Task = mongoose.model("tasks", taskSchema);

module.exports = Task;
