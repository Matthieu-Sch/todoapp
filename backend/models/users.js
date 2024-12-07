const mongoose = require("mongoose");

// Définition du Schema des utilisateurs
const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: { type: String, required: true, trim: true },
    token: String,
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Création du model "users" basé sur le Schema des utilisateurs
const User = mongoose.model("users", userSchema);

module.exports = User;
