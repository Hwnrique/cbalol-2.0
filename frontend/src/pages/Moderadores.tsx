import { useQuery } from "@tanstack/react-query";
import api from "../services/api";
import { FaShieldHalved } from "react-icons/fa6";

interface Moderador {
  _id: string;
  nickname: string;
  nome?: string;
  userPhoto?: string;
  adm: boolean;
}

const Moderadores = () => {
  const { data: moderadores, isLoading } = useQuery<Moderador[]>({
  queryKey: ["moderadores"],
  queryFn: () =>
    api.get("/user/moderadores").then((res) => res.data),
});

  return (
    <main className="min-h-screen bg-bgsite text-white">
      <section className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 py-16 md:py-24">

        {/* Cabeçalho */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-cyan-950/40 border border-cyan-900 flex items-center justify-center">
              <FaShieldHalved className="text-cyan-500 text-xl" />
            </div>
          </div>

          <p className="text-cyan-500 font-bold uppercase tracking-widest text-sm">
            Equipe
          </p>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-2">
            Moderadores
          </h1>

          <p className="text-gray-400 mt-4 leading-relaxed text-sm sm:text-base">
            Conheça as pessoas responsáveis por administrar e manter o CBALOL
            organizado.
          </p>
        </div>

        {/* Loading */}
        {isLoading && (
          <p className="text-gray-500 text-center">
            Carregando moderadores...
          </p>
        )}

        {/* Moderadores */}
        {!isLoading && moderadores?.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {moderadores.map((moderador) => (
              <div
                key={moderador._id}
                className="bg-[#0c0c10] border border-gray-800 rounded-xl p-6 flex flex-col items-center text-center hover:border-cyan-900 transition-colors duration-300"
              >
                {/* Foto */}
                <div className="relative">
                  <img
                    src={
                      moderador.userPhoto ||
                      "https://placehold.co/150x150"
                    }
                    alt={moderador.nickname}
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-2 border-gray-800"
                  />

                  <div className="absolute bottom-0 right-0 w-8 h-8 bg-cyan-700 rounded-full flex items-center justify-center border-4 border-[#0c0c10]">
                    <FaShieldHalved className="text-white text-xs" />
                  </div>
                </div>

                {/* Informações */}
                <div className="mt-5">
                  <h2 className="text-xl font-bold">
                    {moderador.nickname}
                  </h2>

                  {moderador.nome && (
                    <p className="text-gray-500 text-sm mt-1">
                      {moderador.nome}
                    </p>
                  )}

                  <span className="inline-block mt-4 text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/30 border border-cyan-900/50 px-3 py-1 rounded-full">
                    Administrador
                  </span>
                </div>

                {/* Descrição */}
                <p className="text-gray-500 text-sm leading-relaxed mt-5">
                  Responsável pela administração, organização e gerenciamento
                  do conteúdo da plataforma.
                </p>
              </div>
            ))}
          </div>
        ) : (
          !isLoading && (
            <p className="text-gray-500 text-center">
              Nenhum moderador encontrado.
            </p>
          )
        )}

      </section>
    </main>
  );
};

export default Moderadores;