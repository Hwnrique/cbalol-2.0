import api from "../services/api";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../contexts/AuthContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { GrFormNextLink } from "react-icons/gr";
import { GrFormPreviousLink } from "react-icons/gr";
import { useQueryClient } from "@tanstack/react-query"

import "swiper/css";
import "swiper/css/navigation";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Partidas = () => {
  const { data: proximasPartidas } = useQuery({
    queryKey: ["partidas", "Pendente"],
    queryFn: () => api.get("/partida?status=Pendente").then((res) => res.data),
  });

  const { token, adm } = useAuth();

  const isAuthenticated = !!token;

  const queryClient = useQueryClient();
  // pra buscar os dados novamente após uma alteração


  const handleExcluir = async (partidaId: string) => {
  try {
    await api.delete(`/partida/${partidaId}`)
    queryClient.invalidateQueries({ queryKey: ["partidas", "Pendente"] })
    // serve pra atualizar a página ao excluir
    toast.success("Partida excluída!")
  } catch (error) {
    toast.error("Erro ao excluir partida!")
  }
}

if (!proximasPartidas || proximasPartidas.length === 0) return null

  return (
    <section className="md:mt-20 mt-16">
      <div className="flex items-center justify-between w-4/5 mx-auto">
        <h2 className="text-white text-2xl lg:text-4xl font-bold">
          Próximas Partidas
        </h2>
        <div className="flex gap-3">
          <button className="partidas-prev flex items-center justify-center md:w-14 md:h-14 w-10 h-10 rounded-full bg-transparent border border-gray-900 hover:bg-cyan-900 text-white font-bold">
            <GrFormPreviousLink />
          </button>
          <button className="partidas-next flex items-center justify-center md:w-14 md:h-14 w-10 h-10 rounded-full bg-transparent border border-gray-900 hover:bg-cyan-900 text-white font-bold">
            <GrFormNextLink />
          </button>
        </div>
      </div>
      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: ".partidas-prev",
          nextEl: ".partidas-next",
        }}
        slidesPerView={1}
        slidesPerGroup={1}
        spaceBetween={20}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        className="w-4/5 h-[26rem]"
      >
        {proximasPartidas?.map((item: any) => {
          const formatarData = (data: string) => {
            return new Intl.DateTimeFormat("pt-BR", {
              day: "numeric",
              month: "long",
            }).format(new Date(data));
          };

          return (
            <SwiperSlide key={item._id}>
              <div
                className="
                border
                border-zinc-800
                rounded-2xl
                p-6
                h-[280px]
                hover:border-cyan-950
                hover:-translate-y-2
                transition-all
                duration-300
                mt-10
                cursor-pointer
              "
              >
                <div className="w-full h-1 rounded-full bg-cyan-950 mb-6" />
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex flex-col items-center gap-3 border border-gray-800 rounded-full backdrop:blur">
                      <img
                        src={item.confronto[0].logo}
                        alt={item.confronto[0].nome}
                        className="w-24 h-24 object-contain"
                      />
                    </div>
                    <p className="text-gray-300 text-center font-bold text-sm mt-2">
                      {item.confronto[0].nome}
                    </p>
                  </div>
                  <span className="text-cyan-800 font-bold texsmxl">VS</span>
                  <div>
                    <div className="flex flex-col items-center gap-3 border border-gray-800 rounded-full backdrop:blur">
                      <img
                        src={item.confronto[1].logo}
                        alt={item.confronto[1].nome}
                        className="w-24 h-24 object-contain"
                      />
                    </div>
                    <p className="text-gray-300 text-center font-bold text-sm mt-2">
                      {item.confronto[1].nome}
                    </p>
                  </div>
                </div>
                <div className="mt-8 border-t border-zinc-800 pt-4 text-center">
                  <p className="text-zinc-400 text-sm">
                    {formatarData(item.data)}
                  </p>
                  <p className="text-cyan-900 mt-2 font-bold">{item.modelo}</p>
                </div>
              </div>
              {isAuthenticated && adm && (
                <div className="mt-4 flex gap-2">
                  <Link to={`/partida/edit/${item._id}`}>
                  <button className="bg-cyan-950 rounded-lg p-2 text-gray-300 font-bold hover:-translate-y-2 transition-all duration-300 hover:bg-cyan-900 hover:text-white">
                    Editar
                  </button></Link>
                  <button onClick={() => handleExcluir(item._id)} className="bg-red-950 rounded-lg p-2 text-gray-300 font-bold hover:-translate-y-2 transition-all duration-300 hover:bg-red-900 hover:text-white">
                    Excluir
                  </button>
                </div>
               )}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default Partidas;
