import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

const NewsSlider = ({ news }: { news: any[] }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 5000 }}
      loop
      className="lg:w-2/3 sm:w-4/5 w-11/12 lg:h-[45rem] sm:h-[35rem] h-[30rem] rounded-3xl overflow-hidden mt-[70px] border border-authPainel border-opacity-30"
    >
      {news.map((item) => {
        const removerHTML = (html: string) => html.replace(/<[^>]*>/g, "");
        const descricaoLimpa = removerHTML(item.descricao);

        const resumo =
          descricaoLimpa.length > 120
            ? descricaoLimpa.slice(0, 120) + "..."
            : descricaoLimpa;

        const resumoTitleFromMobile =
          item.titulo.length > 50
            ? item.titulo.slice(0, 50) + "..."
            : item.titulo;

        return (
          <SwiperSlide
            key={item._id}
            className="lg:relative block w-full max-h-full lg:bg-transparent bg-[#0c0c10]"
          >
            <img
              src={item.capa}
              alt={item.titulo}
              className="lg:h-full h-2/4 w-full object-cover relative"
            />
            <div className="lg:absolute lg:inset-0 bg-gradient-to-t h-2/4 lg:h-full from-bgsite/80 via-bgsite/40 to-transparent flex flex-col justify-end md:p-10 p-[2.2rem]">
              <h2 className="text-white hidden xl:block lg:text-5xl text-3xl mb-2 lg:w-1/2 font-black">
                {item.titulo}
              </h2>
              <h2 className="text-white block xl:hidden lg:text-5xl sm:text-4xl text-xl lg:mb-2 md:mb-4 mb-4 lg:w-1/2 font-black">
                {resumoTitleFromMobile}
              </h2>
              <p className="text-white lg:text-lg md:text-base text-xs mb-6 lg:w-1/2 font-light">
                {resumo}
              </p>
              <Link to={`/notice/${item._id}`}>
                <div className="text-white hover:text-gray-300 bg-cyan-950 rounded-md lg:w-32 sm:w-48 md:w-40 w-36 p-4 hover:bg-cyan-900 md:text-base text-sm cursor-pointer font-bold flex gap-3 justify-center items-center lg:mb-8 md:mb-0 -mb-4">
                  <p>Ler mais</p>
                  <FaArrowRight className="text-base" />
                </div>
              </Link>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default NewsSlider;
