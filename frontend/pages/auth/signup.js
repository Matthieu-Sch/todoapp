import AuthForm from "../../components/Authform";

export default function Signup() {
  const apiFetch = "http://localhost:3000/users";

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
        // Récupère le message d'erreur du backend
        const errorData = await response.json();
        return { success: false, message: errorData.message };
      }
      const data = await response.json();
      console.log("Réponse API : ", data);
      return { success: true, token: data.token };
    } catch (error) {
      console.log(error);
      return { success: false, message: "Connexion impossible." };
    }
  };
  return (
    <div className="w-full">
      <AuthForm mode="signup" onSignup={signup} />
    </div>
  );
}
