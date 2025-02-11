import { useState } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/contextprovider";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useStateContext();

  const Submit = async (ev) => {
    ev.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!email || !password) {
      setError("Por favor, preencha todos os campos.");
      setIsLoading(false);
      return;
    }

    try {
      await login({ email, password });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-signup-form animated fadeinDown">
      <div className="form">
        <h1 className="title">Entrar</h1>
        <form onSubmit={Submit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="error-message">{error}</p>}
          <button className="btn btn-block" disabled={isLoading}>
            {isLoading ? "Carregando..." : "Entrar"}
          </button>
          <p className="message">
            <Link to="/recover-password">Esqueceu sua senha?</Link>
          </p>
          <p className="message">
            Não está registrado? <Link to="/register">Crie uma conta</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
