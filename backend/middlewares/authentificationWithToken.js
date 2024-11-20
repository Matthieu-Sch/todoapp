const User = require("../models/users");
const messages = require("../utils/messages");

const authentificationWithToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    // console.log("Token reçu :", token);

    // Vérification de l'existence d'un token
    if (!token) {
      return res.json(messages.noToken);
    }

    // Vérification que le token utilisateur existe
    const user = await User.findOne({ token });
    // console.log("User reçu :", user);

    if (!user) {
      return res.json(messages.invalidToken);
    }

    req.user = user;

    // On passe au contrôleur suivant
    next();
  } catch (error) {
    return res.json(messages.catchError);
  }
};

module.exports = { authentificationWithToken };
