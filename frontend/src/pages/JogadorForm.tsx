import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ImageUpload from "../components/ImageUpload";
import type { Time } from "../types/Time";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const createJogadorSchema = z.object({
  nome: z.string().min(1, "Campo Obrigatório"),
  nickname: z.string().min(1, "Campo Obrigatório"),
  idade: z.number().min(1, "Campo Obrigatório"),
  foto: z.string().min(1, "Campo Obrigatório"),
  role: z.string().min(1, "Campo Obrigatório"),
  titulos: z.string().optional(),
  time: z.string().optional(),
});

type createJogadorData = z.infer<typeof createJogadorSchema>;

interface JogadorFormProps {
  id?: string;
}

const JogadorForm = ({ id }: JogadorFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<createJogadorData>({
    resolver: zodResolver(createJogadorSchema),
  });

  const { data: jogador } = useQuery({
    queryKey: ["jogador", id],
    queryFn: () => api.get(`/jogador/${id}`).then((res) => res.data),
    enabled: !!id, // só busca se possuir id
  });

  useEffect(() => {
    if (jogador) {
      reset({
        nome: jogador.nome,
        nickname: jogador.nickname,
        idade: jogador.idade,
        foto: jogador.foto,
        role: jogador.role,
        titulos: Array.isArray(jogador.titulos)
          ? jogador.titulos.join(", ")
          : "",
        time: jogador.time?._id || "",
      });
    }
  }, [jogador, reset]);

  const navigate = useNavigate();

  const onSubmit = async (data: createJogadorData) => {
  try {
    const titulos = data.titulos
      ? data.titulos
          .split(",")
          .map(t => t.trim())
          .filter(Boolean)
      : [];

    if (id) {
      await api.put(`/jogador/${id}`, {
        ...data,
        titulos,
      });
    } else {
      await api.post("/jogador/create", {
        ...data,
        titulos,
      });
    }

    toast.success(id ? "Jogador atualizado!" : "Jogador cadastrado!");
    navigate("/");
  } catch (error) {
    console.error(error);
    toast.error("Preencha os campos corretamente!");
  }
};

  const { data: times } = useQuery<Time[]>({
    queryKey: ["time"],
    queryFn: () => api.get("/time?ativo=true").then((res) => res.data),
  });

  return (
    <div className="flex justify-center items-center flex-col">
      <h2 className="text-white text-2xl lg:text-4xl font-bold mt-20 text-center">
        {id ? "Editar Jogador" : "Cadastrar Jogador"}
      </h2>
      <main className="border-gray-800 border md:w-[400px] w-[350px] rounded-xl bg-[#0c0c10] p-8 mt-10">
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <label className="text-gray-300 font-bold mb-2 text-sm">Nome:</label>
          <div className="h-10 mb-4 flex justify-between relative">
            <input
              className="text-gray-300 caret-gray-300 p-2 w-full focus:outline-none focus:border-cyan-900 focus:ring-1 focus:ring-cyanborder-cyan-900 bg-bgsite border rounded-md border-gray-800 md:placeholder:text-base placeholder:text-sm placeholder:opacity-50"
              placeholder="Digite o nome do jogador"
              {...register("nome")}
            />
          </div>
          {errors.nome && (
            <span className="text-red-900 -mt-2 font-bold text-end text-xs">
              {errors.nome.message}
            </span>
          )}
          <label className="text-gray-300 font-bold mb-2 text-sm">Nickname:</label>
          <div className="h-10 mb-4 flex justify-between relative">
            <input
              className="text-gray-300 caret-gray-300 p-2 w-full focus:outline-none focus:border-cyan-900 focus:ring-1 focus:ring-cyanborder-cyan-900 bg-bgsite border rounded-md border-gray-800 md:placeholder:text-base placeholder:text-sm placeholder:opacity-50"
              placeholder="Digite o nick do jogador"
              {...register("nickname")}
            />
            {errors.nickname && (
            <span className="text-red-900 -mt-2 font-bold text-end text-xs">
              {errors.nickname.message}
            </span>
          )}
          </div>
          <label className="text-gray-300 font-bold mb-2 text-sm">Idade:</label>
          <div className="h-10 mb-4 flex justify-between relative">
            <input
              className="text-gray-300 caret-gray-300 p-2 w-full focus:outline-none focus:border-cyan-900 focus:ring-1 focus:ring-cyanborder-cyan-900 bg-bgsite border rounded-md border-gray-800 md:placeholder:text-base placeholder:text-sm placeholder:opacity-50"
              placeholder="Digite a idade do jogador"
              {...register("idade", { valueAsNumber: true })}
            />
          </div>
          {errors.idade && (
            <span className="text-red-900 -mt-2 font-bold text-end text-xs">
              {errors.idade.message}
            </span>
          )}
          <Controller
            name="foto"
            control={control}
            render={({ field }) => (
              <ImageUpload
                label="Foto do Jogador:"
                onChange={field.onChange}
                value={field.value}
              />
            )}
          />
          {errors.foto && (
            <span className="text-red-900 -mt-2 font-bold text-end text-xs">
              {errors.foto.message}
            </span>
          )}
          <label className="text-gray-300 font-bold mb-2 text-sm">Role:</label>
          <div className="h-10 mb-4 flex justify-between relative">
            <input
              className="text-gray-300 caret-gray-300 p-2 w-full focus:outline-none focus:border-cyan-900 focus:ring-1 focus:ring-cyanborder-cyan-900 bg-bgsite border rounded-md border-gray-800 md:placeholder:text-base placeholder:text-sm placeholder:opacity-50"
              placeholder="Digite a role do jogador"
              {...register("role")}
            />
          </div>
          {errors.role && (
            <span className="text-red-900 -mt-2 font-bold text-end text-xs">
              {errors.role.message}
            </span>
          )}
          <label className="text-gray-300 font-bold mb-2 text-sm">
            Títulos:
          </label>
          <div className="h-10 mb-4 flex justify-between relative">
            <input
              className="text-gray-300 caret-gray-300 p-2 w-full focus:outline-none focus:border-cyan-900 focus:ring-1 focus:ring-cyanborder-cyan-900 bg-bgsite border rounded-md border-gray-800 md:placeholder:text-base placeholder:text-sm placeholder:opacity-50"
              placeholder="Informe os títulos ( se possuir algum )"
              {...register("titulos")}
            />
          </div>
          {errors.titulos && (
            <span className="text-red-900 -mt-2 font-bold text-end text-xs">
              {errors.titulos.message}
            </span>
          )}
          <label className="text-gray-300 font-bold mb-2 text-sm">Time:</label>
          <select
            {...register("time")}
            className="mb-4 text-gray-300 caret-gray-300 p-2 w-full focus:outline-none focus:border-cyan-900 focus:ring-1 focus:ring-cyanborder-cyan-900 bg-bgsite border rounded-md border-gray-800 md:placeholder:text-base placeholder:text-sm placeholder:opacity-50"
          >
            <option value="">Selecione o time</option>
            {(times ?? []).map((time) => (
              <option key={time._id} value={time._id}>
                {time.nome}
              </option>
            ))}
          </select>
          {errors.time && (
            <span className="text-red-900 -mt-2 font-bold text-end text-xs">
              {errors.time.message}
            </span>
          )}
          <input
            className="text-gray-300 bg-cyan-950 rounded-md p-2 w-1/2 mx-auto mt-4 hover:bg-cyan-900 cursor-pointer font-bold"
            type="submit"
            value={id ? "Salvar Alterações" : "Cadastrar"}
          />
        </form>
      </main>
    </div>
  );
};

export default JogadorForm;
