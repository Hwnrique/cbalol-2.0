import { Link } from "react-router-dom";

const Adm = () => {
  return (
    <div className="lg:w-1/2 mx-auto">
      <h2 className="text-white text-2xl lg:text-4xl font-bold mt-20 text-center">
        Área de criação
      </h2>
      <div className="flex justify-center lg:gap-5 gap-10 flex-wrap w-full p-40">
        <Link to={"/notice/create"}>
          <button
            className="h-20 w-40 bg-cyan-950 text-gray-300 font-semibold rounded-xl hover:-translate-y-2
                transition-all
                duration-300 hover:bg-cyan-900 hover:text-white"
          >
            Notícia
          </button>
        </Link>
        <Link to={"/jogador/create"}>
          <button
            className="h-20 w-40 bg-cyan-950 text-gray-300 font-semibold rounded-xl hover:-translate-y-2
                transition-all
                duration-300 hover:bg-cyan-900 hover:text-white"
          >
            Jogador
          </button>
        </Link>
        <Link to={"/time/create"}>
        <button
          className="h-20 w-40 bg-cyan-950 text-gray-300 font-semibold rounded-xl hover:-translate-y-2
                transition-all
                duration-300 hover:bg-cyan-900 hover:text-white"
        >
          Time
        </button>
        </Link>
        <Link to={"/partida/create"}>
        <button
          className="h-20 w-40 bg-cyan-950 text-gray-300 font-semibold rounded-xl hover:-translate-y-2
                transition-all
                duration-300 hover:bg-cyan-900 hover:text-white"
        >
          Partida
        </button>
        </Link>
        <Link to={"/mvp/create"}>
        <button
          className="h-20 w-40 bg-cyan-950 text-gray-300 font-semibold rounded-xl hover:-translate-y-2
                transition-all
                duration-300 hover:bg-cyan-900 hover:text-white"
        >
          Destaque da Semana
        </button>
        </Link>
      </div>
    </div>
  );
};

export default Adm;
