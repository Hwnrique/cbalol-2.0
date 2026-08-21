import { Link } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
import type { Time } from "../types/Time";
import { FaRegUser } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import api from "../services/api";
import { useAuth } from "../contexts/AuthContext";
import { RiLogoutBoxRLine } from "react-icons/ri";

interface MobileSidebarProps {
  open: boolean;
  closeSidebar: () => void;

  mobileTimes: boolean;
  setMobileTimes: React.Dispatch<React.SetStateAction<boolean>>;

  mobileEquipe: boolean;
  setMobileEquipe: React.Dispatch<React.SetStateAction<boolean>>;
  
  time?: Time[];
}

const MobileSidebar = ({
  open,
  closeSidebar,
  mobileTimes,
  setMobileTimes,
  mobileEquipe,
  setMobileEquipe,
  time,
}: MobileSidebarProps) => {

  const { id, token, nickname, adm, logout } = useAuth();

    const { data: user } = useQuery({
      queryKey: ["user", id],
      queryFn: () => api.get(`/user/${id}`).then((res) => res.data),
      enabled: !!token,
    });

    const isAuthenticated = !!token;
  return (
    <>
      {open && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 bg-black/50 z-40"
        />
      )}
      {isAuthenticated ? (
        // logado
        <aside
        className={`
          fixed top-0 left-0
          h-screen w-72
          bg-[#0c0c10]
          border-r border-authPainel
          z-50
          transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="p-6 border-b border-authPainel">
          <div className="w-16 h-16 rounded-full bg-slate-700 flex items-center justify-center">
            <img src={user?.userPhoto} alt="foto de perfil" className="rounded-full"/>
          </div>
          <h2 className="text-white font-bold mt-3">
            {nickname}
          </h2>

          <Link to={`user/${id}`} className="text-gray-400">
            Editar perfil
          </Link>
        </div>
        <nav className="flex flex-col text-gray-300">
          <Link
            to="/"
            onClick={closeSidebar}
            className="px-6 py-4 hover:bg-[#1b1b26]"
          >
            Início
          </Link>
          {adm ? (
            <>
            <Link
            to={`/admarea`}
            onClick={closeSidebar}
            className="px-6 py-4 hover:bg-[#1b1b26]"
          >
            Área Administrativa
          </Link>
            </>
          
          ) : (
            ""
          )}
          <button
            onClick={() => setMobileTimes((prev) => !prev)}
            className="flex justify-between items-center px-6 py-4 hover:bg-[#1b1b26]"
          >
            Times

            <MdKeyboardArrowDown
              className={`transition-transform ${
                mobileTimes ? "rotate-180" : ""
              }`}
            />
          </button>
          {mobileTimes && (
            <div className="bg-[#1b1b26]">
              {(time ?? []).map((item) => (
                <Link
                  key={item._id}
                  to={`/times/${item._id}`}
                  onClick={closeSidebar}
                  className="block pl-10 py-3"
                >
                  {item.nome}
                </Link>
              ))}
            </div>
          )}
          <Link
            to="/jogadores"
            onClick={closeSidebar}
            className="px-6 py-4 hover:bg-[#1b1b26]"
          >
            Jogadores
          </Link>
          <button
            onClick={() => setMobileEquipe((prev) => !prev)}
            className="flex justify-between items-center px-6 py-4 hover:bg-[#1b1b26]"
          >
            Equipe

            <MdKeyboardArrowDown
              className={`transition-transform ${
                mobileEquipe ? "rotate-180" : ""
              }`}
            />
          </button>

          {mobileEquipe && (
            <div className="bg-[#1b1b26]">
              <Link
                to="/cadastro"
                onClick={closeSidebar}
                className="block pl-10 py-3"
              >
                Sobre nós
              </Link>

              <Link
                to="/login"
                onClick={closeSidebar}
                className="block pl-10 py-3"
              >
                Repórteres
              </Link>
              <Link
                to="/login"
                onClick={closeSidebar}
                className="block pl-10 py-3"
              >
                Moderadores
              </Link>
              <Link
                to="/login"
                onClick={closeSidebar}
                className="block pl-10 py-3"
              >
                Redes Sociais
              </Link>
            </div>
          )}

          <Link
            to="https://hwnrique.github.io/campeonato-bagres-league-of-legends/#/"
            onClick={closeSidebar}
            className="px-6 py-4 hover:bg-[#1b1b26]"
          >
            CBALOL
          </Link>
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <Link
            to="/"
            onClick={() => {
              logout(),
              closeSidebar()
            }}
            className="flex justify-center items-center gap-2 bg-cyan-950 hover:bg-cyan-900 rounded-md py-3 text-center font-bold text-gray-300"
          >
            <RiLogoutBoxRLine className="text-xl"/>
            <p>Sair</p>
          </Link>
        </div>
      </aside>
      ) : (
        // normal
        <aside
        className={`
          fixed top-0 left-0
          h-screen w-72
          bg-[#0c0c10]
          border-r border-authPainel
          z-50
          transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="p-6 border-b border-authPainel">
          <div className="w-16 h-16 rounded-full bg-slate-700 flex items-center justify-center">
            <FaRegUser className="h-10 w-10 overflow-hidden text-gray-300 font-light"/>
          </div>
          <h2 className="text-white font-bold mt-3">
            Visitante
          </h2>

          <p className="text-gray-400">
            Faça login pra ver seu perfil
          </p>
        </div>
        <nav className="flex flex-col text-gray-300">
          <Link
            to="/"
            onClick={closeSidebar}
            className="px-6 py-4 hover:bg-[#1b1b26]"
          >
            Início
          </Link>
          <button
            onClick={() => setMobileTimes((prev) => !prev)}
            className="flex justify-between items-center px-6 py-4 hover:bg-[#1b1b26]"
          >
            Times

            <MdKeyboardArrowDown
              className={`transition-transform ${
                mobileTimes ? "rotate-180" : ""
              }`}
            />
          </button>
          {mobileTimes && (
            <div className="bg-[#1b1b26]">
              {(time ?? []).map((item) => (
                <Link
                  key={item._id}
                  to={`/times/${item._id}`}
                  onClick={closeSidebar}
                  className="block pl-10 py-3"
                >
                  {item.nome}
                </Link>
              ))}
            </div>
          )}
          <Link
            to="/jogadores"
            onClick={closeSidebar}
            className="px-6 py-4 hover:bg-[#1b1b26]"
          >
            Jogadores
          </Link>
          <button
            onClick={() => setMobileEquipe((prev) => !prev)}
            className="flex justify-between items-center px-6 py-4 hover:bg-[#1b1b26]"
          >
            Equipe

            <MdKeyboardArrowDown
              className={`transition-transform ${
                mobileEquipe ? "rotate-180" : ""
              }`}
            />
          </button>

          {mobileEquipe && (
            <div className="bg-[#1b1b26]">
              <Link
                to="/cadastro"
                onClick={closeSidebar}
                className="block pl-10 py-3"
              >
                Sobre nós
              </Link>

              <Link
                to="/login"
                onClick={closeSidebar}
                className="block pl-10 py-3"
              >
                Repórteres
              </Link>
              <Link
                to="/login"
                onClick={closeSidebar}
                className="block pl-10 py-3"
              >
                Moderadores
              </Link>
              <Link
                to="/login"
                onClick={closeSidebar}
                className="block pl-10 py-3"
              >
                Redes Sociais
              </Link>
            </div>
          )}

          <Link
            to="/"
            onClick={closeSidebar}
            className="px-6 py-4 hover:bg-[#1b1b26]"
          >
            CBALOL
          </Link>
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <Link
            to="/login"
            onClick={closeSidebar}
            className="block bg-cyan-950 hover:bg-cyan-900 rounded-md py-3 text-center font-bold text-gray-300"
          >
            Entrar
          </Link>
        </div>
      </aside>
      )}
    </>
  );
};

export default MobileSidebar;