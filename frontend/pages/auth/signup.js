import AuthForm from "../../components/Authform";

export default function Signup() {
  const apiFetch = "http://localhost:3000/user";

  const signup = async (user) => {
    try {
      console.log("utilisateur envoyé : ", user);
      const response = await fetch(`${apiFetch}/signup`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        console.error("Erreur API : ", await response.json());
        return false; // Retourne false en cas d'erreur
      }
      return true;
    } catch (error) {
      console.log(error);
      alert("Connexion impossible.");
      return false;
    }
  };
  return (
    <div className="w-full">
      <AuthForm mode="signup" onSignup={signup} />
    </div>
  );
}
