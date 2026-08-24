import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const MoreNews = ({ news }: { news: any[] }) => {
  return (
    <>
      <h2 className="mt-16 mx-auto text-center lg:text-2xl text-2xl font-bold text-white rounded-full">
        Mais Notícias
      </h2>
      <div className="lg:flex hidden mt-16 h-[35rem] w-2/3 mx-auto gap-4">
        <div className="w-[60%] h-full relative">
          {news[0] && (
            <>
              <img
                src={news[0].capa}
                alt={news[0].titulo}
                className="w-full h-full object-cover rounded-xl"
              />
              <div className="flex flex-col items-start justify-end absolute inset-0 bg-gradient-to-t from-bgsite/80 via-bgsite/40 to-transparent">
                <h2 className="text-white font-extrabold p-4 text-5xl">
                  {news[0].titulo}
                </h2>
                <Link to={`/notice/${news[0]._id}`}>
                 <div className="mb-4 ml-4 text-gray-300 hover:text-white bg-cyan-950 rounded-md p-4 hover:bg-cyan-900 md:text-base text-sm cursor-pointer font-bold flex gap-3 justify-center items-center">
                  <p>Ler mais</p>
                  <FaArrowRight className="text-base" />
                </div>
                </Link>
              </div>
            </>
          )}
        </div>
        <div className="w-[40%] h-full flex flex-col gap-4">
          {news.slice(1, 3).map((item) => (
            <div key={item._id} className="flex-1 md:overflow-hidden relative">
              <img
                src={item.capa}
                alt={item.titulo}
                className="w-full h-full object-cover rounded-xl"
              />
              <div className="flex flex-col items-start justify-end absolute inset-0 bg-gradient-to-t from-bgsite/80 via-bgsite/40 to-transparent">
                <h2 className="text-white font-black p-4 text-2xl">
                  {item.titulo}
                </h2>
                <Link to={`/notice/${item._id}`}>
                <div className="mb-4 ml-4 text-gray-300 hover:text-white bg-cyan-950 rounded-md p-4 hover:bg-cyan-900 text-sm cursor-pointer font-bold flex gap-3 justify-center items-center">
                  <p>Ler mais</p>
                  <FaArrowRight className="text-base" />
                </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="lg:hidden w-[80%] mx-auto mt-10 space-y-4">
        {news.slice(0, 3).map((item) => {

          const resumoTitleFromMobile =
          item.titulo.length > 50
            ? item.titulo.slice(0, 50) + "..."
            : item.titulo;

          return (
          <div
            key={item._id}
            className="bg-zinc-900 rounded-xl overflow-hidden relative"
          >
            <div className="p-2 flex flex-col justify-end absolute inset-0 bg-gradient-to-t from-bgsite/80 via-bgsite/40 to-transparent">
              <h2 className="text-gray-300 font-black mb-2 text-xl">{resumoTitleFromMobile}</h2>
              <Link to={`/notice/${item._id}`}>
              <div className="text-gray-300 hover:text-white bg-cyan-950 rounded-md hover:bg-cyan-900 text-sm cursor-pointer font-bold flex w-20 h-10 justify-center items-center">
                  <p>Ler mais</p>
                </div>
              </Link>
            </div>
            <img
              src={item.capa}
              alt={item.titulo}
              className="w-full h-48 object-cover"
            />
          </div>
          )
        })}
      </div>
    </>
  );
};

export default MoreNews;
