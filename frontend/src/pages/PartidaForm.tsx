import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import type { Time } from "../types/Time";
import { useEffect } from "react";

const createPartidaSchema = z.object({
  time1: z.string().min(1, "Selecione o time 1"),
  time2: z.string().min(1, "Selecione o time 2"),
  placarTime1: z.preprocess(
    (val) => (val === "" || val === undefined ? undefined : Number(val)),
    z.number().optional(),
  ),
  placarTime2: z.preprocess(
    (val) => (val === "" || val === undefined ? undefined : Number(val)),
    z.number().optional(),
  ),
  data: z.string().min(1, "Campo Obrigatório"),
  status: z.enum(["Pendente", "Finalizado"]),
  modelo: z.enum(["MD1", "MD3", "MD5"]),
});

type createPartidaData = {
  time1: string;
  time2: string;
  placarTime1?: number | string;
  placarTime2?: number | string;
  data: string;
  status: "Pendente" | "Finalizado";
  modelo: "MD1" | "MD3" | "MD5";
};

interface PartidaFormProps {
  id?: string;
}

const PartidaForm = ({ id }: PartidaFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<createPartidaData>({
    resolver: zodResolver(createPartidaSchema) as any, // força o tipo
  });

  const { data: partida } = useQuery({
    queryKey: ["partida", id],
    queryFn: () => api.get(`/partida/${id}`).then((res) => res.data),
    enabled: !!id,
  });

  useEffect(() => {
    if (partida) {
      reset({
        time1: partida.confronto[0],
        time2: partida.confronto[1],
        placarTime1: partida.placarTime1,
        placarTime2: partida.placarTime2,
        data: partida.data.split("T")[0],
        status: partida.status,
        modelo: partida.modelo,
      });
    }
  }, [partida, reset]);

  const navigate = useNavigate();

  const onSubmit = async (data: createPartidaData) => {
    try {
      if (id) {
        const { time1, time2, ...resto } = data;

        await api.put(`/partida/${id}`, {
          ...resto,
          confronto: [time1, time2],
        });
      } else {
        const { time1, time2, ...resto } = data;

        await api.post("/partida/create", {
          ...resto,
          confronto: [time1, time2],
        });
      }
      navigate("/");
    } catch (error) {
      toast.error("Erro ao criar partida!");
    }
  };

  const { data: times } = useQuery<Time[]>({
    queryKey: ["time"],
    queryFn: () => api.get("/time?ativo=true").then((res) => res.data),
  });

  return (
    <div className="flex justify-center items-center flex-col">
      <h2 className="text-white text-2xl lg:text-4xl font-bold mt-20 text-center">
        {id ? "Editar Confronto" : "Criar Confronto"}
      </h2>
      <main className="border-gray-800 border md:w-[400px] w-[350px] rounded-xl bg-[#0c0c10] p-8 mt-10">
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <label className="text-gray-300 font-bold mb-2 text-sm">
            Time 1:
          </label>
          <select
            {...register("time1")}
            className="mb-4 text-gray-300 caret-gray-300 p-2 w-full focus:outline-none focus:border-cyan-900 focus:ring-1 focus:ring-cyanborder-cyan-900 bg-bgsite border rounded-md border-gray-800 md:placeholder:text-base placeholder:text-sm placeholder:opacity-50"
          >
            <option value="">Selecione o time</option>
            {(times ?? []).map((time) => (
              <option key={time._id} value={time._id}>
                {time.nome}
              </option>
            ))}
          </select>
          {errors.time1 && (
            <span className="text-red-900 -mt-2 font-bold text-end text-xs">
              {errors.time1.message}
            </span>
          )}
          <label className="text-gray-300 font-bold mb-2 text-sm">
            Time 2:
          </label>
          <select
            {...register("time2")}
            className="mb-4 text-gray-300 caret-gray-300 p-2 w-full focus:outline-none focus:border-cyan-900 focus:ring-1 focus:ring-cyanborder-cyan-900 bg-bgsite border rounded-md border-gray-800 md:placeholder:text-base placeholder:text-sm placeholder:opacity-50"
          >
            <option value="">Selecione o time</option>
            {(times ?? []).map((time) => (
              <option key={time._id} value={time._id}>
                {time.nome}
              </option>
            ))}
          </select>
          {errors.time2 && (
            <span className="text-red-900 -mt-2 font-bold text-end text-xs">
              {errors.time2.message}
            </span>
          )}
          <label className="text-gray-300 font-bold mb-2 text-sm">
            Placar do time 1:
          </label>
          <div className="h-10 mb-4 flex justify-between relative">
            <input
              className="text-gray-300 caret-gray-300 p-2 w-full focus:outline-none focus:border-cyan-900 focus:ring-1 focus:ring-cyanborder-cyan-900 bg-bgsite border rounded-md border-gray-800 md:placeholder:text-base placeholder:text-sm placeholder:opacity-50"
              placeholder="Digite o placar"
              {...register("placarTime1")}
            />
          </div>
          {errors.placarTime1 && (
            <span className="text-red-900 -mt-2 font-bold text-end text-xs">
              {errors.placarTime1.message}
            </span>
          )}
          <label className="text-gray-300 font-bold mb-2 text-sm">
            Placar do time 2:
          </label>
          <div className="h-10 mb-4 flex justify-between relative">
            <input
              className="text-gray-300 caret-gray-300 p-2 w-full focus:outline-none focus:border-cyan-900 focus:ring-1 focus:ring-cyanborder-cyan-900 bg-bgsite border rounded-md border-gray-800 md:placeholder:text-base placeholder:text-sm placeholder:opacity-50"
              placeholder="Digite o placar"
              {...register("placarTime2")}
            />
          </div>
          {errors.placarTime2 && (
            <span className="text-red-900 -mt-2 font-bold text-end text-xs">
              {errors.placarTime2.message}
            </span>
          )}
          <label className="text-gray-300 font-bold mb-2 text-sm">
            Data do confronto:
          </label>
          <input
            type="date"
            className="text-gray-300 caret-gray-300 p-2 w-full focus:outline-none focus:border-cyan-900 focus:ring-1 bg-bgsite border rounded-md border-gray-800 cursor-pointer
  [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:opacity-50 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
            {...register("data")}
          />
          {errors.data && (
            <span className="text-red-900 -mt-2 font-bold text-end text-xs">
              {errors.data.message}
            </span>
          )}
          <label className="text-gray-300 font-bold mb-2 text-sm">
            Status:
          </label>
          <select
            {...register("status")}
            className="mb-4 text-gray-300 caret-gray-300 p-2 w-full focus:outline-none focus:border-cyan-900 focus:ring-1 focus:ring-cyanborder-cyan-900 bg-bgsite border rounded-md border-gray-800 md:placeholder:text-base placeholder:text-sm placeholder:opacity-50"
          >
            <option value="">Selecione o status</option>
            <option value="Pendente">Pendente</option>
            <option value="Finalizado">Finalizado</option>
          </select>
          {errors.status && (
            <span className="text-red-900 -mt-2 font-bold text-end text-xs">
              {errors.status.message}
            </span>
          )}
          <label className="text-gray-300 font-bold mb-2 text-sm">
            Modelo:
          </label>
          <select
            {...register("modelo")}
            className="mb-4 text-gray-300 caret-gray-300 p-2 w-full focus:outline-none focus:border-cyan-900 focus:ring-1 focus:ring-cyanborder-cyan-900 bg-bgsite border rounded-md border-gray-800 md:placeholder:text-base placeholder:text-sm placeholder:opacity-50"
          >
            <option value="">Selecione o modelo</option>
            <option value="MD1">MD1</option>
            <option value="MD3">MD3</option>
            <option value="MD5">MD5</option>
          </select>
          {errors.status && (
            <span className="text-red-900 -mt-2 font-bold text-end text-xs">
              {errors.status.message}
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

export default PartidaForm;
