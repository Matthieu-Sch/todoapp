import { useState } from "react";
import { useRouter } from "next/router";

export default function AuthForm({ mode, onSignup }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successSignup, setSuccessSignup] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isConnected, setIsConnected] = useState(true);

  const handleSignup = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    if (
      !email.trim() ||
      !password.trim() ||
      (mode === "signup" && !confirmPassword.trim())
    ) {
      setErrorMessage("Veuillez remplir tous les champs !");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Attention : vos mots de passe ne correspondent pas.");
      return;
    }
    const newUser = { email, password, confirmPassword };
    console.log(newUser);
    const result = await onSignup(newUser);
    if (result.success) {
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setSuccessSignup("Félicitations, votre compte à bien été créé.");

      setTimeout(() => {
        router.push("/tasks");
        setIsConnected(true);
      }, 2000);
    } else {
      setErrorMessage(result.message);
      setIsConnected(false);
    }
  };

  const handleLogin = async () => {};

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
          {successSignup && (
            <div className="border border-green-950 bg-green-500 p-3 rounded-md">
              <p className="text-green-950">{successSignup}</p>
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
