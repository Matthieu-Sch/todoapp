module.exports = {
  /******************************************************
                         Controlleur Users
   ******************************************************/
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
    message: "Please fill all the fields.",
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

  /******************************************************
              Middleware Authentification
 ******************************************************/

  // Messages authentificationWithToken DEBUT
  noToken: {
    result: false,
    key: "noToken",
    message: "no token provided",
  },
  //Commenté car définit dans signout
  // invalidToken: {
  //   result: false,
  //   key: "tokenInvalid",
  //   message: "Invalid or expired token",
  // },
  // Messages authentificationWithToken FIN

  /******************************************************
                    Controlleur Tasks
 ******************************************************/
  // Messages createTask DEBUT
  noTitle: {
    result: false,
    key: "noTitle",
    message: "Title is mandatory",
  },
  taskCreateSuccessfully: {
    result: true,
    key: "taskCreateSuccessfully",
    message: "Your task have been created.",
  },
  // Messages createTask FIN

  // Message getTasks DEBUT
  noTaskFound: {
    result: false,
    key: "noTaskFound",
    message: "No task found.",
  },
  // Message getTasks FIN

  /******************************************************
                  Catch Error global
 ******************************************************/

  // Messages catch erreur DEBUT
  catchError: {
    result: false,
    message: "An unexpected error occurred. Please try again later.",
  },
  // Messages catch erreur FIN
};
