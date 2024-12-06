import { useState } from "react";

export default function TaskForm({ onAddTask }) {
  // Gestion de l'état des input
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Gestion de l'ajout d'une tâche via l'inverse data flow
  const handleSubmit = async (e) => {
    // Vérification du champs title
    if (!title.trim()) {
      alert("Le champs 'Nom de la tâche' est obligatoire");
      return;
    }

    const newTask = { title, description };
    console.log("Tâche bien envoyé : ", newTask);

    const success = await onAddTask(newTask);
    if (success) {
      setTitle("");
      setDescription("");
    } else {
      alert("Erreur lors de l'ajout d'une tâche");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col items-center mb-2">
        <div className="flex flex-col mb-2">
          <label className="text-center mb-4 pb-2">Nom de la tâche</label>
          <input
            className="w-80 text-black border border-pink-950 bg-transparent focus:outline-none p-2 rounded-lg"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex flex-col mb-2">
          <label className="text-center mb-4">Description</label>
          <textarea
            className="w-80 h-44 text-black border border-pink-950 bg-transparent focus:outline-none p-2 rounded-lg"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>
      <div className="text-end">
        <button type="submit" className="border border-red-950 p-2 rounded-xl">
          Ajouter
        </button>
      </div>
    </form>
  );
}
