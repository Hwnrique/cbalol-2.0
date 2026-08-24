import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../contexts/AuthContext";
import api from "../services/api";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import { FiEdit2, FiMail, FiUser } from "react-icons/fi";
import { FaShieldHalved } from "react-icons/fa6";

const Perfil = () => {
  const { id, adm } = useAuth();

  const { data: user, isLoading } = useQuery({
    queryKey: ["user", id],
    queryFn: () => api.get(`/user/${id}`).then((res) => res.data),
    enabled: !!id,
  });

  if (isLoading) return <Loading />;

  if (!user) return null;

  return (
    <main className="min-h-screen bg-bgsite">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 md:py-24">

        {/* Título */}
        <div className="mb-8">
          <p className="text-cyan-500 text-sm font-bold uppercase tracking-widest">
            Sua conta
          </p>

          <h1 className="text-white text-3xl sm:text-4xl font-black mt-1">
            Meu Perfil
          </h1>

          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            Visualize e gerencie as informações da sua conta.
          </p>
        </div>

        {/* Card principal */}
        <section className="relative bg-[#0c0c10] border border-gray-800 rounded-2xl overflow-hidden">

          {/* Faixa decorativa */}
          <div className="h-28 sm:h-36 bg-gradient-to-r from-cyan-950/70 via-[#111117] to-[#0c0c10]" />

          <div className="px-5 sm:px-8 pb-8">

            {/* Foto e botão */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">

              <div className="-mt-14 sm:-mt-16">
                <div className="w-fit rounded-full p-1 bg-[#0c0c10]">
                  <img
                    src={user.userPhoto}
                    alt={user.nickname}
                    className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-gray-800"
                  />
                </div>
              </div>

              <Link
                to={`/user/edit/${id}`}
                className="flex items-center justify-center gap-2 border border-gray-700 hover:border-cyan-900 hover:bg-cyan-950/20 text-gray-300 hover:text-white transition-all px-4 py-2.5 rounded-lg text-sm font-bold w-full sm:w-auto"
              >
                <FiEdit2 />
                Editar perfil
              </Link>

            </div>

            {/* Nome principal */}
            <div className="mt-5 border-b border-gray-800 pb-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">

                <h2 className="text-white text-2xl sm:text-3xl font-black">
                  {user.nickname}
                </h2>

                <span
                  className={`w-fit text-xs font-bold px-3 py-1 rounded-full border ${
                    adm
                      ? "border-cyan-900 bg-cyan-950/30 text-cyan-400"
                      : "border-gray-700 bg-gray-800/30 text-gray-400"
                  }`}
                >
                  {adm ? "Administrador" : "Membro"}
                </span>

              </div>

              <p className="text-gray-500 mt-1">
                {user.nome}
              </p>
            </div>

            {/* Informações */}
            <div className="grid md:grid-cols-2 gap-4 mt-6">

              {/* Nome */}
              <div className="bg-bgsite border border-gray-800 rounded-xl p-4">
                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 rounded-lg bg-gray-900 flex items-center justify-center shrink-0">
                    <FiUser className="text-gray-400" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-gray-500 text-xs mb-1">
                      Nome
                    </p>

                    <p className="text-gray-300 font-bold truncate">
                      {user.nome}
                    </p>
                  </div>

                </div>
              </div>

              {/* Email */}
              <div className="bg-bgsite border border-gray-800 rounded-xl p-4">
                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 rounded-lg bg-gray-900 flex items-center justify-center shrink-0">
                    <FiMail className="text-gray-400" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-gray-500 text-xs mb-1">
                      Email
                    </p>

                    <p className="text-gray-300 truncate">
                      {user.email}
                    </p>
                  </div>

                </div>
              </div>

              {/* Nickname */}
              <div className="bg-bgsite border border-gray-800 rounded-xl p-4">
                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 rounded-lg bg-gray-900 flex items-center justify-center shrink-0">
                    <span className="text-gray-400 font-bold">
                      @
                    </span>
                  </div>

                  <div className="min-w-0">
                    <p className="text-gray-500 text-xs mb-1">
                      Nickname
                    </p>

                    <p className="text-gray-300 font-bold truncate">
                      {user.nickname}
                    </p>
                  </div>

                </div>
              </div>

              {/* Cargo */}
              <div className="bg-bgsite border border-gray-800 rounded-xl p-4">
                <div className="flex items-center gap-3">

                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                      adm
                        ? "bg-cyan-950/40"
                        : "bg-gray-900"
                    }`}
                  >
                    <FaShieldHalved
                      className={
                        adm
                          ? "text-cyan-500"
                          : "text-gray-400"
                      }
                    />
                  </div>

                  <div>
                    <p className="text-gray-500 text-xs mb-1">
                      Cargo
                    </p>

                    <p
                      className={`font-bold ${
                        adm
                          ? "text-cyan-400"
                          : "text-gray-300"
                      }`}
                    >
                      {adm ? "Administrador" : "Membro"}
                    </p>
                  </div>

                </div>
              </div>

            </div>

          </div>
        </section>

      </div>
    </main>
  );
};

export default Perfil;