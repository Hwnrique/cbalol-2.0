import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../services/api";
import Loading from "../components/Loading";
import type { Time } from "../types/Time";
import type { Jogador } from "../types/Jogador";
import { FiSearch } from "react-icons/fi";
import JogadorModal from "../components/JogadorModal";

const Jogadores = () => {
  const [busca, setBusca] = useState("");
  const [timeFiltro, setTimeFiltro] = useState("");
  const [jogadorSelecionado, setJogadorSelecionado] = useState<string | null>(
    null,
  );

  const { data: jogadores, isLoading } = useQuery<Jogador[]>({
    queryKey: ["jogadores"],
    queryFn: () => api.get("/jogador").then((res) => res.data),
  });

  const { data: times } = useQuery<Time[]>({
    queryKey: ["time"],
    queryFn: () => api.get("/time").then((res) => res.data),
  });

  if (isLoading) return <Loading />;

  const jogadoresFiltrados = (jogadores ?? []).filter((jogador) => {
    const buscaOk = jogador.nickname.toLowerCase().includes(busca.toLowerCase());
    const timeOk = timeFiltro ? jogador.time === timeFiltro : true;
    return buscaOk && timeOk;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-white text-3xl lg:text-4xl font-black mb-10 text-center">
        Jogadores
      </h1>
      {/* Busca e filtro */}
      <div className="flex flex-col sm:flex-row gap-4 mb-10">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar jogador..."
            className="w-full bg-[#0c0c10] border border-gray-800 rounded-xl pl-10 pr-4 py-3 text-gray-300 focus:outline-none focus:border-cyan-900 placeholder:text-gray-600"
          />
        </div>
        <select
          value={timeFiltro}
          onChange={(e) => setTimeFiltro(e.target.value)}
          className="bg-[#0c0c10] border border-gray-800 rounded-xl px-4 py-3 text-gray-300 focus:outline-none focus:border-cyan-900 sm:w-48"
        >
          <option value="">Todos os times</option>
          {(times ?? []).map((time) => (
            <option key={time._id} value={time._id}>
              {time.nome}
            </option>
          ))}
        </select>
      </div>

      {/* Cards */}
      {jogadoresFiltrados.length === 0 ? (
        <p className="lg:block hidden text-gray-500 text-center mt-20 mb-40">
          Nenhum jogador encontrado.
        </p>
      ) : (
        <div className="lg:grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 hidden">
          {(jogadoresFiltrados ?? []).map((jogador) => (
            <div
              key={jogador._id}
              onClick={() => setJogadorSelecionado(jogador._id)}
              className="... cursor-pointer"
            >
              <div className="bg-[#0c0c10] border border-authPainel rounded-xl p-4 relative flex flex-col items-center gap-2 hover:border-cyan-900 transition-all hover:-translate-y-2 duration-300 lg:h-80">
                <img
                  src={jogador.foto}
                  alt={jogador.nickname}
                  className="w-full h-72 object-cover object-top rounded-lg border-gray-700"
                />
                <div className="absolute bg-[#0c0c10] w-full p-4 border border-authPainel rounded-b-xl bottom-0">
                  <p className="text-white font-bold text-sm text-center">
                    {jogador.nickname}
                  </p>
                  <p className="text-gray-500 text-xs text-center">
                    {jogador.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {jogadoresFiltrados.length === 0 ? (
        <p className="lg:hidden block text-gray-500 text-center mt-20 mb-40">
          Nenhum jogador encontrado.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:hidden">
          {jogadoresFiltrados.map((jogador) => (
            <div
              key={jogador._id}
              onClick={() => setJogadorSelecionado(jogador._id)}
              className="... cursor-pointer"
            >
              <div className="bg-[#0c0c10] border border-authPainel rounded-xl p-5 flex flex-col items-center gap-3 hover:border-cyan-900 transition-all hover:-translate-y-2 duration-300 cursor-pointer">
                <img
                  src={jogador.foto}
                  alt={jogador.nome}
                  className="w-20 h-20 rounded-full object-cover border-2 border-gray-700"
                />
                <div className="text-center">
                  <p className="text-white font-bold">{jogador.nickname}</p>
                  <p className="text-gray-500 text-sm">{jogador.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {jogadorSelecionado && (
        <JogadorModal
          jogadorId={jogadorSelecionado}
          onClose={() => setJogadorSelecionado(null)}
        />
      )}
    </div>
  );
};

export default Jogadores;
