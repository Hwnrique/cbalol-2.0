import { FaGamepad, FaNewspaper, FaTrophy, FaUsers } from "react-icons/fa6";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <main className="min-h-screen bg-bgsite text-white">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-gray-800">
        <div className="absolute inset-0 bg-gradient-to-b" />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-20 md:py-28 lg:py-36">
          <div className="max-w-3xl">
            <span className="inline-flex items-center border border-cyan-900 bg-cyan-950/20 text-cyan-600 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full">
              Sobre o CBALOL
            </span>

            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-7xl font-black leading-tight">
              Muito mais que um
              <span className="text-cyan-900"> campeonato.</span>
            </h1>

            <p className="mt-6 text-gray-400 text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl">
              O CBALOL 2.0 é uma melhoria de um projeto antigo, uma plataforma
              criada para acompanhar tudo sobre o nosso campeonato de League of
              Legends, reunindo partidas, equipes, jogadores, notícias e os
              principais destaques em um só lugar.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <Link
                to="/jogadores"
                className="bg-cyan-950 hover:bg-cyan-600 transition-colors text-white font-bold px-6 py-3 rounded-lg text-center"
              >
                Conheça os jogadores
              </Link>

              <Link
                to="/"
                className="border border-gray-700 hover:border-gray-500 hover:bg-white/5 transition-all text-gray-300 font-bold px-6 py-3 rounded-lg text-center"
              >
                Página Inicial
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* INTRODUÇÃO */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          <div>
            <p className="text-cyan-500 font-bold uppercase tracking-widest text-sm mb-3">
              Nossa história
            </p>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight">
              Um espaço feito para quem faz parte do campeonato.
            </h2>
          </div>

          <div className="space-y-5 text-gray-400 leading-relaxed text-sm sm:text-base">
            <p>
              O projeto surgiu com a ideia de reunir em um único lugar todas as
              informações importantes do campeonato, deixando mais fácil
              acompanhar resultados, próximos confrontos, jogadores e novidades.
            </p>

            <p>
              Além de funcionar como um portal informativo, o site também
              registra parte da história das equipes e dos jogadores que
              participam de cada edição. Tornando tudo mais interativo e
              melhorando a experiência.
            </p>

            <p>
              O site é feito para entreterimento e diversão. Faça parte da nossa
              comunidade, crie o seu time e participe do nosso campeonato de
              bagres.
            </p>
          </div>
        </div>
      </section>

      {/* NÚMEROS */}
      <section className="border-y border-gray-800 bg-[#0c0c10]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <p className="text-3xl sm:text-4xl font-black text-white">5+</p>
              <p className="text-gray-500 mt-1 text-sm">
                Equipes participantes
              </p>
            </div>

            <div>
              <p className="text-3xl sm:text-4xl font-black text-white">30+</p>
              <p className="text-gray-500 mt-1 text-sm">Jogadores</p>
            </div>

            <div>
              <p className="text-3xl sm:text-4xl font-black text-white">50+</p>
              <p className="text-gray-500 mt-1 text-sm">Partidas disputadas</p>
            </div>

            <div>
              <p className="text-3xl sm:text-4xl font-black text-white">∞</p>
              <p className="text-gray-500 mt-1 text-sm">
                Momentos questionáveis
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* O QUE ENCONTRA NO SITE */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-16 md:py-24">
        <div className="max-w-2xl mb-12">
          <p className="text-cyan-500 font-bold uppercase tracking-widest text-sm mb-3">
            A plataforma
          </p>

          <h2 className="text-3xl sm:text-4xl font-black">
            Tudo sobre o campeonato em um só lugar.
          </h2>

          <p className="text-gray-400 mt-4 leading-relaxed">
            Jogar League of Legends nunca foi tão divertido.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="group bg-[#0c0c10] border border-gray-800 hover:border-cyan-900 rounded-xl p-6 transition-all duration-300">
            <div className="w-12 h-12 rounded-lg bg-cyan-950/40 border border-cyan-900/50 flex items-center justify-center mb-5">
              <FaGamepad className="text-cyan-500 text-xl" />
            </div>

            <h3 className="font-bold text-lg">Partidas</h3>

            <p className="text-gray-500 text-sm mt-3 leading-relaxed">
              Acompanhe os próximos confrontos, resultados anteriores, placares
              e formatos das partidas.
            </p>
          </div>

          <div className="group bg-[#0c0c10] border border-gray-800 hover:border-cyan-900 rounded-xl p-6 transition-all duration-300">
            <div className="w-12 h-12 rounded-lg bg-cyan-950/40 border border-cyan-900/50 flex items-center justify-center mb-5">
              <FaUsers className="text-cyan-500 text-xl" />
            </div>

            <h3 className="font-bold text-lg">Equipes</h3>

            <p className="text-gray-500 text-sm mt-3 leading-relaxed">
              Conheça as equipes participantes, seus jogadores, identidades e
              histórias dentro do campeonato.
            </p>
          </div>

          <div className="group bg-[#0c0c10] border border-gray-800 hover:border-cyan-900 rounded-xl p-6 transition-all duration-300">
            <div className="w-12 h-12 rounded-lg bg-cyan-950/40 border border-cyan-900/50 flex items-center justify-center mb-5">
              <FaNewspaper className="text-cyan-500 text-xl" />
            </div>

            <h3 className="font-bold text-lg">Notícias</h3>

            <p className="text-gray-500 text-sm mt-3 leading-relaxed">
              Fique por dentro das novidades, mudanças, destaques e
              acontecimentos de cada edição.
            </p>
          </div>

          <div className="group bg-[#0c0c10] border border-gray-800 hover:border-cyan-900 rounded-xl p-6 transition-all duration-300">
            <div className="w-12 h-12 rounded-lg bg-cyan-950/40 border border-cyan-900/50 flex items-center justify-center mb-5">
              <FaTrophy className="text-cyan-500 text-xl" />
            </div>

            <h3 className="font-bold text-lg">Destaques</h3>

            <p className="text-gray-500 text-sm mt-3 leading-relaxed">
              Veja jogadores em destaque, MVPs e momentos que marcaram cada
              rodada do campeonato.
            </p>
          </div>
        </div>
      </section>

      {/* TEXTO / VISUAL */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pb-16 md:pb-24">
        <div className="bg-[#0c0c10] border border-gray-800 rounded-2xl overflow-hidden">
          <div className="grid lg:grid-cols-2">
            <div className="min-h-[280px] sm:min-h-[360px] lg:min-h-[500px] bg-gradient-to-br from-cyan-950 via-[#111117] to-[#050507] relative flex items-center justify-center overflow-hidden">
              <div className="absolute w-64 h-64 md:w-96 md:h-96 bg-cyan-600/10 rounded-full blur-3xl" />

              <div className="relative text-center px-6">
                <p className="text-7xl sm:text-8xl lg:text-9xl font-black text-white/5">
                  2.0
                </p>

                <p className="text-gray-500 font-bold tracking-[0.3em] uppercase text-xs sm:text-sm mt-3">
                  Campeonato Bagres
                </p>
              </div>
            </div>

            <div className="p-7 sm:p-10 lg:p-14 flex flex-col justify-center">
              <p className="text-cyan-500 font-bold uppercase tracking-widest text-sm mb-3">
                CBALOL 2.0
              </p>

              <h2 className="text-3xl sm:text-4xl font-black leading-tight">
                Rivalidade, competição e muitas amizades desfeitas.
              </h2>

              <div className="text-gray-400 mt-6 space-y-4 leading-relaxed text-sm sm:text-base">
                <p>
                  Mais do que apenas descobrir quem vence ou perde, o campeonato
                  existe para criar momentos entre amigos e tornar cada partida
                  um pouco mais importante.
                </p>

                <p>
                  Cada equipe constrói sua própria história, surgem rivalidades,
                  jogadores se destacam e acontecimentos acabam sendo lembrados
                  muito depois do fim de uma edição.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
};

export default About;
