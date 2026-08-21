import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import api from "../services/api";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface JogadorModalProps {
  jogadorId: string;
  onClose: () => void;
}

const JogadorModal = ({ jogadorId, onClose }: JogadorModalProps) => {
  const { data: jogador, isLoading } = useQuery({
    queryKey: ["jogador", jogadorId],
    queryFn: () => api.get(`/jogador/${jogadorId}`).then((res) => res.data),
  });

  const { token, adm } = useAuth();
  const isAuthenticated = !!token;

  const navigate = useNavigate();

  const handleExcluir = async () => {
    try {
      await api.delete(`/jogador/${jogadorId}`);
      toast.success("Jogador excluído!");
      navigate("/");
    } catch (error) {
      toast.error("Erro ao excluir jogador!");
    }
  };

  // fecha o modal ao pressionar ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // bloqueia o scroll da página quando o modal está aberto
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <>
      {/* Overlay */}
      <div onClick={onClose} className="fixed inset-0 bg-black/70 z-40" />
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-[#0c0c10] border border-authPainel rounded-2xl w-full max-w-3xl relative">
          {/* Botão fechar */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <IoClose className="text-2xl" />
          </button>
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-gray-400">Carregando...</p>
            </div>
          ) : jogador ? (
            <div className="flex flex-col sm:flex-row gap-6 p-8">
              {/* Foto */}
              <div className="flex flex-col items-center gap-3 sm:w-64 shrink-0">
                <img
                  src={jogador.foto}
                  alt={jogador.nome}
                  className="w-36 h-36 md:h-96 md:w-56 rounded-full object-cover border-4 border-gray-700 object-top lg:rounded-none"
                />
                <p className="text-white font-black text-xl text-center">
                  {jogador.nickname}
                </p>
                <span className="text-cyan-900 font-bold text-sm px-3 py-1 border border-cyan-900 rounded-full">
                  {jogador.role}
                </span>
              </div>
              {/* Informações */}
              <div className="flex flex-col gap-4 flex-1">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500 text-xs mb-1">
                      Nome
                    </p>
                    <p className="text-gray-300 font-bold mb-4">
                      {jogador.nome}
                    </p>
                    <p className="text-gray-500 text-xs mb-1">Idade</p>
                    <p className="text-gray-300 font-bold">
                      {jogador.idade} anos
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs mb-1">Time atual</p>
                    {jogador.time ? (
                      <div className="flex items-center gap-2">
                        <img
                          src={jogador.time.logo}
                          alt={jogador.time.nome}
                          className="w-5 h-5 object-contain"
                        />
                        <p className="text-gray-300 font-bold">
                          {jogador.time.nome}
                        </p>
                      </div>
                    ) : (
                      <p className="text-gray-500">Sem time</p>
                    )}
                  </div>
                </div>
                {/* Títulos */}
                {jogador.titulos && jogador.titulos.length > 0 && (
                  <div>
                    <p className="text-gray-500 text-xs mb-2">Títulos</p>
                    <div className="flex flex-wrap gap-2">
                      {jogador.titulos.map((titulo: string, i: number) => (
                        <span
                          key={i}
                          className="text-xs text-gray-300 bg-bgsite border border-gray-800 px-3 py-1 rounded-full"
                        >
                          🏆 {titulo}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {/* Histórico de times */}
                {jogador.historico && jogador.historico.length > 0 && (
                  <div>
                    <p className="text-gray-500 text-xs mb-2">
                      Histórico de times
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {jogador.historico.map((time: any) => (
                        <div key={time._id} className="flex items-center gap-2">
                          <img
                            src={time.logo}
                            alt={time.nome}
                            className="w-5 h-5 object-contain"
                          />
                          <p className="text-gray-400 text-sm">{time.nome}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {isAuthenticated && adm && (
                  <div className="flex gap-2">
                    <Link to={`/jogador/edit/${jogador._id}`}>
                      <button className="bg-cyan-950 rounded-lg p-2 text-gray-300 font-bold hover:-translate-y-2 transition-all duration-300 hover:bg-cyan-900 hover:text-white">
                        Editar
                      </button>
                    </Link>
                    <button onClick={handleExcluir} className="bg-red-950 rounded-lg p-2 text-gray-300 font-bold hover:-translate-y-2 transition-all duration-300 hover:bg-red-900 hover:text-white">
                      Excluir
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-center p-8">
              Jogador não encontrado.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default JogadorModal;
