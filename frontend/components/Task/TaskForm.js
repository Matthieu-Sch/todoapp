export default function TaskForm() {
  return (
    <div>
      <form>
        <div className="flex flex-col items-center">
          <label className="text-center mb-4 pb-2">Nom de la tâche</label>
          <input className="w-80 text-white border-b-2 border-l-2 bg-gray-950 rounded-lg bg-transparent focus:outline-none px-2" />
          <span className="m-3"></span>
          <label className="text-center mb-4">Description</label>
          <textarea className="w-80 h-28 text-white border-b-2 border-l-2 bg-gray-950 rounded-lg bg-transparent focus:outline-none px-2" />
        </div>
      </form>
    </div>
  );
}
