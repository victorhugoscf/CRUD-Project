import axiosClient from "../services/axiosClient";

// Função para registrar um novo usuário
export const registerUser = async (data) => {
  const response = await axiosClient.post("/register", {
    username: data.username,
    password: data.password,
  });
  return response.data;
};

// Função para fazer login

export const loginUser = async ({ email, password }) => {
  try {
    const response = await axiosClient.post("/login", { email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};
