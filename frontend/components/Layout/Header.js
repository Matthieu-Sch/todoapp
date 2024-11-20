export default function Header() {
  return (
    <header className="bg-slate-400 px-12 py-6 flex items-center justify-between">
      <h1>Todo App</h1>
      <nav>
        <ul className="flex w-44 justify-between ">
          <li className="text-pink-100 border border-l-pink-100 py-2 px-4 rounded-lg bg-pink-950">
            Signin
          </li>
          <li className="border border-gray-600 py-2 px-4 rounded-lg">
            Signup
          </li>
        </ul>
      </nav>
    </header>
  );
}
