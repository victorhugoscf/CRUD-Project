import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../services/axiosClient";
import { useStateContext } from "../contexts/contextprovider";

export default function Register() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef(); 
  const [errors, setErrors] = useState([]); // Para armazenar erros de validação

  const { setUser, setToken } = useStateContext();

  const submit = async (ev) => {
    ev.preventDefault();
    setErrors([]); // Limpa os erros anteriores

    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmRef.current.value, 
    };

    let validationErrors = [];

   
    if (!payload.name) {
      validationErrors.push("O nome é obrigatório.");
    }

   
    if (!payload.email) {
      validationErrors.push("O email é obrigatório.");
    }

    
    if (!payload.password) {
      validationErrors.push("A senha é obrigatória.");
    } else if (payload.password.length < 8) {
      validationErrors.push("A senha deve ter pelo menos 8 caracteres.");
    }

    
    if (!payload.password_confirmation) {
      validationErrors.push("A confirmação da senha é obrigatória.");
    } else if (payload.password !== payload.password_confirmation) {
      validationErrors.push("As senhas não correspondem.");
    }

    // Se houver erros, atualize o estado e retorne
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const { data } = await axiosClient.post("/register", payload);
      setUser(data.user);
      setToken(data.token);
    } catch (err) {
      const response = err.response;
      if (response && response.status === 422) {
        console.log(response.data.errors);
        const apiErrors = Object.values(response.data.errors).flat();
        setErrors(apiErrors); 
      } else {
        console.error("Erro ao registrar:", err);
      }
    }
  };

  return (
    <div className="login-signup-form animated fadeinDown">
      <div className="form">
        <h1 className="title">Registrar uma nova conta</h1>
        <form onSubmit={submit}>
          <input type="text" ref={nameRef} placeholder="Nome" />
          <input type="email" ref={emailRef} placeholder="Email" />
          <input type="password" ref={passwordRef} placeholder="Senha" />
          <input
            type="password"
            ref={passwordConfirmRef}
            placeholder="Confirmar senha"
          />

          {errors.length > 0 && (
            <div className="error-messages">
              {errors.map((error, index) => (
                <p key={index} className="error">
                  {error}
                </p>
              ))}
            </div>
          )}

          <button className="btn btn-block">Registrar</button>
          <p className="message">
            Já tem uma conta? <Link to="/login">Entrar</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
