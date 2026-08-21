import logo from "../assets/logoolnyname.png";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../services/api";
import { useDropdown } from "../hooks/useDropdown";
import type { Time } from "../types/Time";
import ToggleMenu from "./ToggleMenu";
import { useEffect, useState } from "react";
import MobileSidebar from "./Sidebar";
import { IoMdArrowDropdown } from "react-icons/io";
import { useAuth } from "../contexts/AuthContext";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { GoPencil } from "react-icons/go";

const Header = () => {
  const timesDropdown = useDropdown();
  const equipeDropdown = useDropdown();
  const userDropdown = useDropdown();
  const [menu, setMenu] = useState(false);
  const [mobileTimes, setMobileTimes] = useState(false);
  const [mobileEquipe, setMobileEquipe] = useState(false);
  const location = useLocation();

  const { id, token, nickname, adm, logout } = useAuth();

  const isAuthenticated = !!token;

  const navigate = useNavigate();

  useEffect(() => {
    setMenu(false);
    setMobileTimes(false);
    setMobileEquipe(false);
  }, [location.pathname]);

  const toggleMenu = () => {
    setMenu((prev) => {
      const next = !prev;

      if (!next) {
        setMobileTimes(false);
        setMobileEquipe(false);
      }

      return next;
    });
  };

  const { data: time } = useQuery<Time[]>({
    queryKey: ["time"],
    queryFn: () => api.get("/time?ativo=true").then((res) => res.data),
  });

  const { data: user } = useQuery({
    queryKey: ["user", id],
    queryFn: () => api.get(`/user/${id}`).then((res) => res.data),
    enabled: !!token,
  });

  return (
    <div className="w-full border-b border-authPainel sticky inset-0 top-0 z-50 bg-bgsite">
      <div className="flex h-20 lg:max-w-[120rem] w-full mx-auto justify-around bg-transparent items-center">
        <ToggleMenu active={menu} onClick={toggleMenu} />
        <MobileSidebar
          open={menu}
          closeSidebar={() => setMenu(false)}
          mobileTimes={mobileTimes}
          setMobileTimes={setMobileTimes}
          mobileEquipe={mobileEquipe}
          setMobileEquipe={setMobileEquipe}
          time={time}
        />
        <Link to={"/"} className="md:ml-[30rem] lg:ml-0 ml-44">
          <div className="flex h-20 items-center">
            <img
              className="lg:w-48 lg:h-10 opacity-80 h-6 lg:-ml-4 hover:opacity-100 cursor-pointer"
              src={logo}
              alt="logo"
            ></img>
          </div>
        </Link>
        <div className="flex">
          <nav className="hidden lg:flex justify-center -ml-14 text-gray-300">
            <Link to={"/"}>
              <div className="flex cursor-pointer px-6 py-2 items-center gap-1 border border-transparent hover:border-gray-900 rounded-full hover:text-white">
                <span className="relative flex font-bold text-lg">Início</span>
              </div>
            </Link>
            <div ref={timesDropdown.ref} className="relative">
              <div
                onClick={timesDropdown.toggle}
                className="flex cursor-pointer px-6 py-2 items-center gap-1 border border-transparent hover:border-gray-900 rounded-full hover:text-white relative"
              >
                <span className="relative flex font-bold text-lg">Times</span>
                <MdKeyboardArrowDown
                  className={`transition-transform ${timesDropdown.open ? "rotate-180" : ""}`}
                />
              </div>
              {timesDropdown.open && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className={`w-36 absolute top-[4.5rem] left-0 z-10 bg-[#14141b] rounded-lg shadow-black shadow-2xl flex flex-col p-2 transition-all duration-200 ease-outt ${timesDropdown.open ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-2 scale-95 pointer-events-none"}`}
                >
                  {(time ?? []).map((item) => (
                    <Link
                      key={item._id}
                      to={`/times/${item._id}`}
                      className="p-2 font-bold text-lg hover:text-white hover:bg-[#1b1b26] rounded-lg"
                      onClick={timesDropdown.toggle}
                    >
                      {item.nome}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link to={"/jogadores"}>
              <div className="flex cursor-pointer px-6 py-2 items-center gap-1 border border-transparent hover:border-gray-900 rounded-full hover:text-white">
                <span className="relative flex font-bold text-lg">
                  Jogadores
                </span>
              </div>
            </Link>
            <div ref={equipeDropdown.ref} className="relative">
              <div
                onClick={equipeDropdown.toggle}
                className="flex cursor-pointer px-6 py-2 items-center gap-1 border border-transparent hover:border-gray-900 rounded-full hover:text-white"
              >
                <span className="relative flex font-bold text-lg">Equipe</span>
                <MdKeyboardArrowDown
                  className={`transition-transform ${equipeDropdown.open ? "rotate-180" : ""}`}
                />
              </div>
              {equipeDropdown.open && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="w-36 absolute top-[4.5rem] left-0 z-10 bg-[#14141b] rounded-lg shadow-black shadow-2xl flex flex-col p-2"
                >
                  <Link
                    to={"/cadastro"}
                    className="p-2 font-bold text-lg hover:text-white hover:bg-[#1b1b26] rounded-lg"
                  >
                    Sobre nós
                  </Link>
                  <Link
                    to={"/login"}
                    className="p-2 font-bold text-lg hover:text-white hover:bg-[#1b1b26] rounded-lg"
                  >
                    Repórteres
                  </Link>
                  <Link
                    to={"/"}
                    className="p-2 font-bold text-lg hover:text-white hover:bg-[#1b1b26] rounded-lg"
                  >
                    Moderadores
                  </Link>
                  <Link
                    to={"/"}
                    className="p-2 font-bold text-lg hover:text-white hover:bg-[#1b1b26] rounded-lg"
                  >
                    Redes Sociais
                  </Link>
                </div>
              )}
            </div>
            <Link to="https://hwnrique.github.io/campeonato-bagres-league-of-legends/#/">
              <div className="flex cursor-pointer px-6 py-2 items-center gap-1 border border-transparent hover:border-gray-900 rounded-full hover:text-white">
                <span className="relative flex font-bold text-lg">CBALOL</span>
              </div>
            </Link>
          </nav>
        </div>
        {isAuthenticated ? (
          <div
            ref={userDropdown.ref}
            onClick={userDropdown.toggle}
            className={`hidden lg:flex relative items-center gap-1 p-2 hover:bg-[#0d0e12] ${userDropdown.open ? "bg-[#0d0e12]" : ""}`}
          >
            <img
              src={user?.userPhoto}
              alt="foto de perfil"
              className={`rounded-full h-14 w-14 object-cover border border-gray-700 cursor-pointer ${userDropdown.open ? "z-50" : ""}`}
            />
            <IoMdArrowDropdown
              className={`text-gray-300 text-2xl transition-transform cursor-pointer ${userDropdown.open ? "rotate-180" : ""}`}
            />
            {userDropdown.open && (
              <>
                <div className="fixed inset-0 bg-black/50 z-40" />
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-16 -left-0 bg-[#070709] w-44 rounded-lg shadow-black shadow-sm mt-2 flex flex-col p-2 z-50"
                >
                  <p className="text-gray-300 text-sm">{nickname}</p>
                  <Link
                    to={`user/${id}`}
                    onClick={userDropdown.toggle}
                    className={`flex items-center gap-2 p-2 font-bold text-gray-300 text-lg hover:text-white hover:bg-[#0a0a0e] rounded-lg ${!adm ? "mb-2" : ""}`}
                  >
                    <p>Ver perfil</p>
                    <GoPencil className="text-sm"/>
                  </Link>
                  {adm && (
                    <>
                      <Link
                        to={`/admarea`}
                        className="p-2 font-bold text-gray-300 text-lg hover:text-white hover:bg-[#0a0a0e] rounded-lg mb-2"
                        onClick={userDropdown.toggle}
                      >
                        Área Administrativa
                      </Link>
                    </>
                  )}
                  <button
                    onClick={() => {
                      logout()
                      navigate("/")
                      userDropdown.toggle
                    }}
                    className="text-gray-300 bg-cyan-950 rounded-md p-2 w-36 hover:bg-cyan-900 cursor-pointer text-base font-bold flex gap-2 justify-center items-center"
                  >
                    <RiLogoutBoxRLine className="text-xl"/>
                    <p>Sair</p>
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          <Link to={"/login"} className="hidden lg:block">
            <div className="text-gray-300 bg-cyan-950 rounded-md p-2 w-28 hover:bg-cyan-900 cursor-pointer text-lg font-bold flex gap-1 justify-center items-center">
              <p>Entrar</p>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
