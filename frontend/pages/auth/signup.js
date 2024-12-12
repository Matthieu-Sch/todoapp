import { useSelector } from "react-redux";
import AuthForm from "../../components/Authform";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Signup() {
  const router = useRouter();
  const apiFetch = "http://localhost:3000/users";
  const isConnected = useSelector((state) => state.auth.isConnected);

  useEffect(() => {
    if (isConnected) {
      router.push("/tasks"); // Redirection si l'utilisateur est connecté
    }
  }, [isConnected, router]);

  const signup = async (newUser) => {
    try {
      // console.log("utilisateur envoyé : ", user);
      const response = await fetch(`${apiFetch}/signup`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      if (!response.ok) {
        // Récupère le message d'erreur du backend
        const errorData = await response.json();
        return { success: false, message: errorData.message };
      }
      const data = await response.json();
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
