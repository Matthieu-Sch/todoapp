const express = require("express");
const router = express.Router();

require("../models/connection");

// Importation de la constant signup détenant la logique de création utilisateu
const { createTask, getTasks } = require("../controllers/tasksController");
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

module.exports = router;
