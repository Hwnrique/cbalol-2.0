import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import type { Jogador } from "../types/Jogador";
import { useEffect } from "react";

const createMvpSchema = z.object({
  jogadorId: z.string().min(1, "Selecione o Jogador"),
  dataInicio: z.string().min(1, "Campo Obrigatório"),
  dataFim: z.string().min(1, "Campo Obrigatório"),
  pontuacao: z.number().min(1, "Campo Obrigatório"),
  destaque: z.string().min(1, "Campo Obrigatório"),
});

type createMvpData = z.infer<typeof createMvpSchema>;

interface MvpFormProps {
  id?: string;
}

const MVPForm = ({ id }: MvpFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<createMvpData>({
    resolver: zodResolver(createMvpSchema),
  });

  const { data: mvp } = useQuery({
    queryKey: ["mvp", id],
    queryFn: () => api.get(`mvp/${id}`).then((res) => res.data),
    enabled: !!id,
  });

  useEffect(() => {
    if (mvp) {
      reset({
        jogadorId: mvp.jogadorId,
        dataInicio: mvp.dataInicio.split("T")[0],
        dataFim: mvp.dataFim.split("T")[0],
        pontuacao: mvp.pontuacao,
        destaque: mvp.destaque,
      });
    }
  }, [mvp, reset]);

  const navigate = useNavigate();

  const onSubmit = async (data: createMvpData) => {
    try {
      if (id) {
        await api.put(`mvp/${id}`, data);
      } else {
        await api.post("/mvp/create", data);
      }
      navigate("/");
    } catch (error) {
      toast.error("Preencha os campos corretamente!");
    }
  };

  const { data: jogadores } = useQuery<Jogador[]>({
    queryKey: ["jogador"],
    queryFn: () => api.get("/jogador").then((res) => res.data),
  });

  return (
    <div className="flex justify-center items-center flex-col">
      <h2 className="text-white text-2xl lg:text-4xl font-bold mt-20 text-center">
        {id ? "Editar Destaque" : "Criar Destaque"}
      </h2>
      <main className="border-gray-800 border md:w-[400px] w-[350px] rounded-xl bg-[#0c0c10] p-8 mt-10">
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <label className="text-gray-300 font-bold mb-2 text-sm">
            Time 1:
          </label>
          <select
            {...register("jogadorId")}
            className="mb-4 text-gray-300 caret-gray-300 p-2 w-full focus:outline-none focus:border-cyan-900 focus:ring-1 focus:ring-cyanborder-cyan-900 bg-bgsite border rounded-md border-gray-800 md:placeholder:text-base placeholder:text-sm placeholder:opacity-50"
          >
            <option value="">Selecione o jogador</option>
            {(jogadores ?? []).map((jogador) => (
              <option key={jogador._id} value={jogador._id}>
                {jogador.nome}
              </option>
            ))}
          </select>
          {errors.jogadorId && (
            <span className="text-red-900 -mt-2 font-bold text-end text-xs">
              {errors.jogadorId.message}
            </span>
          )}
          <label className="text-gray-300 font-bold mb-2 text-sm">
            Data de Início:
          </label>
          <input
            type="date"
            className="text-gray-300 caret-gray-300 p-2 w-full focus:outline-none focus:border-cyan-900 focus:ring-1 bg-bgsite border rounded-md border-gray-800 cursor-pointer
  [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:opacity-50 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
            {...register("dataInicio")}
          />
          {errors.dataInicio && (
            <span className="text-red-900 -mt-2 font-bold text-end text-xs">
              {errors.dataInicio.message}
            </span>
          )}
          <label className="text-gray-300 font-bold mt-4 mb-2 text-sm">
            Data do Fim:
          </label>
          <input
            type="date"
            className="mb-4 text-gray-300 caret-gray-300 p-2 w-full focus:outline-none focus:border-cyan-900 focus:ring-1 bg-bgsite border rounded-md border-gray-800 cursor-pointer
  [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:opacity-50 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
            {...register("dataFim")}
          />
          {errors.dataFim && (
            <span className="text-red-900 -mt-2 font-bold text-end text-xs">
              {errors.dataFim.message}
            </span>
          )}
          <label className="text-gray-300 font-bold mb-2 text-sm">
            Pontuação:
          </label>
          <div className="h-10 mb-4 flex justify-between relative">
            <input
              className="text-gray-300 caret-gray-300 p-2 w-full focus:outline-none focus:border-cyan-900 focus:ring-1 focus:ring-cyanborder-cyan-900 bg-bgsite border rounded-md border-gray-800 md:placeholder:text-base placeholder:text-sm placeholder:opacity-50"
              placeholder="Digite a pontuação do jogador"
              {...register("pontuacao", { valueAsNumber: true })}
            />
          </div>
          {errors.pontuacao && (
            <span className="text-red-900 -mt-2 font-bold text-end text-xs">
              {errors.pontuacao.message}
            </span>
          )}
          <label className="text-gray-300 font-bold mb-2 text-sm">
            Destaque na partida:
          </label>
          <textarea
            className="text-gray-300 caret-gray-300 p-2 w-full mb-4 focus:outline-none focus:border-cyan-900 focus:ring-1 bg-bgsite border rounded-md border-gray-800 placeholder:opacity-50 resize-none h-40"
            placeholder="Digite a descrição da notícia"
            {...register("destaque")}
          />
          {errors.destaque && (
            <span className="text-red-900 -mt-2 font-bold text-end text-xs">
              {errors.destaque.message}
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

export default MVPForm;
