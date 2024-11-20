import { useEffect, useState } from "react";

export default function TaskCart() {
  const apiFetch = "http://localhost:3000/tasks";
  const token = "RYJYtw5ByEqVEtxZ2WiwU_kXaqd7Ncu7"; // Remplacez par un token valide
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const response = await fetch(`${apiFetch}/getTasks`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch the tasks");
    }
    const data = await response.json();
    console.log(data);
    setTasks(data.tasks);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h2>Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}
