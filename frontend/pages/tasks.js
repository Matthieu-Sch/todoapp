import TaskList from "../components/Task/TaskList";
import TaskForm from "../components/Task/TaskForm";

export default function Task() {
  return (
    <div className="w-full">
      <TaskList />
      <TaskForm />
    </div>
  );
}
