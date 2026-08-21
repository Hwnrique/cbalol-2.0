import { Link } from "react-router-dom";
import api from "../services/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/AuthContext";

const PreviousGames = () => {
  const { data: historico } = useQuery({
    queryKey: ["partidas", "Finalizado"],
    queryFn: () =>
      api.get("/partida?status=Finalizado").then((res) => res.data),
  });

  const ultimasPartidas = (historico ?? []).slice(0, 5);

  const { token, adm } = useAuth();
  const isAuthenticated = !!token;

  const queryClient = useQueryClient();

  const handleExcluir = async (partidaId: string) => {
    try {
      await api.delete(`/partida/${partidaId}`);

      queryClient.invalidateQueries({
        queryKey: ["partidas", "Finalizado"],
      });

      toast.success("Partida excluída!");
    } catch {
      toast.error("Erro ao excluir partida!");
    }
  };

  if (!ultimasPartidas.length) return null;

  return (
    <div className="bg-[#0c0c10] border border-authPainel rounded-xl p-6 w-full max-w-xl mx-auto">
      <h2 className="text-white text-xl font-bold text-center mb-6">
        Últimos Resultados
      </h2>

      <div className="flex flex-col gap-3">
        {ultimasPartidas.map((partida: any) => (
          <div
            key={partida._id}
            className="bg-bgsite border border-authPainel rounded-lg p-3"
          >
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              {/* Informações */}
              <div className="flex items-center justify-between flex-1 min-w-0">
                <div className="flex items-center gap-2 w-[38%] min-w-0">
                  <img
                    src={partida.confronto[0]?.logo}
                    alt={partida.confronto[0]?.nome}
                    className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                  />
                  <p className="text-gray-300 text-sm font-bold truncate">
                    {partida.confronto[0]?.nome}
                  </p>
                </div>

                <div className="flex flex-col items-center px-2 flex-shrink-0">
                  <p className="text-white font-bold text-lg">
                    {partida.placarTime1} x {partida.placarTime2}
                  </p>
                  <span className="text-gray-500 text-xs">
                    {partida.modelo}
                  </span>
                </div>

                <div className="flex items-center justify-end gap-2 w-[38%] min-w-0">
                  <p className="text-gray-300 text-sm font-bold truncate text-right">
                    {partida.confronto[1]?.nome}
                  </p>
                  <img
                    src={partida.confronto[1]?.logo}
                    alt={partida.confronto[1]?.nome}
                    className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                  />
                </div>
              </div>

              {/* Botões */}
              {isAuthenticated && adm && (
                <div className="flex gap-2 lg:flex-col xl:flex-row lg:min-w-[150px]">
                  <Link
                    to={`/partida/edit/${partida._id}`}
                    className="flex-1"
                  >
                    <button className="w-full bg-cyan-950 rounded-lg py-2 px-3 text-gray-300 font-bold hover:bg-cyan-900 hover:text-white transition-all duration-300">
                      Editar
                    </button>
                  </Link>

                  <button
                    onClick={() => handleExcluir(partida._id)}
                    className="flex-1 bg-red-950 rounded-lg py-2 px-3 text-gray-300 font-bold hover:bg-red-900 hover:text-white transition-all duration-300"
                  >
                    Excluir
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreviousGames;