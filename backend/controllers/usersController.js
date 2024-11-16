const User = require("../models/users");
const bcrypt = require("bcrypt");
const uid2 = require("uid2");

// Création du controlleur pour l'inscription d'un utilisateur
const signup = async (req, res) => {
  try {
    const { email, username, password, confirmPassword } = req.body;

    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.json({
        result: false,
        message: "This email is already used. Please use another one.",
      });
    }

    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return res.json({
        result: false,
        message: "This username is already used. Please use another one.",
      });
    }

    if (password.length < 8) {
      return res.json({
        result: false,
        message: "Your password must contain at least 8 caracter.",
      });
    }

    if (password !== confirmPassword) {
      return res.json({
        result: false,
        passwordFailed: "Your password do not match",
      });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

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

module.exports = { signup };
