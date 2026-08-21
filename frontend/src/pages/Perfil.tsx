import { useQuery } from "@tanstack/react-query"
import { useAuth } from "../contexts/AuthContext"
import api from "../services/api"
import Loading from "../components/Loading"
import { Link } from "react-router-dom"
import { FiEdit2 } from "react-icons/fi"

const Perfil = () => {
  const { id, adm } = useAuth()

  const { data: user, isLoading } = useQuery({
    queryKey: ["user", id],
    queryFn: () => api.get(`/user/${id}`).then(res => res.data)
  })

  if (isLoading) return <Loading />
  if (!user) return null

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 mt-10">
      <div className="bg-[#0c0c10] border border-authPainel rounded-2xl p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row gap-8 items-center sm:items-start">
          {/* Foto */}
          <img
            src={user.userPhoto}
            alt={user.nickname}
            className="w-32 h-32 rounded-full object-cover border-4 border-gray-700 shrink-0"
          />
          {/* Informações */}
          <div className="flex flex-col gap-3 flex-1 text-center sm:text-left md:border-l md:pl-6 border-gray-600">
            <div>
              <p className="text-gray-500 text-xs mb-1">Nickname</p>
              <p className="text-white font-black text-2xl">{user.nickname}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs mb-1">Nome</p>
              <p className="text-gray-300 font-bold">{user.nome}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs mb-1">Email</p>
              <p className="text-gray-300">{user.email}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs mb-1">Cargo</p>
              <span className={`text-xs font-bold px-3 py-1 rounded-full border ${adm ? "border-cyan-900 text-cyan-900" : "border-gray-700 text-gray-400"}`}>
                {adm ? "Administrador" : "Membro"}
              </span>
            </div>

            {/* Botão editar */}
            <Link
              to={`/user/edit/${id}`}
              className="flex items-center gap-2 mt-2 text-gray-400 hover:text-white transition-colors text-sm w-fit mx-auto sm:mx-0"
            >
              <FiEdit2 />
              Editar perfil
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Perfil