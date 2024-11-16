// Charge les variables d'environnement depuis le fichier .env pour sécuriser les informations sensibles
require("dotenv").config;

// Importe le module Express pour créer et configurer le serveur
const express = require("express");

// Importe le module Mongoose pour intéragir avec une base de données MongoDB
const mongoose = require("mongoose");

// Création d'une instance de l'application Express
const app = express();

// Importe le module path pour travailler avec les chemins de fichiers
const path = require("path");

// Importe cookie-parser pour gérer les cookies dans les requêtes
const cookieParser = require("cookie-parser");

// Importe morgan pour logger les requêtes HTTP dans la console (utile pour le développement)
const logger = require("morgan");

// Importe le routeur principal (indexRouter) pour gérer les routes de base
const indexRouter = require("./routes/index");

// Importe et utilise cors pour autoriser les requêtes cross-origin (utile si ton frontend est sur un domaine différent)
const cors = require("cors");

// Applique le middleware CORS à toutes les requêtes
app.use(cors());

// Utilise morgan pour logger chaque requête en utilisant le mode "dev" (affiche des logs colorés dans la console)
app.use(logger("dev"));

// Middleware pour analyser le JSON dans le corps des requêtes
app.use(express.json());

// Middleware pour analyser les données URL-encodées dans le corps des requêtes
app.use(express.urlencoded({ extended: false }));

// Utilise cookie-parser pour gérer les cookies dans les requêtes
app.use(cookieParser());

// Sert les fichiers statiques depuis le dossier "public"
app.use(express.static(path.join(__dirname, "public")));

// Utilise le routeur pour les routes à la racine ("/")
app.use("/", indexRouter);

// Exporte l'application pour l'utiliser dans d'autres fichiers (comme server.js)
module.exports = app;
