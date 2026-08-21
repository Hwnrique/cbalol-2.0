import { useForm, Controller } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import api from "../services/api"
import ImageUpload from "../components/ImageUpload"

const userSchema = z.object({
  nickname: z.string().min(1, "Campo obrigatório"),
  nome: z.string().min(1, "Campo obrigatório"),
  userPhoto: z.string().min(1, "Campo obrigatório"),
})

type UserData = z.infer<typeof userSchema>

interface UserFormProps {
  id?: string
}

const UserForm = ({ id }: UserFormProps) => {
  const navigate = useNavigate()

  const { register, handleSubmit, control, reset, formState: { errors } } = useForm<UserData>({
    resolver: zodResolver(userSchema)
  })

  const { data: user } = useQuery({
    queryKey: ["user", id],
    queryFn: () => api.get(`/user/${id}`).then(res => res.data),
    enabled: !!id
  })

  // preenche os campos quando os dados chegam
  useEffect(() => {
    if (user) {
      reset({
        nickname: user.nickname,
        nome: user.nome,
        userPhoto: user.userPhoto
      })
    }
  }, [user, reset])

  const onSubmit = async (data: UserData) => {
    try {
      await api.put(`/user/${id}`, data)
      toast.success("Perfil atualizado!")
      navigate(`/user/${id}`)
    } catch (error) {
      toast.error("Erro ao atualizar perfil!")
    }
  }

  return (
    <div className="flex justify-center items-center flex-col">
      <h2 className="text-white text-2xl lg:text-4xl font-bold mt-20 text-center">
        Editar Perfil
      </h2>
      <main className="border-gray-800 border md:w-[400px] w-[350px] rounded-xl bg-[#0c0c10] p-8 mt-10">
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>

          <label className="text-gray-300 font-bold mb-2 text-sm">Nickname:</label>
          <div className="h-10 mb-4 flex justify-between relative">
            <input
              className="text-gray-300 caret-gray-300 p-2 w-full focus:outline-none focus:border-cyan-900 focus:ring-1 bg-bgsite border rounded-md border-gray-800 placeholder:opacity-50"
              placeholder="Digite seu nickname"
              {...register("nickname")}
            />
          </div>
          {errors.nickname && (
            <span className="text-red-900 -mt-2 font-bold text-end text-xs">
              {errors.nickname.message}
            </span>
          )}

          <label className="text-gray-300 font-bold mb-2 text-sm">Nome:</label>
          <div className="h-10 mb-4 flex justify-between relative">
            <input
              className="text-gray-300 caret-gray-300 p-2 w-full focus:outline-none focus:border-cyan-900 focus:ring-1 bg-bgsite border rounded-md border-gray-800 placeholder:opacity-50"
              placeholder="Digite seu nome"
              {...register("nome")}
            />
          </div>
          {errors.nome && (
            <span className="text-red-900 -mt-2 font-bold text-end text-xs">
              {errors.nome.message}
            </span>
          )}

          <Controller
            name="userPhoto"
            control={control}
            render={({ field }) => (
              <ImageUpload
                label="Foto de perfil:"
                onChange={field.onChange}
                value={field.value}
              />
            )}
          />
          {errors.userPhoto && (
            <span className="text-red-900 -mt-2 font-bold text-end text-xs">
              {errors.userPhoto.message}
            </span>
          )}

          <input
            className="text-gray-300 bg-cyan-950 rounded-md p-2 w-1/2 mx-auto mt-4 hover:bg-cyan-900 cursor-pointer font-bold"
            type="submit"
            value="Salvar"
          />
        </form>
      </main>
    </div>
  )
}

export default UserForm