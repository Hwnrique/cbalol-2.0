import { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
  id: string;
  nickname: string;
  adm: boolean;
  token: string;
  login: (token: string) => void;
  logout: () => void;
}
// criando interface pro contexto

interface TokenPayload {
  id: string;
  adm: boolean;
  nickname: string;
}
// criando typagem para os dados que vem do payload

interface AuthProviderProps {
  children: React.ReactNode;
}
// tipando o children

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  // para evitar que dados se percam ao atualizar a página, vamos criar
  // valores iniciais para os useStates
  const storedToken = localStorage.getItem("token") ?? "";
  // buscando token do localStorage

  const storedPayload = storedToken ? (() => {
  try {
    return jwtDecode<TokenPayload>(storedToken)
  } catch {
    localStorage.removeItem("token")
    return null
  }
})() : null

  const [id, setId] = useState(storedPayload?.id ?? "");
  const [nickname, setNickname] = useState(storedPayload?.nickname ?? "");
  const [adm, setAdm] = useState(storedPayload?.adm ?? false);
  const [token, setToken] = useState(storedToken);

  const login = (token: string) => {
    localStorage.setItem("token", token);
    setToken(token);

    const payload = jwtDecode<TokenPayload>(token);
    setId(payload.id);
    setNickname(payload.nickname);
    setAdm(payload.adm);
    // aqui nós pegamos o token pra validar o login
    // e atualizados os dados dos Sets com o dado inserido no payload
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setAdm(false);
    setId("");
    setNickname("");
    // ao deslogar, limpamos todos os campos e removemos o token que pegamos no login
  };

  return (
    <AuthContext.Provider value={{ id, nickname, adm, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("Tem algo de errado aqui!");
  }
  return context;
};
