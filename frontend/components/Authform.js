import { useState } from "react";

export default function AuthForm({ mode, onSignin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async () => {
    if (!email.trim() || !password.trim()) {
      alert("Veuillez remplir tous les champs !");
      return;
    }

    const success = await onSignin(user);
    if (success) {
      setEmail("");
      setPassword("");
    } else {
      alert("Erreur lors de la connexion.");
    }
  };

  return (
    <div className="w-full">
      <h3 className="text-center text-5xl my-6">Connexion</h3>
      <form onSubmit={handleSubmit} className="flex my-4">
        <div className="w-[40%] mx-auto border border-pink-600 px-2 py-8 rounded-lg flex flex-col justify-center items-center gap-5">
          <div className="w-full flex flex-col items-center mb-4">
            <label className="mb-2">E-mail</label>
            <input
              type="email"
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
                onChange={(e) => setConfirmPassword(e.target.confirmPassword)}
              ></input>
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
