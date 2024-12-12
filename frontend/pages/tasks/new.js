import { useRouter } from "next/router";
import TaskForm from "../../components/Task/TaskForm";
import { useSelector } from "react-redux";

export default function NewTask() {
  const router = useRouter();
  const apiFetch = "http://localhost:3000/tasks";
  const token = useSelector((state) => state.auth.token);

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
    <div className="w-full flex items-center justify-center min-h-[80vh] bg-red-100">
      <TaskForm onAddTask={handleAddTask} />
    </div>
  );
}
