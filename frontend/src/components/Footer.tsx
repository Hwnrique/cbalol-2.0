import { Link } from "react-router-dom";
import logo from "../assets/logofooter.png";
import { FaDiscord } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="md:h-80 h-[30rem] w-full bg-[#0c0d0f] mt-48">
      <div className="h-full w-3/5 mx-auto flex flex-col justify-center">
        <div className="p-4">
          <div className="flex items-center">
            <img className="h-20 w-20" src={logo} alt="cbalol" />
            <h2 className="text-white font-black text-3xl">CBALOL</h2>
          </div>
          <div className="mt-6 mb-10">
            <p className="text-gray-300 font-semibold text-sm">
              Campeonato Bagres de League of Legends.
            </p>
            <p className="text-gray-300 font-semibold text-sm">
              Criado para entreterimento e diversão, sem fins lucrativos.
            </p>
          </div>
        </div>
        <div className="flex lg:flex-row flex-col justify-between border-t border-gray-600 w-full mx-auto p-4">
          <div className="flex mt-6 gap-3">
            <p className="text-gray-300 font-semibold">©2026 | CBALOL</p>
            <Link to={"/"} className="text-gray-300 font-semibold hover:-translate-y-2 duration-300 transition-all">@cbalol</Link>
            <Link to={"https://x.com/hennrijs"} target="_blank" className="text-gray-300 font-semibold hover:-translate-y-2 duration-300 transition-all">@hennrijs</Link>
          </div>
          <div className="flex gap-3 text-gray-300 text-2xl mt-6">
            <Link to={"https://discord.gg/tGT5RVzTJ"} target="_blank" className="hover:-translate-y-2 duration-300 transition-all"><FaDiscord /></Link>
            <Link to={"https://x.com/hennrijs"} target="_blank" className="hover:-translate-y-2 duration-300 transition-all"><BsTwitterX /></Link>
            <Link to={"https://www.instagram.com/hxwrique/"} target="_blank" className="hover:-translate-y-2 duration-300 transition-all"><FaInstagram/></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
