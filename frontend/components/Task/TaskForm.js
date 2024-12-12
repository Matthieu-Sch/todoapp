import { useState } from "react";

export default function TaskForm({ onAddTask }) {
  // Gestion de l'état des input
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Gestion de l'ajout d'une tâche via l'inverse data flow
  const handleSubmitTask = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    // Vérification du champs title
    if (!title.trim()) {
      alert("Le champs 'Nom de la tâche' est obligatoire");
      return;
    }

    const newTask = { title, description };
    // console.log("Tâche bien envoyé : ", newTask);

    const success = await onAddTask(newTask);
    if (success) {
      setTitle("");
      setDescription("");
    } else {
      alert("Erreur lors de l'ajout d'une tâche");
    }
  };

  return (
    <form
      onSubmit={handleSubmitTask}
      className="bg-white shadow-lg shadow-black rounded-lg p-8 w-full max-w-md mx-auto"
    >
      <h2 className="text-center text-3xl font-bold text-gray-800 mb-6">
        Ajouter une tâche
      </h2>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label
            htmlFor="task-title"
            className="text-gray-700 font-medium mb-2"
          >
            Nom de la tâche
          </label>
          <input
            id="task-title"
            type="text"
            placeholder="Entrez le nom de la tâche"
            className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-red-500 focus:outline-none transition"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="task-description"
            className="text-gray-700 font-medium mb-2"
          >
            Description
          </label>
          <textarea
            id="task-description"
            placeholder="Entrez la description de la tâche"
            className="w-full p-3 h-32 border rounded-lg shadow-sm focus:ring-2 focus:ring-red-500 focus:outline-none transition resize-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
      </div>

      {/* Bouton pour soumettre */}
      <div className="mt-6 text-center">
        <button
          type="submit"
          className="bg-red-600 text-white px-6 py-3 rounded-lg shadow hover:bg-red-700 transition duration-300"
        >
          Ajouter
        </button>
      </div>
    </form>
  );
}
