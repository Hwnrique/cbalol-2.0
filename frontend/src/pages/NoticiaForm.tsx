import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Controller } from "react-hook-form";
import ImageUpload from "../components/ImageUpload";
import RichTextEditor from "../components/RichTextEditor";
import DOMPurify from "dompurify";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const createNoticeSchema = z.object({
  titulo: z.string().min(1, "Campo Obrigatório"),
  descricao: z.string().min(2, "Campo Obrigatório"),
  capa: z.string().min(1, "Campo Obrigatório"),
  outraImagem: z.string().optional(),
});

type createNoticeData = z.infer<typeof createNoticeSchema>;

// adptando pra poder atualizar
interface NoticiaFormProps {
  id?: string;
}

const NoticiaForm = ({ id }: NoticiaFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<createNoticeData>({
    resolver: zodResolver(createNoticeSchema),
  });

  const { data: noticia } = useQuery({
    queryKey: ["noticia", id],
    queryFn: () => api.get(`/notice/${id}`).then((res) => res.data),
    enabled: !!id, // só busca se possuir id
  });

  // quando os dados chegarem, preenche o formulário
  useEffect(() => {
    if (noticia) {
      reset({
        titulo: noticia.titulo,
        descricao: noticia.descricao,
        capa: noticia.capa,
        outraImagem: noticia.outraImagem ?? "",
      });
    }
  }, [noticia, reset]);

  useForm<createNoticeData>({
    resolver: zodResolver(createNoticeSchema),
    defaultValues: {
      titulo: noticia?.titulo ?? "",
      descricao: noticia?.descricao ?? "",
      capa: noticia?.capa ?? "",
      outraImagem: noticia?.outraImagem ?? "",
    },
  });

  const navigate = useNavigate();

  const onSubmit = async (data: createNoticeData) => {
    try {
      const descricaoLimpa = DOMPurify.sanitize(data.descricao);
      const payload = { ...data, descricao: descricaoLimpa };

      if (id) {
        await api.put(`/notice/${id}`, payload); // editar
      } else {
        await api.post("/notice/create", payload); // criar
      }
      navigate("/");
    } catch (error) {
      toast.error("Erro ao salvar notícia!");
    }
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <h2 className="text-white text-2xl lg:text-4xl font-bold mt-20 text-center">
        {id ? "Editar Notícia" : "Criar Notícia"}
      </h2>
      <main className="border-gray-800 border md:w-[400px] w-[350px] rounded-xl bg-[#0c0c10] p-8 mt-10">
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <label className="text-gray-300 font-bold mb-2 text-sm">
            Título:
          </label>
          <div className="h-10 mb-4 flex justify-between relative">
            <input
              className="text-gray-300 caret-gray-300 p-2 w-full focus:outline-none focus:border-cyan-900 focus:ring-1 focus:ring-cyanborder-cyan-900 bg-bgsite border rounded-md border-gray-800 md:placeholder:text-base placeholder:text-sm placeholder:opacity-50"
              placeholder="Digite o título da notícia"
              {...register("titulo")}
            />
          </div>
          {errors.titulo && (
            <span className="text-red-900 -mt-2 font-bold text-end text-xs">
              {errors.titulo.message}
            </span>
          )}
          <label className="text-gray-300 font-bold mb-2 text-sm">
            Descrição:
          </label>
          <Controller
            name="descricao"
            control={control}
            render={({ field }) => <RichTextEditor onChange={field.onChange} value={field.value}/>}
          />
          {errors.descricao && (
            <span className="text-red-900 -mt-2 font-bold text-end text-xs">
              {errors.descricao.message}
            </span>
          )}
          <Controller
            name="capa"
            control={control}
            render={({ field }) => (
              <ImageUpload label="Foto de Capa" onChange={field.onChange} value={field.value}/>
            )}
          />
          {errors.capa && (
            <span className="text-red-900 -mt-2 font-bold text-end text-xs">
              {errors.capa.message}
            </span>
          )}
          <Controller
            name="outraImagem"
            control={control}
            render={({ field }) => (
              <ImageUpload
                label="Imagem Complementar"
                onChange={field.onChange}
                value={field.value}
              />
            )}
          />
          {errors.outraImagem && (
            <span className="text-red-900 -mt-2 font-bold text-end text-xs">
              {errors.outraImagem.message}
            </span>
          )}
          <input
            className="text-gray-300 bg-cyan-950 rounded-md p-2 w-1/2 mx-auto mt-4 hover:bg-cyan-900 cursor-pointer font-bold"
            type="submit"
            value={id ? "Salvar Alterações" : "Criar Notícia"}
          />
        </form>
      </main>
    </div>
  );
};

export default NoticiaForm;
