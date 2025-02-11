import React, { createContext, useContext, useState, useEffect } from "react";
import axiosClient from "../services/axiosClient";
import { registerUser, loginUser } from "./auth";

const stateContext = createContext({
  user: null,
  token: null,
  setUser: () => {},
  setToken: () => {},
  register: () => {},
  login: () => {},
});

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, _setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("ACCESS_TOKEN");
    if (storedToken) {
      setToken(storedToken);
      fetchUser();
    }
  }, []);

  const setToken = (token) => {
    _setToken(token);
    if (token) {
      localStorage.setItem("ACCESS_TOKEN", token);
      axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
      delete axiosClient.defaults.headers.common["Authorization"];
      setUser(null);
    }
  };

  const register = async (data) => {
    try {
      const newUser = await registerUser(data);
      setUser(newUser);
    } catch (error) {
      console.error("Error registering:", error);
    }
  };

  const login = async (data) => {
    try {
      const response = await loginUser(data);
      setToken(response.token);
      setUser({ email: data.email });
    } catch (error) {
      console.error("Error logging in:", error);

      // Checa se o erro é 422 e retorna uma mensagem específica
      if (error.response && error.response.status === 422) {
        return Promise.reject(new Error("E-mail ou senha inválidos."));
      } else {
        return Promise.reject(new Error("Erro ao fazer login. Tente novamente."));
      }
    }
  };

  const fetchUser = async () => {
    try {
      const response = await axiosClient.get("api/user");
      setUser(response.data);
    } catch (error) {
      console.error("Falha ao buscar usuário:", error);
      setUser(null);
    }
  };

  return (
    <stateContext.Provider
      value={{
        user,
        token,
        setUser,
        setToken,
        register,
        login,
      }}
    >
      {children}
    </stateContext.Provider>
  );
};

export const useStateContext = () => useContext(stateContext);
