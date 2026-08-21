import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ImageUpload from "../components/ImageUpload";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const createTimeSchema = z.object({
  nome: z.string().min(1, "Campo Obrigatório"),
  logo: z.string().min(1, "Campo Obrigatório"),
  descricao: z.string().min(1, "Campo Obrigatório"),
  banner: z.string().min(1, "Campo Obrigatório"),
  ativo: z.boolean(),
});

type createTimeData = z.infer<typeof createTimeSchema>;

interface TimeFormProps {
  id?: string;
}

const TimeForm = ({ id }: TimeFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<createTimeData>({
    resolver: zodResolver(createTimeSchema),
    defaultValues: {
      ativo: true,
    },
  });

  const { data: time } = useQuery({
    queryKey: ["time", id],
    queryFn: () => api.get(`/time/${id}`).then((res) => res.data),
    enabled: !!id, // só busca se possuir id
  });

  useEffect(() => {
    if (time) {
      reset({
        nome: time.nome,
        logo: time.logo,
        descricao: time.descricao,
        banner: time.banner,
        ativo: time.ativo,
      });
    }
  }, [time, reset]);

  const navigate = useNavigate();

  const onSubmit = async (data: createTimeData) => {
    try {
      if (id) {
        await api.put(`/time/${id}`, data); // editar
      } else {
        await api.post("/time/create", data); // criar
      }
      navigate("/");
    } catch (error) {
      toast.error("Preencha os campos corretamente!");
    }
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <h2 className="text-white text-2xl lg:text-4xl font-bold mt-20 text-center">
        {id ? "Editar Time" : "Cadastrar Time"}
      </h2>
      <main className="border-gray-800 border md:w-[400px] w-[350px] rounded-xl bg-[#0c0c10] p-8 mt-10">
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <label className="text-gray-300 font-bold mb-2 text-sm">Nome:</label>
          <div className="h-10 mb-4 flex justify-between relative">
            <input
              className="text-gray-300 caret-gray-300 p-2 w-full focus:outline-none focus:border-cyan-900 focus:ring-1 focus:ring-cyanborder-cyan-900 bg-bgsite border rounded-md border-gray-800 md:placeholder:text-base placeholder:text-sm placeholder:opacity-50"
              placeholder="Digite o nome do time"
              {...register("nome")}
            />
          </div>
          {errors.nome && (
            <span className="text-red-900 -mt-2 font-bold text-end text-xs">
              {errors.nome.message}
            </span>
          )}
          <Controller
            name="logo"
            control={control}
            render={({ field }) => (
              <ImageUpload label="Logo do time:" onChange={field.onChange} value={field.value}/>
            )}
          />
          {errors.logo && (
            <span className="text-red-900 -mt-2 font-bold text-end text-xs">
              {errors.logo.message}
            </span>
          )}
          <label className="text-gray-300 font-bold mb-2 text-sm">
            Resumo:
          </label>
          <textarea
            className="text-gray-300 caret-gray-300 p-2 w-full mb-4 focus:outline-none focus:border-cyan-900 focus:ring-1 bg-bgsite border rounded-md border-gray-800 placeholder:opacity-50 resize-none h-40"
            placeholder="Digite um resumo do time"
            {...register("descricao")}
          />
          {errors.descricao && (
            <span className="text-red-900 -mt-2 font-bold text-end text-xs">
              {errors.descricao.message}
            </span>
          )}
          <Controller
            name="banner"
            control={control}
            render={({ field }) => (
              <ImageUpload label="Banner do time:" onChange={field.onChange} value={field.value}/>
            )}
          />
          {errors.banner && (
            <span className="text-red-900 -mt-2 font-bold text-end text-xs">
              {errors.banner.message}
            </span>
          )}
          <label className="text-gray-300 font-bold mb-2 text-sm flex items-center gap-2">
            <input
              type="checkbox"
              {...register("ativo")}
              className="w-4 h-4 accent-cyan-900"
            />
            Time ativo
          </label>
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

export default TimeForm;
