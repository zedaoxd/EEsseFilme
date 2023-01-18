import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import "./styles.scss";

type FormLogin = {
  username: string;
  password: string;
};

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [hasError, setHasError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormLogin>();

  const onSubmit = (formLogin: FormLogin) => {
    login(formLogin)
      .then(() => navigate("/profile"))
      .catch(() => {
        setHasError(true);
        setValue("password", "");
        setValue("username", "");
      });
  };

  return (
    <div className="login-container">
      <h1>Logar</h1>
      {hasError && (
        <span style={{ color: "red" }}>Ocorreu um erro ao logar</span>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("username", {
            required: "Campo obrigatório",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Email inválido",
            },
          })}
          type="text"
          placeholder="Email"
          name="username"
        />
        <div className="invalid-feedback">{errors.username?.message}</div>
        <input
          {...register("password", {
            required: "Campo obrigatório",
          })}
          type="password"
          placeholder="Password"
          name="password"
        />
        <div className="invalid-feedback">{errors.password?.message}</div>
        <button type="submit">Entrar</button>
      </form>
      <span>Não tem conta? </span>
      <button type="button" onClick={() => navigate("/auth/signup")}>
        Cadastre-se
      </button>
    </div>
  );
};

export default Login;
