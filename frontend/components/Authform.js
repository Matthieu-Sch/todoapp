import { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../reducers/auth";

export default function AuthForm({ mode, onSignup, onSignin }) {
  const router = useRouter();
  const dispatch = useDispatch();
  // const token = useSelector((state) => state.auth.token);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    // Vérifie si les champs sont bien remplis
    if (
      !email.trim() ||
      !password.trim() ||
      (mode === "signup" && !confirmPassword.trim())
    ) {
      setErrorMessage("Veuillez remplir tous les champs.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Attention : vos mots de passe ne correspondent pas.");
      return;
    }
    const newUser = { email, password, confirmPassword };
    console.log(newUser);
    const result = await onSignup(newUser);
    console.log(result);
    console.log("Résultat complet de onSignup : ", result);
    if (result.success) {
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setErrorMessage("");
      setSuccessMessage("Félicitations, votre compte à bien été créé.");
      dispatch(login({ token: result.token }));

      setTimeout(() => {
        router.push("/tasks");
      }, 2000);
    } else {
      setErrorMessage(result.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    // Vérifie si les champs sont bien remplis
    if (!email.trim() || !password.trim()) {
      setErrorMessage("Veuillez remplir tous les champs.");
      return;
    }
    const user = { email, password };
    console.log(user);
    const result = await onSignin(user);
    if (result.success) {
      setEmail("");
      setPassword("");
      setErrorMessage("");
      setSuccessMessage("Connexion réussie !");
      dispatch(login({ token: result.token }));

      setTimeout(() => {
        router.push("/tasks");
      }, 1000);
    } else {
      setErrorMessage(result.message);
    }
  };

  return (
    <div className="w-full flex justify-center items-center min-h-[80vh] bg-red-100">
      <div className="w-[90%] max-w-md bg-white shadow-lg rounded-lg p-8">
        <h3 className="text-center text-3xl font-bold text-red-600 mb-6">
          {mode === "login" ? "Connexion" : "Inscription"}
        </h3>
        <form
          onSubmit={mode === "login" ? handleLogin : handleSignup}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700 mb-2"
            >
              E-mail
            </label>
            <input
              id="email"
              type="email"
              placeholder="Entrez votre e-mail"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700 mb-2"
            >
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              placeholder="Entrez votre mot de passe"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {mode === "signup" && (
            <div className="flex flex-col">
              <label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-gray-700 mb-2"
              >
                Confirmez votre mot de passe
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirmez votre mot de passe"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          )}

          {errorMessage && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative">
              <p>{errorMessage}</p>
            </div>
          )}

          {successMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded relative">
              <p>{successMessage}</p>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-red-600 text-white font-medium py-2 rounded-md shadow-md hover:bg-red-700 transition duration-300"
          >
            {mode === "login" ? "Se connecter" : "S'inscrire"}
          </button>
        </form>
      </div>
    </div>
  );
}
