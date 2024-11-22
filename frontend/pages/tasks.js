import TaskCard from "../components/Task/TaskCard";
import TaskForm from "../components/Task/TaskForm";

export default function Task({ Component, pageProps }) {
  return (
    <div className="w-full">
      <TaskCard />
      <TaskForm />
    </div>
  );
}
