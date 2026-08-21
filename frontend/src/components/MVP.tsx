import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import api from "../services/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const MVP = () => {
  const { data: mvp } = useQuery({
    queryKey: ["mvp-atual"],
    queryFn: () => api.get("/mvp/atual").then((res) => res.data),
  });

  const { token, adm } = useAuth();
  const isAuthenticated = !!token;

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleExcluir = async () => {
    try {
      await api.delete(`/mvp/${mvp._id}`);
      queryClient.invalidateQueries({ queryKey: ["mvp-atual"] });
      toast.success("Destaque excluído!");
      navigate("/");
    } catch (error) {
      toast.error("Erro ao excluir destaque!");
    }
  };

  if (!mvp) return null;

  const formatarData = (data: string) => {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "numeric",
      month: "long",
    }).format(new Date(data));
  };

  return (
    <div className="bg-[#0c0c10] border border-authPainel rounded-xl p-6 w-full max-w-sm lg:max-w-xl lg:h-72 mx-auto">
      <h2 className="text-white text-xl font-bold text-center mb-1">
        Destaque da Semana
      </h2>
      <p className="text-gray-500 text-sm text-center mb-6">
        {formatarData(mvp.dataInicio)} — {formatarData(mvp.dataFim)}
      </p>
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="text-cyan-900 font-bold text-4xl">
              {mvp.pontuacao}
            </span>
            <span className="text-gray-500 text-sm">pts</span>
          </div>
          <div className="flex items-center gap-2">
            <img
              src={mvp.jogadorId.time?.logo}
              alt={mvp.jogadorId.time?.nome}
              className="w-10 h-8 rounded-full object-cover"
            />
            <p className="text-gray-400 text-base font-bold">
              {mvp.jogadorId.time?.nome ?? "Sem time"}
            </p>
          </div>
          <p className="text-gray-500 text-sm italic">"{mvp.destaque}"</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <img
            src={mvp.jogadorId.foto}
            alt={mvp.jogadorId.nome}
            className="w-20 h-20 rounded-full border-2 border-cyan-900 object-cover"
          />
          <p className="text-white font-bold">{mvp.jogadorId.nome}</p>
          <p className="text-gray-500 text-sm">{mvp.jogadorId.role}</p>
        </div>
      </div>
      {isAuthenticated && adm && (
        <div className="flex gap-2 -mt-2">
          <Link to={`/mvp/edit/${mvp._id}`}>
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
    </div>
  );
};

export default MVP;
