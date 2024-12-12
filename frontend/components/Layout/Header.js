import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../reducers/auth";

export default function Header() {
  const router = useRouter();
  const dispatch = useDispatch();
  const isConnected = useSelector((state) => state.auth.isConnected);

  const handleSignup = () => {
    router.push("/auth/signup");
  };

  const handleLogin = () => {
    router.push("/auth/login");
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  return (
    <header className="bg-red-600 px-8 py-4 flex items-center justify-between shadow-md">
      {/* Titre de l'application */}
      <h1 className="text-white text-2xl font-bold tracking-wide">Todo App</h1>

      {/* Navigation */}
      <nav>
        {!isConnected ? (
          <ul className="flex gap-4">
            {/* Bouton Signin */}
            <li
              className="bg-white text-red-600 border border-red-600 py-2 px-4 rounded-md cursor-pointer hover:bg-red-600 hover:text-white transition duration-300"
              onClick={() => handleLogin()}
            >
              Signin
            </li>

            {/* Bouton Signup */}
            <li
              className="bg-white text-red-600 border border-red-600 py-2 px-4 rounded-md cursor-pointer hover:bg-red-600 hover:text-white transition duration-300"
              onClick={() => handleSignup()}
            >
              Signup
            </li>
          </ul>
        ) : (
          <ul>
            {/* Bouton Déconnexion */}
            <li
              className="bg-white text-red-600 border border-red-600 py-2 px-4 rounded-md cursor-pointer hover:bg-red-600 hover:text-white transition duration-300"
              onClick={() => handleLogout()}
            >
              Déconnexion
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
}
