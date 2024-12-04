import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function TaskList({ tasks }) {
  const router = useRouter();

  const handleNewTask = () => {
    router.push("tasks/new");
  };

  return (
    <div>
      <h2 className="my-4 text-center">Vos tâches</h2>

      {tasks.map((task, index) => (
        <div
          className="w-[30%] mx-auto my-4 border border-red-600 p-2 rounded-b-2xl"
          key={index}
        >
          <FontAwesomeIcon icon={faXmark} />
          <div className="text-center">
            <div>{task.title}</div>
            <div>{task.description}</div>
          </div>
        </div>
      ))}

      <div className="w-[30%] m-auto text-center">
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
