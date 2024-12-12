import { useRouter } from "next/router";
import AuthForm from "../../components/Authform";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function Login() {
  const router = useRouter();
  const apiFetch = "http://localhost:3000/users";
  const isConnected = useSelector((state) => state.auth.isConnected);

  useEffect(() => {
    if (isConnected) {
      router.push("/tasks"); // Redirection si l'utilisateur est connecté
    }
  }, [isConnected, router]);

  const signin = async (user) => {
    try {
      const response = await fetch(`${apiFetch}/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
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
      <AuthForm mode="login" onSignin={signin} />
    </div>
  );
}
