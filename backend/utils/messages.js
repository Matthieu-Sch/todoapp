module.exports = {
  // Messages signup DEBUT
  signupEmptyFields: {
    result: false,
    key: "signupEmptyFields",
    message: "Please fill all the fields",
  },
  emailRegex: {
    result: false,
    key: "emailRegex",
    message: "Please enter valid email",
  },
  passwordRegex: {
    result: false,
    key: "passwordRegex",
    message: [
      "Your password must:",
      "- Contain at least 8 characters",
      "- Include one uppercase letter",
      "- Include one number",
    ],
  },
  emailAlreadyUsed: {
    result: false,
    key: "emailAlreadyUsed",
    message: "This email is already used. Please use another one.",
  },
  usernameAlreadyUsed: {
    result: false,
    key: "usernameAlreadyUsed",
    message: "This username is already used. Please use another one.",
  },
  passwordMatch: {
    result: false,
    key: "usernameAlreadyUsed",
    message: "Your password do not match",
  },
  signupSuccess: {
    result: true,
    key: "signupSuccess",
    message: "Your account have been created.",
  },
  // Messages signup FIN

  // Messages signin DEBUT
  signinEmptyFields: {
    result: false,
    key: "signinEmptyFields",
    message: "An unexpected error occurred. Please try again later.",
  },
  signinSuccess: {
    result: true,
    key: "signinSuccess",
    message: "Login success",
  },
  errorSignin: {
    result: false,
    key: "errorSignin",
    message: "Wrong credentials.",
  },
  // Messages signin FIN

  // Messages signout DEBUT
  invalidToken: {
    result: false,
    key: "tokenInvalid",
    message: "Invalid or expired token",
  },
  signoutSuccess: {
    result: true,
    key: "signoutSuccess",
    message: "You've been successfully signed out.",
  },
  // Messages signout FIN

  // Messages catch erreur DEBUT
  catchError: {
    result: false,
    message: "An unexpected error occurred. Please try again later.",
  },
  // Messages catch erreur FIN
};
