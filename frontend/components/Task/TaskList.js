import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function TaskList({ tasks, onDelete }) {
  const router = useRouter();

  const handleNewTask = () => {
    router.push("tasks/new");
  };

  const chunkTasks = (tasks, chunkSize) => {
    const result = [];
    for (let i = 0; i < tasks.length; i += chunkSize) {
      result.push(tasks.slice(i, i + chunkSize));
    }
    return result;
  };
  const groupedTasks = chunkTasks(tasks, 5);

  return (
    <div>
      <h2 className="my-4 text-center text-5xl">Vos tâches</h2>
      {tasks.length === 0 ? (
        <div className="text-center mb-4">
          <p>Vous n'avez aucune tâche.</p>
        </div>
      ) : (
        <div className="flex gap-4">
          {groupedTasks.map((group, columnIndex) => (
            <div key={columnIndex} className="flex flex-col">
              {group.map((task, index) => (
                <div
                  className={
                    groupedTasks.length === 1
                      ? "w-[30%] mx-auto my-4 border border-red-600 p-2 rounded-b-2xl relative"
                      : "w-[85%] mx-auto my-4 border border-red-600 p-2 rounded-b-2xl relative"
                  }
                  key={index}
                >
                  <FontAwesomeIcon
                    icon={faXmark}
                    className="absolute right-2 cursor-pointer"
                    onClick={() => onDelete(task._id)}
                  />

                  <div className="text-center">
                    <div>{task.title}</div>
                    <div>{task.description}</div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      <div className="w-[30%] mx-auto mb-2 text-center">
        <button
          className="border border-red-950 p-2 rounded-xl"
          onClick={() => handleNewTask()}
        >
          Ajouter une nouvelle tâche
        </button>
      </div>
    </div>
  );
}
