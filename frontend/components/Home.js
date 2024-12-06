import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import { useEffect } from "react";

function Home() {
  const router = useRouter();

  // useEffect(() => {
  //   router.push("/tasks");
  // }, [router]);

  return (
    <div className="w-full flex flex-col justify-center text-center">
      <h1 className="text-4xl font-bold text-pink-950 mb-4">
        Welcome to Todo App
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        Une application pour organiser vos tâches facilement et efficacement !
      </p>
    </div>
  );
}

export default Home;
