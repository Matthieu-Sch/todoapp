const Task = require("../models/tasks");
const User = require("../models/users");
const messages = require("../utils/messages");
const { checkEmptyFields } = require("../modules/checkEmptyFields");

const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.user._id;

    // Vérification du remplissage du titre et qu'il ne soit pas composé uniquement d'espace vide
    if (!title || !title.trim()) {
      res.json(messages.noTitle);
    }

    // Création de la tâche
    const newTask = new Task({
      title,
      description,
      userId,
    });

    // Sauvegarde de la tâche
    await newTask.save();
    return res.json({ ...messages.taskCreateSuccessfully, task: newTask });
  } catch (error) {
    console.error("Error creating task:", error.message);
    return res.json(messages.catchError);
  }
};

// Récupérer l'ensemble des tâches
const getTasks = async (req, res) => {
  try {
    const userId = req.user._id;
    const tasks = await Task.find({ userId }).sort({ createdAt: -1 });
    return res.json({ result: true, tasks });
  } catch (error) {
    console.error("Error creating task:", error.message);
    return res.json(messages.catchError);
  }
};

module.exports = { createTask, getTasks };
