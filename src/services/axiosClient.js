import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8000/api",
});

// Interceptor de requisição para adicionar o token no cabeçalho
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("ACCESS_TOKEN");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor de resposta para tratar erros
axiosClient.interceptors.response.use(
  (response) => {
    return response; // Retorna a resposta corretamente
  },
  (error) => {
    try {
      const { response } = error;
      if (response.status === 401) {
        // Verifica o código de status e remove o token se necessário
        localStorage.removeItem("ACCESS_TOKEN");
      }
    } catch (err) {
      console.error(err);
    }
    throw error;
  }
);

export default axiosClient;
