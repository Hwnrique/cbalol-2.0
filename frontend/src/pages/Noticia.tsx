import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../services/api";
import Loading from "../components/Loading";
import MVP from "../components/MVP";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import { toast } from "react-toastify";
import PreviousGames from "../components/PreviousGames";

const Noticia = () => {
  const { id } = useParams();
  // buscando o :id pela URL
  const { token, id: userId, adm } = useAuth();
  const [comentario, setComentario] = useState("");

  const isAuthenticated = !!token;

  const {
    data: noticia,
    isLoading,
    refetch,
  } = useQuery({
    // o refetch é uma função que força o TankStack a buscar dados de novo sempre que uma noticia nova é buscada.
    queryKey: ["noticia", id],
    queryFn: () => api.get(`/notice/${id}`).then((res) => res.data),
  });

  const { data: outrasNoticias } = useQuery({
    queryKey: ["noticias"],
    queryFn: () => api.get("/notice").then((res) => res.data),
  });

  const { data: comentarios, refetch: refetchComentarios } = useQuery({
    queryKey: ["comentarios", id],
    queryFn: () => api.get(`/notice/${id}/comments`).then((res) => res.data),
  });

   const navigate = useNavigate();

  const handleExcluir = async () => {
    try {
      await api.delete(`/notice/${id}`);
      toast.success("Notícia excluída!");
      navigate("/");
    } catch (error) {
      toast.error("Erro ao excluir notícia!");
    }
  };

  if (isLoading) return <Loading />;
  if (!noticia) return null;

  const formatarData = (data: string) => {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(data));
  };

  const jasCurtiu = noticia.curtidas?.includes(userId);
  // verificando se o ID do usuário está no array de curtidas, se não estiver ele adiciona, se já estiver ele tira

  const handleCurtir = async () => {
    if (!token) {
      toast.error("Faça login para curtir!");
      return;
    }
    await api.post(`/notice/${id}/like`);
    refetch();
  };
  // função pra lembrar, usuário deslogado não curte!!

  const handleComentar = async () => {
    if (!token) {
      toast.error("Faça login para comentar!");
      return;
    }
    if (!comentario.trim()) return;

    await api.post(`/notice/${id}/comments`, { comentario });
    setComentario("");
    refetchComentarios();
  };

  // outras noticias excluindo a atual, máximo 3
  const outras = (outrasNoticias ?? [])
    .filter((n: any) => n._id !== id)
    // esse filtro remove a notícia que esta sendo lida
    .slice(0, 3);


  return (
    <div className="lg:flex lg:gap-36 gap-8 lg:max-w-[100rem] max-w-7xl mx-auto px-4 py-10">
      {/* ── Conteúdo principal ── */}
      <main className="flex-1 flex flex-col gap-6 lg:mt-6">
        {/* Título */}
        <h1 className="text-white text-3xl lg:text-5xl font-black lg:mb-8">
          {noticia.titulo}
        </h1>

        {/* Imagem de capa */}
        <img
          src={noticia.capa}
          alt={noticia.titulo}
          className="w-full rounded-xl object-cover max-h-[500px]"
        />

        {/* Conteúdo da notícia */}
        <div
          className="text-gray-300 leading-relaxed prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: noticia.descricao }}
        />

        {/* Outra imagem (se existir) */}
        {noticia.outraImagem && (
          <img
            src={noticia.outraImagem}
            alt="imagem complementar"
            className="w-full rounded-xl object-cover"
          />
        )}

        {/* Autor e data */}
        <div className="flex items-center gap-3 border-t border-authPainel pt-4">
          <img
            src={noticia.criadaPor?.userPhoto}
            alt={noticia.criadaPor?.nickname}
            className="w-10 h-10 rounded-full object-cover border border-gray-700"
          />
          <div>
            <p className="text-white font-bold text-sm">
              {noticia.criadaPor?.nickname}
            </p>
            <p className="text-gray-500 text-xs">
              {formatarData(noticia.createdAt)}
            </p>
          </div>
        </div>

        {/* Curtidas */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleCurtir}
            className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${
              jasCurtiu
                ? "bg-cyan-900 text-white"
                : "bg-bgsite border border-gray-800 text-gray-400 hover:border-cyan-900 hover:text-white"
            }`}
          >
            {jasCurtiu ? "❤️ Curtido" : "🤍 Curtir"}
          </button>
          <span className="text-gray-500 text-sm">
            {noticia.curtidas?.length ?? 0} curtidas
          </span>
        </div>
        {isAuthenticated && adm && (
          <div className="flex gap-2 -mt-2">
            <Link to={`/notice/edit/${noticia._id}`}>
              <button className="bg-cyan-950 rounded-lg p-2 text-gray-300 font-bold hover:-translate-y-2 transition-all duration-300 hover:bg-cyan-900 hover:text-white">
                Editar
              </button>
            </Link>
            <button onClick={handleExcluir} className="bg-red-950 rounded-lg p-2 text-gray-300 font-bold hover:-translate-y-2 transition-all duration-300 hover:bg-red-900 hover:text-white">
              Excluir
            </button>
          </div>
        )}

        {/* Veja mais */}
        <div>
          <h3 className="text-white font-bold text-xl mb-4">Veja também</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {outras.map((n: any) => (
              <Link key={n._id} to={`/notice/${n._id}`}>
                <div className="bg-[#0c0c10] border border-authPainel rounded-xl overflow-hidden hover:border-cyan-900 transition-all">
                  <img
                    src={n.capa}
                    alt={n.titulo}
                    className="w-full h-32 object-cover hover:scale-110 transition-all duration-300"
                  />
                  <p className="text-gray-300 font-bold text-sm p-3 line-clamp-2">
                    {n.titulo}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Comentários */}
        <div className="flex flex-col gap-4">
          <h3 className="text-white font-bold text-xl">Comentários</h3>
          {/* Input de comentário */}
          {token && (
            <div className="flex gap-3">
              <textarea
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
                placeholder="Escreva um comentário..."
                className="flex-1 bg-bgsite border border-gray-800 rounded-lg p-3 text-gray-300 resize-none h-20 focus:outline-none focus:border-cyan-900"
              />
              <button
                onClick={handleComentar}
                className="bg-cyan-950 hover:bg-cyan-900 text-gray-300 font-bold px-4 rounded-lg self-end h-10"
              >
                Enviar
              </button>
            </div>
          )}

          {/* Lista de comentários */}
          <div className="flex flex-col gap-3">
            {(comentarios ?? []).map((c: any) => (
              <div
                key={c._id}
                className="bg-[#0c0c10] border border-authPainel rounded-lg p-4"
              >
                <div className="flex items-end gap-2 mb-4">
                  <img
                    src={c.criadoPor?.userPhoto}
                    alt={c.criadoPor?.nickname}
                    className="h-8 rounded-full"
                  />
                  <p className="text-cyan-900 font-bold text-base mb-1">
                    {c.criadoPor?.nickname ?? "Usuário"}
                  </p>
                </div>
                <p className="text-gray-300 text-sm">{c.comentario}</p>
                <p className="text-gray-600 text-xs mt-2">
                  {formatarData(c.createdAt)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* ── Sidebar ── */}
      <aside className="lg:w-80 flex-col gap-6 mt-10 lg:mt-96 border-red-600 hidden md:flex">
        <MVP />
        <PreviousGames />
      </aside>
    </div>
  );
};

export default Noticia;
