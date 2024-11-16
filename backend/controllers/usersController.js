const User = require("../models/users");
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

    if (checkEmptyFields(signupFields)) {
      console.log("Au moins un champs est vide.");
      return res.json({
        result: false,
        emptyField: "Please fill all the fileds",
      });
    }

    if (!emailRegexp.test(email)) {
      return res.json({ valid: false, regexEmail: "Please enter valid email" });
    }

    if (!passwordRegexp.test(password)) {
      return res.json({
        valid: false,
        regexPassword: "Your password must contain at least ...",
      });
    }

    // Vérification de l'existance de l'email
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.json({
        result: false,
        message: "This email is already used. Please use another one.",
      });
    }
    // Vérification de l'existance du username
    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return res.json({
        result: false,
        message: "This username is already used. Please use another one.",
      });
    }

    // Vérification de la longueur du mot de passe (minimum 8 caractères)
    if (password.length < 8 || password.length > 16) {
      return res.json({
        result: false,
        message: "Your password must contain between 8 and 16 caracters.",
      });
    }

    // Vérification de la concordance des 2 mots de passe
    if (password !== confirmPassword) {
      return res.json({
        result: false,
        passwordFailed: "Your password do not match",
      });
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
    res.json({
      result: true,
      success: "Your account have been created.",
      token: newUser.token,
    });
  } catch (error) {
    // Gestion des erreurs inattendues
    console.error("Error during signup:", error.message);
    res.status(500).json({
      result: false,
      message: "An unexpected error occurred. Please try again later.",
    });
  }
};

// Création de la logique de connexion
const signin = async (req, res) => {
  try {
    const { password, token } = req.body;

    const userExists = await User.findOne(token);

    if (userExists && bcrypt.compareSync(password, userExists.password)) {
      return res.json({ result: true, token: userExists.token });
    } else {
      return res.json({
        result: false,
        error: "User not found or wrong password.",
      });
    }
  } catch (error) {}
};

module.exports = { signup, signin };
