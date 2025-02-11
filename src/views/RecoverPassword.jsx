import { useState } from "react";
import axiosClient from "../services/axiosClient";

export default function RecoverPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const isValidEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setError(null);
    setMessage(null);
    setIsLoading(true);

    // Validação de campos
    if (!email) {
      setError("Por favor, digite um e-mail.");
      setIsLoading(false);
      return;
    }

    if (!isValidEmail(email)) {
      setError("Por favor, insira um e-mail válido.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axiosClient.post("/password/forgot", { email });

      // Mensagem de sucesso
      setMessage("As instruções para recuperação de senha foram enviadas com sucesso! Verifique seu e-mail.");
    } catch (err) {
      if (err.response) {
        if (err.response.status === 404) {
          // Caso o e-mail não esteja registrado
          setError("E-mail não encontrado.");
        } else {
          setError(err.response.data.error || "Erro ao enviar as instruções. E-mail não encontrado.");
        }
      } else {
        setError("Erro ao enviar as instruções. Tente novamente.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-signup-form animated fadeinDown">
      <div className="form">
        <h1 className="title">Recuperar Senha</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value.trim())}
            required
          />
         
          {error && <p className="alert">{error}</p>}
          {message && <p className="notification">{message}</p>}
          <button className="btn btn-block" disabled={isLoading}>
            {isLoading ? "Enviando..." : "Enviar Instruções"}
          </button>
          
        </form>
      </div>
    </div>
  );
}
