import TaskList from "../../components/Task/TaskList";
import TaskForm from "../../components/Task/TaskForm";
import { useState, useEffect } from "react";

export default function Tasks() {
  const apiFetch = "http://localhost:3000/tasks";
  const token = "RYJYtw5ByEqVEtxZ2WiwU_kXaqd7Ncu7";
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`${apiFetch}/getTasks`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des tâches");
        }
        const data = await response.json();
        console.log(data.tasks);
        setTasks(data.tasks);
        console.log(tasks);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchTasks();
  }, []);

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await fetch(`${apiFetch}/deleteTask/${taskId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        // Mettre à jour la liste des tâches après suppression
        setTasks((prevTasks) =>
          prevTasks.filter((task) => task._id !== taskId)
        );
      } else if (!response.ok) {
        console.error("Erreur API : ", await response.json());
        return false;
      } else {
        console.error("Erreur lors de la suppression de la tâche.");
      }
    } catch (error) {}
  };
  return (
    <div className="w-full">
      <TaskList tasks={tasks} onDelete={handleDeleteTask} />
    </div>
  );
}
