const express = require("express");
const router = express.Router();

require("../models/connection");

// Importation de la constant signup détenant la logique de création utilisateu
const {
  createTask,
  getTasks,
  deleteTask,
} = require("../controllers/tasksController");
const {
  authentificationWithToken,
} = require("../middlewares/authentificationWithToken");

/******************************************************
                       ROUTES
 ******************************************************/

// Routes createTask : création d'une tâche
router.post("/createTask", authentificationWithToken, createTask);

// Route getTasks : récupérer toutes les tâches créer par l'utilisateur
router.get("/getTasks", authentificationWithToken, getTasks);

//Route deleteTask : supprimer une tâche
router.delete("/deleteTask/:id", authentificationWithToken, deleteTask);

module.exports = router;
