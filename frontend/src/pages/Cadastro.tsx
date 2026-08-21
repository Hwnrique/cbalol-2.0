import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "../services/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../assets/logonew2sf.png";
import { GoMail } from "react-icons/go";
import { GoEye } from "react-icons/go";
import { GoEyeClosed } from "react-icons/go";
import { toast } from "react-toastify"
import ImageUpload from "../components/ImageUpload";

//definindo schema
const cadastroSchema = z
  .object({
    nome: z.string().min(1, "Campo obrigatório"),
    nickname: z.string().min(1, "Campo obrigatório"),
    email: z.string().email("Email inválido"),
    senha: z.string().min(6, "Campo obrigatório"),
    confirmSenha: z.string(),
    userPhoto: z.string().min(1, "Escolha uma foto de perfil"),
  })
  .refine((data) => data.senha === data.confirmSenha, {
    message: "As senhas não conferem!",
    path: ["confirmSenha"],
  });

// criando tipo
type cadastroData = z.infer<typeof cadastroSchema>;

const Cadastro = () => {
  const [showSenha, setShowSenha] = useState(false);
  const [showConfirmSenha, setShowConfirmSenha] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<cadastroData>({
    resolver: zodResolver(cadastroSchema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data: cadastroData) => {
    try {
      const {confirmSenha, ...cadastroData} = data
      await api.post("/auth/cadastro", cadastroData);
      navigate("/login");
    } catch (error) {
      toast.error("Preencha os campos corretamente!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen min-w-full flex-col">
      <main className="border-gray-800 border md:w-[400px] max-w[350px] rounded-xl bg-[#0c0c10] p-8 mt-10">
        <Link to={"/"}>
          <img className="w-28 mb-4 mx-auto" src={logo}></img>
        </Link>
        <h2 className="text-gray-300 text-xl font-bold mb-2">Criar conta</h2>
        <p className="text-gray-600 text-sm mb-8 font-semibold">
          Digite seus dados para criar sua conta
        </p>
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <label className="text-gray-300 font-bold mb-2 text-sm">Nome:</label>
          <div className="h-10 mb-4 flex justify-between relative">
            <input
              className="text-gray-300 caret-gray-300 p-2 w-full focus:outline-none focus:border-cyan-900 focus:ring-1 focus:ring-cyanborder-cyan-900 bg-bgsite border rounded-md border-gray-800 md:placeholder:text-base placeholder:text-sm placeholder:opacity-50"
              placeholder="Digite seu nome"
              {...register("nome")}
            />
          </div>
          {errors.nome && <span className="text-red-900 -mt-2 font-bold text-end text-xs">{errors.nome.message}</span>}
          <label className="text-gray-300 font-bold mb-2 text-sm">
            Nickname:
          </label>
          <div className="h-10 mb-4 flex justify-between relative">
            <input
              className="text-gray-300 caret-gray-300 p-2 w-full focus:outline-none focus:border-cyan-900 focus:ring-1 focus:ring-cyanborder-cyan-900 bg-bgsite border rounded-md border-gray-800 md:placeholder:text-base placeholder:text-sm placeholder:opacity-50"
              placeholder="Digite seu nome de usuário"
              {...register("nickname")}
            />
          </div>
          {errors.nickname && <span className="text-red-900 -mt-2 font-bold text-end text-xs">{errors.nickname.message}</span>}
          <label className="text-gray-300 font-bold mb-2 text-sm">Email:</label>
          <div className="h-10 mb-4 flex justify-between relative">
            <input
              className="text-gray-300 caret-gray-300 p-2 w-full focus:outline-none focus:border-cyan-900 focus:ring-1 focus:ring-cyanborder-cyan-900 bg-bgsite border rounded-md border-gray-800 md:placeholder:text-base placeholder:text-sm placeholder:opacity-50"
              placeholder="Digite seu email"
              {...register("email")}
            />
            <GoMail className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold cursor-text pointer-events-none opacity-50" />
          </div>
          {errors.email && <span className="text-red-900 -mt-2 font-bold text-end text-xs">{errors.email.message}</span>}
          <label className="text-gray-300 font-bold mb-2 text-sm">Senha:</label>
          <div className="h-10 mb-4 flex justify-between relative">
            <input
              type={showSenha ? "text" : "password"}
              className="text-gray-300 w-full caret-gray-300 p-2 focus:outline-none focus:border-cyan-900 focus:ring-1 focus:ring-cyanborder-cyan-900 bg-bgsite border rounded-md border-gray-800 md:placeholder:text-base placeholder:text-sm placeholder:opacity-50"
              placeholder="Digite sua senha"
              {...register("senha")}
            />
            {!showSenha ? (
              <GoEye
                onClick={() => setShowSenha(!showSenha)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold cursor-pointer hover:opacity-100 opacity-50"
              />
            ) : (
              <GoEyeClosed
                onClick={() => setShowSenha(!showSenha)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold cursor-pointer hover:opacity-100 opacity-50"
              />
            )}
          </div>
          {errors.senha && <span className="text-red-900 -mt-2 font-bold text-end text-xs">{errors.senha.message}</span>}
          <label className="text-gray-300 font-bold mb-2 text-sm">
            Confirmar senha:
          </label>
          <div className="h-10 mb-4 flex justify-between relative">
            <input
              type={showConfirmSenha ? "text" : "password"}
              className="text-gray-300 w-full caret-gray-300 p-2 focus:outline-none focus:border-cyan-900 focus:ring-1 focus:ring-cyanborder-cyan-900 bg-bgsite border rounded-md border-gray-800 md:placeholder:text-base placeholder:text-sm placeholder:opacity-50"
              placeholder="Digite sua senha"
              {...register("confirmSenha")}
            />
            {!showConfirmSenha ? (
              <GoEye
                onClick={() => setShowConfirmSenha(!showConfirmSenha)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold cursor-pointer hover:opacity-100 opacity-50"
              />
            ) : (
              <GoEyeClosed
                onClick={() => setShowConfirmSenha(!showConfirmSenha)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold cursor-pointer hover:opacity-100 opacity-50"
              />
            )}
          </div>
          {errors.confirmSenha && <span className="text-red-900 -mt-2 font-bold text-end text-xs">{errors.confirmSenha.message}</span>}
          <Controller
            name="userPhoto"
            control={control}
            render={({ field }) => (
              <ImageUpload label="Foto de Perfil:" onChange={field.onChange} />
            )}
          />
          {errors.userPhoto && <span className="text-red-900 -mt-2 font-bold text-end text-xs">{errors.userPhoto.message}</span>}
          <input
            className="text-gray-300 bg-cyan-950 rounded-md p-2 w-1/2 mx-auto mt-4 hover:bg-cyan-900 cursor-pointer font-bold"
            type="submit"
            value="Cadastrar"
          />
          <p className="mx-auto p-4 md:text-sm text-xs text-gray-300">
            Já tem uma conta?{" "}
            <Link
              className="font-bold text-cyan-900 hover:text-cyan-700 underline"
              to={"/login"}
            >
              Entrar!
            </Link>
          </p>
        </form>
      </main>
      <p className="p-6 text-xs text-gray-600">
        Desenvolvido por Carlos Henrique
      </p>
    </div>
  );
};

export default Cadastro;
