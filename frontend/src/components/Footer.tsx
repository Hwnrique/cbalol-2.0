import { Link } from "react-router-dom";
import logo from "../assets/logofooter.png";

import { FaDiscord, FaInstagram } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { MdArrowOutward } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="w-full bg-[#0c0d0f] mt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">
        {/* Conteúdo principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Logo + descrição */}
          <div>
            <Link to="/" className="inline-flex items-center gap-3 group">
              <img
                className="h-16 w-16 object-contain transition-transform duration-300 group-hover:scale-105"
                src={logo}
                alt="CBALOL"
              />

              <div>
                <h2 className="text-gray-300 font-black text-2xl tracking-tight">
                  CBALOL
                </h2>

                <span className="text-xs text-cyan-900 font-semibold uppercase tracking-widest">
                  League of Legends
                </span>
              </div>
            </Link>

            <p className="text-gray-400 text-sm leading-relaxed mt-5 max-w-sm">
              Campeonato Bagres de League of Legends. Criado para
              entretenimento, competição e diversão, sem fins lucrativos.
            </p>
          </div>

          {/* Navegação */}
          <div className="lg:justify-self-center">
            <h3 className="text-white font-bold mb-5">Navegação</h3>

            <nav className="flex flex-col gap-3">
              <Link
                to="/"
                className="text-sm text-gray-400 hover:text-cyan-900 transition-colors"
              >
                Início
              </Link>
              <Link
                to="/times"
                className="text-sm text-gray-400 hover:text-cyan-900 transition-colors"
              >
                Times
              </Link>
              <Link
                to="/jogadores"
                className="text-sm text-gray-400 hover:text-cyan-900 transition-colors"
              >
                Jogadores
              </Link>
            </nav>
          </div>

          {/* Redes sociais */}
          <div className="lg:justify-self-end">
            <h3 className="text-white font-bold mb-5">Comunidade</h3>

            <p className="text-gray-400 text-sm mb-5 max-w-xs">
              Acompanhe o campeonato e fique por dentro das novidades.
            </p>
            <div className="flex gap-3">
              <a
                href="https://discord.gg/tGT5RVzTJ"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Discord"
                className="w-10 h-10 flex items-center justify-center
                           rounded-lg bg-white/5 border border-white/10
                           text-gray-400 text-xl
                           hover:bg-cyan-950 hover:text-cyan-900
                           hover:border-cyan-900
                           hover:-translate-y-1
                           transition-all duration-300"
              >
                <FaDiscord />
              </a>
              <a
                href="https://x.com/hennrijs"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="w-10 h-10 flex items-center justify-center
                           rounded-lg bg-white/5 border border-white/10
                           text-gray-400 text-lg
                           hover:bg-cyan-950 hover:text-cyan-900
                           hover:border-cyan-900
                           hover:-translate-y-1
                           transition-all duration-300"
              >
                <BsTwitterX />
              </a>
              <a
                href="https://www.instagram.com/hxwrique/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 flex items-center justify-center
                           rounded-lg bg-white/5 border border-white/10
                           text-gray-400 text-xl
                           hover:bg-cyan-950 hover:text-cyan-900
                           hover:border-cyan-900
                           hover:-translate-y-1
                           transition-all duration-300"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>
        {/* Linha inferior */}
        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <p className="text-gray-500 text-xs">
            © 2026 CBALOL. Todos os direitos reservados.
          </p>
          <a
            href="https://x.com/hennrijs"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1 text-gray-500 text-xs hover:text-cyan-500 transition-colors"
          >
            Desenvolvido por @hennrijs
            <MdArrowOutward className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
