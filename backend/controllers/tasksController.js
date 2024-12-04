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
      return res
        .status(400)
        .json({ error: 'Le champs "Nom de la tâche" est obligatoire.' });
    }

    // Création de la tâche
    const newTask = new Task({
      title,
      description,
      userId,
    });

    // Sauvegarde de la tâche
    await newTask.save();
    return res.status(201).json({
      message: "Tâche créée avec succès !",
      task: newTask,
    });
  } catch (error) {
    console.error("Error creating task:", error.message);
    return res.json(messages.catchError);
  }
};

// Récupérer l'ensemble des tâches
const getTasks = async (req, res) => {
  try {
    const userId = req.user._id;

    // Récupération de la tâche lié à l'utilisateur puis filtrage de la plus récente à la plus ancienne
    const tasks = await Task.find({ userId }).sort({ createdAt: -1 });
    if (!tasks) {
      res.status(404).json("Tâche non trouvée !");
    }

    return res.status(200).json({ result: true, tasks });
  } catch (error) {
    console.error("Error creating task:", error.message);
    return res.json(messages.catchError);
  }
};

const deleteTask = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;

    const task = await Task.findOne({ _id: id, userId });

    if (!task) {
      return res.status(404).json("Tâche non trouvée !");
    }

    await Task.deleteOne({ _id: id });
    res.status(200).json("Tâche supprimée !");
  } catch (error) {
    console.error("Erreur lors de la suppression de la tâche :", error.message);
    return res.status(500).json({ error: "Erreur interne du serveur." });
  }
};

module.exports = { createTask, getTasks, deleteTask };
