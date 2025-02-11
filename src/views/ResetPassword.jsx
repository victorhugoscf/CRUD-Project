import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosClient from "../services/axiosClient";

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Pegando os parâmetros da URL
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  const emailFromURL = queryParams.get("email");

  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setError(null);
    setMessage(null);
    setIsLoading(true);

    // Validações
    if (!password || !passwordConfirmation) {
      setError("Por favor, digite e confirme a nova senha.");
      setIsLoading(false);
      return;
    }

    if (password !== passwordConfirmation) {
      setError("As senhas não coincidem.");
      setIsLoading(false);
      return;
    }

    try {
      await axiosClient.post("/password/reset", {
        email: emailFromURL,
        password,
        password_confirmation: passwordConfirmation,
        token,
      });

      // Mensagem de sucesso
      setMessage("Sua senha foi redefinida com sucesso! Redirecionando...");
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      if (err.response) {
        if (err.response.status === 400 && err.response.data.error?.includes("token")) {
          setError("O link de redefinição de senha expirou. Solicite um novo.");
        } else {
          setError(err.response.data.error || "O link de redefinição de senha expirou. Solicite um novo.");
        }
      } else {
        setError("Erro ao redefinir a senha. Tente novamente.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-signup-form animated fadeinDown">
      <div className="form">
        <h1 className="title">Redefinir Senha</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Nova Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value.trim())}
            required
          />
          <input
            type="password"
            placeholder="Confirme a Nova Senha"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value.trim())}
            required
          />
          {error && <p className="alert">{error}</p>}
          {message && <p className="notification">{message}</p>}
          <button className="btn btn-block" disabled={isLoading}>
            {isLoading ? "Redefinindo..." : "Redefinir Senha"}
          </button>
        </form>
      </div>
    </div>
  );
}
