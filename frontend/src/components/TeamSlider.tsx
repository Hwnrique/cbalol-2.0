import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, EffectCoverflow } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import { useQuery } from "@tanstack/react-query";
import api from "../services/api";
import type { Time } from "../types/Time";
import { Link } from "react-router-dom";

const TeamSlider = () => {
 const { data: time } = useQuery<Time[]>({
    queryKey: ["time"],
    queryFn: () => api.get("/time?ativo=true").then((res) => res.data),
  });

  return (
    <section className="teamSwiper -mt-10 w-full py-20 overflow-hidden relative">
      <div className="absolute inset-x-0 top-44 lg:h-[700px] h-[450px] bg-black/10"/>
      <h2 className="mb-16 mx-auto text-center lg:text-4xl text-2xl font-bold text-white rounded-full border border-transparent hover:border-gray-900 w-96 p-4">
        Conheça os Times
      </h2>
      <Swiper
        effect="coverflow"
        grabCursor
        centeredSlides
        slidesPerView="auto"
        pagination={{ clickable: true }}
        modules={[EffectCoverflow, Pagination]}
        coverflowEffect={{
          rotate: 10,
          stretch: -80,
          depth: 250,
          modifier: 1,
          scale: 0.9,
          slideShadows: false,
        }}
        className="w-full py-24 !overflow-visible"
      >
        {time?.map((team) => {
          const resumo =
            team.descricao.length > 200
              ? team.descricao.slice(0, 200) + "..."
              : team.descricao;

          const resumoMobile =
            team.descricao.length > 60
              ? team.descricao.slice(0, 60) + "..."
              : team.descricao;

          return (
            <SwiperSlide
              key={team._id}
              className=" group relative !w-[300px] !h-[380px] md:!w-[450px] md:!h-[500px] lg:!w-[800px] lg:!h-[550px] overflow-hidden rounded-3xl"
            >
              <img
                src={team.banner}
                alt={team.nome}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/60" />
              <div className="absolute inset-0 bg-gradient-to-b" />
              <div className="relative z-10 flex h-full flex-col items-center justify-center px-8 text-center">
                <div className="flex h-28 w-28 md:h-36 md:w-36 lg:h-40 lg:w-40 items-center justify-center rounded-full border-2 border-cyan-950 shadow-xl backdrop-blur-md">
                  <img
                    src={team.logo}
                    alt={team.nome}
                    className="h-[90%] w-[90%] object-cover"
                  />
                </div>
                <h3 className="mt-8 text-2xl md:text-4xl font-bold text-white">
                  {team.nome}
                </h3>
                <p
                  className="hidden lg:block mt-5 max-w-xl text-sm md:text-base text-gray-300 leading-relaxed font-semibold">
                  {resumo}
                </p>
                <p
                  className="lg:hidden block mt-5 max-w-xl text-sm md:text-base text-gray-300 leading-relaxed">
                  {resumoMobile}
                </p>
                <Link to={`/times/${team._id}`} className="mt-8">
                  <button className="rounded-xl bg-cyan-950 px-8 py-3 font-semibold text-white transition hover:bg-cyan-900 hover:scale-105">
                    Saiba mais
                  </button>
                </Link>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default TeamSlider;
