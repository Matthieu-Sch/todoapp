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
    <header className="bg-slate-400 px-12 py-6 flex items-center justify-between">
      <h1>Todo App</h1>
      <nav>
        {!isConnected ? (
          <ul className="flex w-44 justify-between ">
            <li
              className="text-pink-100 border border-l-pink-100 py-2 px-4 rounded-lg bg-pink-950 cursor-pointer"
              onClick={() => handleLogin()}
            >
              Signin
            </li>
            <li
              className="border border-gray-600 py-2 px-4 rounded-lg cursor-pointer"
              onClick={() => handleSignup()}
            >
              Signup
            </li>
          </ul>
        ) : (
          <ul>
            <li
              className="border border-gray-600 py-2 px-4 rounded-lg cursor-pointer"
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
