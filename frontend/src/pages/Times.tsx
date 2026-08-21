import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../services/api";
import Loading from "../components/Loading";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import { useState } from "react";
import JogadorModal from "../components/JogadorModal";

const Times = () => {
  const { id } = useParams();
  const { token, adm } = useAuth();
  const [jogadorSelecionado, setJogadorSelecionado] = useState<string | null>(
    null,
  );
  const isAuthenticated = !!token;

  const { data: time, isLoading } = useQuery({
    queryKey: ["time", id],
    queryFn: () => api.get(`/time/${id}`).then((res) => res.data),
  });

  const { data: todosOsTimes } = useQuery({
    queryKey: ["time"],
    queryFn: () => api.get("/time").then((res) => res.data),
  });

  const navigate = useNavigate();

  const handleExcluir = async () => {
    try {
      await api.delete(`/time/${id}`);
      toast.success("Time excluído!");
      navigate("/");
    } catch (error) {
      toast.error("Erro ao excluir time!");
    }
  };

  if (isLoading) return <Loading />;
  if (!time) return null;

  const outrosTimes = (todosOsTimes ?? [])
    .filter((t: any) => t._id !== id)
    .slice(0, 3);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 lg:max-w-[100rem]">
      {/* Header do time */}
      <div className="flex flex-col items-center gap-4 mb-10">
        <img
          src={time.logo}
          alt={time.nome}
          className="w-32 h-32 object-contain"
        />
        <h1 className="text-white text-4xl font-black">{time.nome}</h1>
      </div>
      {/* Banner + Descrição */}
      <div className="flex flex-col lg:flex-row gap-8 mb-10">
        <img
          src={time.banner}
          alt={time.nome}
          className="w-full lg:w-1/2 rounded-xl object-cover max-h-96"
        />
        <p className="text-gray-300 leading-relaxed lg:w-1/2 flex items-center">
          {time.descricao}
        </p>
      </div>
      {/* Botões admin */}
      {isAuthenticated && adm && (
        <div className="flex gap-2 mb-6">
          <Link to={`/time/edit/${id}`}>
            <button className="bg-cyan-950 rounded-lg p-2 text-gray-300 font-bold hover:-translate-y-2 transition-all duration-300 hover:bg-cyan-900 hover:text-white">
              Editar
            </button>
          </Link>
          <button
            onClick={handleExcluir}
            className="bg-red-950 rounded-lg p-2 text-gray-300 font-bold hover:-translate-y-2 transition-all duration-300 hover:bg-red-900 hover:text-white"
          >
            Excluir
          </button>
        </div>
      )}
      {/* Jogadores PC */}
      <div className="mb-10">
        <h2 className="text-white text-2xl font-bold mb-6">Elenco</h2>
        <div className="lg:grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 hidden">
          {(time.jogadores ?? []).slice(0, 5).map((jogador: any) => (
            <div
              key={jogador._id}
              onClick={() => setJogadorSelecionado(jogador._id)}
              className="... cursor-pointer"
            >
              <div className="bg-[#0c0c10] border border-authPainel rounded-xl p-4 relative flex flex-col items-center gap-2 hover:border-cyan-900 transition-all hover:-translate-y-2 duration-300 lg:h-80">
                <img
                  src={jogador.foto}
                  alt={jogador.nome}
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
        {/* Jogadores Celular */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:hidden">
          {(time.jogadores ?? []).slice(0, 5).map((jogador: any) => (
            <div
              key={jogador._id}
              onClick={() => setJogadorSelecionado(jogador._id)}
              className="... cursor-pointer"
            >
              <div className="bg-[#0c0c10] border border-authPainel rounded-xl p-4 flex flex-col items-center gap-2 hover:border-cyan-900 transition-all hover:-translate-y-2 duration-300">
                <img
                  src={jogador.foto}
                  alt={jogador.nome}
                  className="w-16 h-16 rounded-full object-cover border-2 border-gray-700"
                />
                <p className="text-white font-bold text-sm text-center">
                  {jogador.nickname}
                </p>
                <p className="text-gray-500 text-xs">{jogador.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Conheça outros times */}
      {outrosTimes.length > 0 && (
        <div>
          <h2 className="text-white text-2xl font-bold mb-6">
            Conheça outros times
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {outrosTimes.map((t: any) => (
              <Link key={t._id} to={`/times/${t._id}`}>
                <div className="bg-[#0c0c10] border border-authPainel rounded-xl p-6 flex flex-col items-center gap-3 hover:border-cyan-900 transition-all hover:-translate-y-2 duration-300">
                  <img
                    src={t.logo}
                    alt={t.nome}
                    className="w-16 h-16 object-contain"
                  />
                  <p className="text-white font-bold text-center">{t.nome}</p>
                </div>
              </Link>
            ))}
          </div>
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

export default Times;
