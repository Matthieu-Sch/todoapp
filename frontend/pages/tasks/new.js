import { useRouter } from "next/router";
import TaskForm from "../../components/Task/TaskForm";

export default function NewTask() {
  const apiFetch = "http://localhost:3000/tasks";
  const token = "RYJYtw5ByEqVEtxZ2WiwU_kXaqd7Ncu7";

  const router = useRouter();

  const handleAddTask = async (task) => {
    try {
      const response = await fetch(`${apiFetch}/createTask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(task),
      });

      if (!response.ok) {
        console.error("Erreur API : ", await response.json());
        return false; // Retourne false en cas d'erreur
      }

      router.push("/tasks");
      return true;
    } catch (error) {
      console.log(error);
      alert("Impossible d'ajouter la tâche. Réessayez.");
    }
  };

  return (
    <div className="w-full flex items-center justify-center">
      <TaskForm onAddTask={handleAddTask} />
    </div>
  );
}
