function Home() {
  return (
    <div className="min-h-[80vh] bg-gray-50 flex flex-col justify-center items-center px-6">
      <h1 className="text-5xl font-extrabold text-red-600 mb-4 drop-shadow-lg">
        Welcome to Todo App
      </h1>

      <p className="text-lg text-gray-700 mb-6 text-center max-w-xl leading-relaxed">
        Organisez vos tâches facilement et efficacement avec une interface
        simple et moderne conçue pour répondre à vos besoins quotidiens.
      </p>
    </div>
  );
}

export default Home;
