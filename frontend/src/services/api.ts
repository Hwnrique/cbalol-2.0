import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  // pra conseguir ler essa parte do código, lembre do Postman

  return config;

  // em resumo, nós pegamos o token que fica salvo no localStorage,
  // e adicionamos ele no header, mesmo processo feito no postman,
  // só que aqui nós automatizamos.
});

export default api;