import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function TaskList({ tasks, onDelete }) {
  const router = useRouter();

  const handleNewTask = () => {
    router.push("tasks/new");
  };

  return (
    <div className="bg-red-100 min-h-[80vh] p-8 flex flex-col items-center">
      <h2 className="mb-6 text-center text-4xl font-bold text-gray-800">
        Vos tâches
      </h2>

      {!tasks || tasks.length === 0 ? (
        <div className="text-center mb-4">
          <p className="text-gray-600 text-lg">
            Vous n'avez aucune tâche pour le moment.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {tasks.map((task, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 relative hover:shadow-2xl transition-shadow duration-300"
            >
              <FontAwesomeIcon
                icon={faXmark}
                className="absolute right-4 top-4 text-red-500 cursor-pointer hover:text-red-700"
                onClick={() => onDelete(task._id)}
              />

              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {task.title}
                </h3>
                <p className="text-gray-600">{task.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="w-full flex justify-center mt-6">
        <button
          className="bg-red-600 text-white px-6 py-3 rounded-lg shadow hover:bg-red-700 transition duration-300"
          onClick={() => handleNewTask()}
        >
          Ajouter une nouvelle tâche
        </button>
      </div>
    </div>
  );
}
