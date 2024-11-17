const express = require("express");
const router = express.Router();

require("../models/connection");

// Importation de la constant signup détenant la logique de création utilisateu
const { signup, signin, signout } = require("../controllers/usersController");

/******************************************************
                       ROUTES
 ******************************************************/

// Routes signup : création d'un compte utilisateur
router.post("/signup", signup);

// Route signin : connexion utilisateur
router.post("/signin", signin);

//Route signout : déconnexion utilisateur
router.delete("/signout", signout);

module.exports = router;
