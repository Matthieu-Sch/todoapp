const User = require("../models/users");
const messages = require("../utils/messages");
const { checkEmptyFields } = require("../modules/checkEmptyFields");
const bcrypt = require("bcrypt");
const uid2 = require("uid2");

// Création de la logique d'inscription
const signup = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;
    console.log("Données reçues :", req.body);

    const emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegexp =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

    // Vérification des champs vides
    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      console.log("Champs vides détectés");
      return res
        .status(400)
        .json({ message: "Tous les champs sont obligatoires." });
    }

    // Validation du format de l'email
    if (!emailRegexp.test(email)) {
      console.log("Email invalide :", email);
      return res.status(400).json({ message: "L'email n'est pas valide." });
    }

    // Validation du format du mot de passe
    if (!passwordRegexp.test(password)) {
      console.log("Mot de passe invalide :", password);
      return res.status(400).json({
        message:
          "Le mot de passe doit contenir entre 8 et 16 caractères, avec au moins une majuscule, une minuscule, un chiffre et un caractère spécial.",
      });
    }

    if (password !== confirmPassword) {
      console.log(
        "Les mots de passes de correspondent pas : ",
        password,
        " ",
        confirmPassword
      );
      res
        .statut(400)
        .json({
          message: "Attention : vos mots de passe ne correspondent pas.",
        });
    }

    // Vérification de l'existence de l'email
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      console.log("Email existe déjà :", email);
      return res.status(409).json({ message: "Cet email est déjà utilisé." });
    }

    // Vérification de la concordance des mots de passe
    if (password !== confirmPassword) {
      console.log("Les mots de passe ne correspondent pas.");
      return res
        .status(400)
        .json({ message: "Les mots de passe ne correspondent pas." });
    }

    // Hashage du mot de passe
    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
      token: uid2(32),
    });

    // Sauvegarde de l'utilisateur
    await newUser.save();
    console.log("Utilisateur enregistré :", newUser);

    res.status(201).json({
      message: "Utilisateur créé avec succès.",
      token: newUser.token,
    });
  } catch (error) {
    console.error("Erreur inattendue :", error.message);
    res.status(500).json({ message: "Une erreur interne est survenue." });
  }
};

// Création de la logique de connexion
const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const signinFields = { email, password };

    // Vérification du remplissage des champs
    if (checkEmptyFields(signinFields)) {
      return res.json(messages.signinEmptyFields);
    }

    // Vérification de l'existance de l'utilisateur
    const userExists = await User.findOne({ email });
    if (!userExists) {
      return res.json(messages.errorSignin);
    }

    const isPasswordValid = bcrypt.compareSync(password, userExists.password);
    if (!isPasswordValid) {
      return res.json(messages.errorSignin);
    }

    // Création d'un nouveau token
    userExists.token = uid2(32);
    userExists.save();
    return res.json({ ...messages.signinSuccess, token: userExists.token });
  } catch (error) {
    console.error("Error during signin:", error.message);
    res.status(500).json(messages.catchError);
  }
};

const signout = async (req, res) => {
  try {
    const { token } = req.body;

    // Vérification de la validité ou de l'existence du token
    const userTokenValid = await User.findOne({ token });
    if (!userTokenValid) {
      return res.json(messages.invalidToken);
    }

    // Si le token est existe, on l'efface et on enregistre dans la table user
    userTokenValid.token = null;
    await userTokenValid.save();
    return res.json(messages.signoutSuccess);
  } catch (error) {
    console.error("Error during signin:", error.message);
    res.status(500).json(messages.catchError);
  }
};

module.exports = { signup, signin, signout };
