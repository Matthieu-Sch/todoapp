// Route "users"
const express = require("express");
const router = express.Router();

require("../models/connection");

// Importation de la constant signup détenant la logique de création utilisateur
const { signup } = require("../controllers/usersController");

// Route signup : création d'un compte utilisateur
router.post("/signup", signup);

module.exports = router;
