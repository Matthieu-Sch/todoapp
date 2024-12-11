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
    <div className="w-full">
      <h3 className="text-center text-5xl my-6">Connexion</h3>
      <form
        onSubmit={mode === "login" ? handleLogin : handleSignup}
        className="flex my-4"
      >
        <div className="w-[40%] mx-auto border border-pink-600 px-2 py-8 rounded-lg flex flex-col justify-center items-center gap-5">
          <div className="w-full flex flex-col items-center mb-4">
            <label className="mb-2">E-mail</label>
            <input
              // type="email"
              placeholder="Veuillez saisir votre e-mail"
              className="w-3/4 p-2 rounded-md focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div className="w-full flex flex-col items-center mb-4">
            <label className="mb-2">Mot de passe</label>
            <input
              type="password"
              placeholder="Veuillez saisir votre mot de passe"
              className="w-3/4 p-2 rounded-md focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          {mode === "signup" && (
            <div className="w-full flex flex-col items-center">
              <label className="mb-2">Confirmer votre mot de passe</label>
              <input
                type="password"
                placeholder="Confirmer votre mot de passe"
                className="w-3/4 p-2 rounded-md focus:outline-none"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></input>
            </div>
          )}
          {errorMessage && (
            <div className="border border-red-950 bg-red-500 p-3 rounded-md transition-opacity duration-1000">
              <p className="text-red-950">{errorMessage}</p>
            </div>
          )}
          {successMessage && (
            <div className="border border-green-950 bg-green-500 p-3 rounded-md">
              <p className="text-green-950">{successMessage}</p>
            </div>
          )}
          <div>
            <button
              type="submit"
              className="border border-pink-950 p-3 rounded-md hover:bg-pink-950 hover:text-white hover:border-pink-50 transition duration-200"
            >
              {mode === "login" ? "Se connecter" : "S'inscrire"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
