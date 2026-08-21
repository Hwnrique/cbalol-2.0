import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "../services/api";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logonew2sf.png";
import { GoMail } from "react-icons/go";
import { GoEye } from "react-icons/go";
import { GoEyeClosed } from "react-icons/go";
import { toast } from "react-toastify"

// defino schema com o zod
const loginSchema = z.object({
  login: z.string().min(1, "Campo obrigatório!"),
  senha: z.string().min(6, "Mínimo 6 caracteres!"),
});

// criando tipo
type LoginData = z.infer<typeof loginSchema>;
// crio o tipo loginData a partir do schema, o que me faz economizar linhas ao não precisar
// criar um tipo do zero

const Login = () => {
  const [showSenha, setShowSenha] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const { login } = useAuth();

  const navigate = useNavigate();

  const onSubmit = async (data: LoginData) => {
    try {
      const response = await api.post("/auth/login", data);

      const token = response.data;

      login(token);
      toast.success("Logado com Sucesso")

      navigate("/");
    } catch (error) {
      toast.error("Login ou senha incorretos!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen flex-col p-10 md:p-0">
      <main className="border-gray-800 border md:max-w-[400px] max-w-[350px] rounded-xl bg-[#0c0c10] p-8">
        <Link to={"/"}>
          <img className="w-28 mb-4 mx-auto" src={logo}></img>
        </Link>
        <h2 className="text-gray-300 text-xl font-bold mb-2">Entrar</h2>
        <p className="text-gray-600 text-sm mb-8 font-semibold">
          Seja bem vindo à comunidade do CBALOL, digite as suas credenciais e
          acesse nosso site
        </p>
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <label className="text-gray-300 font-bold mb-2 text-sm">
            Email/Login
          </label>
          <div className="h-10 mb-4 flex justify-between relative">
            <input
              className="text-gray-300 caret-gray-300 p-2 w-full focus:outline-none focus:border-cyan-900 focus:ring-1 focus:ring-cyanborder-cyan-900 bg-bgsite border rounded-md border-gray-800 md:placeholder:text-base placeholder:text-sm placeholder:opacity-50"
              placeholder="Digite seu email ou usuário"
              {...register("login")}
            />
            <GoMail className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold cursor-text pointer-events-none opacity-50" />
          </div>
          {errors.login && <span className="text-red-900 -mt-2 font-bold text-end text-xs">{errors.login.message}</span>}
          <label className="text-gray-300 font-bold mb-2 text-sm">Senha</label>
          <div className="h-10 mb-4 flex justify-between relative">
            <input
              type={showSenha ? "text" : "password"}
              className="text-gray-300 w-full caret-gray-300 p-2 focus:outline-none focus:border-cyan-900 focus:ring-1 focus:ring-cyanborder-cyan-900 bg-bgsite border rounded-md border-gray-800 md:placeholder:text-base placeholder:text-sm placeholder:opacity-50"
              placeholder="Digite sua senha"
              {...register("senha")}
            />
            {!showSenha ? <GoEye
              onClick={() => setShowSenha(!showSenha)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold cursor-pointer hover:opacity-100 opacity-50"
            /> : <GoEyeClosed
              onClick={() => setShowSenha(!showSenha)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold cursor-pointer hover:opacity-100 opacity-50"
            />}
          </div>
          {errors.senha && <span className="text-red-900 -mt-2 font-bold text-end text-xs">{errors.senha.message}</span>}
          <input
            className="text-gray-300 bg-cyan-950 rounded-md p-2 w-1/2 mx-auto mt-4 hover:bg-cyan-900 cursor-pointer font-bold"
            type="submit"
            value="Entrar"
          />
          <p className="mx-auto p-4 md:text-sm text-xs text-gray-300">
            Não tem uma conta?{" "}
            <Link
              className="font-bold text-cyan-900 hover:text-cyan-700 underline"
              to={"/cadastro"}
            >
              Cadastre-se!
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

export default Login;
