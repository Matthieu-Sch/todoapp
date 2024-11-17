const User = require("../models/users");
const messages = require("../utils/messages");
const { checkEmptyFields } = require("../modules/checkEmptyFields");
const bcrypt = require("bcrypt");
const uid2 = require("uid2");

// Création de la logique d'inscription
const signup = async (req, res) => {
  try {
    const { email, username, password, confirmPassword } = req.body;
    // Création du regex pour l'email
    const emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Création du regex pour le mot de passe
    const passwordRegexp =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

    const signupFields = { email, username, password, confirmPassword };

    // Vérification du remplissage des champs
    if (checkEmptyFields(signupFields)) {
      console.log("Au moins un champs est vide.");
      return res.json(messages.signupEmptyFields);
    }

    if (!emailRegexp.test(email)) {
      return res.json(messages.emailRegex);
    }

    if (!passwordRegexp.test(password)) {
      return res.json(messages.passwordRegex);
    }

    // Vérification de l'existance de l'email
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.json(messages.emailAlreadyUsed);
    }
    // Vérification de l'existance du username
    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return res.json(messages.usernameAlreadyUsed);
    }

    // Vérification de la concordance des 2 mots de passe
    if (password !== confirmPassword) {
      return res.json(messages.passwordMatch);
    }

    // Hashage du mot de passe via bcrypt
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Création de l'utilisateur
    const newUser = await new User({
      email,
      username,
      password: hashedPassword,
      token: uid2(32),
    });

    await newUser.save();
    res.json({ ...messages.signupSuccess, token: newUser.token });
  } catch (error) {
    // Gestion des erreurs inattendues
    console.error("Error during signup:", error.message);
    res.status(500).json(messages.catchError);
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
