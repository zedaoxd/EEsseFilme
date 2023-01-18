import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SpinnerDotted } from "spinners-react";
import { api } from "../../../services/api/api";
import "./styles.scss";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Signup = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    watch,
    register,
    formState: { errors },
  } = useForm<FormData>();

  const { mutate, isLoading } = useMutation(async (values: FormData) => {
    const newUser = { ...values, roles: [{ id: 2, name: "" }] };
    return await api.post("/users", newUser).then((r) => r.data);
  });

  const onSubmit = (formdata: FormData) => {
    mutate(formdata);
    navigate("/auth");
    toast.success("Cadastro efetuado com sucesso! Entre agora");
  };

  return (
    <div className="singin-container">
      <h1>Cadastre-se</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("firstName", {
            required: "Campo obrigatório",
          })}
          type="text"
          placeholder="Digite seu nome"
          name="firstName"
        />
        <div className="invalid-feedback">{errors.firstName?.message}</div>

        <input
          {...register("lastName", {
            required: "Campo obrigatório",
          })}
          type="text"
          placeholder="Digite seu sobrenome"
          name="lastName"
        />
        <div className="invalid-feedback">{errors.lastName?.message}</div>

        <input
          {...register("email", {
            required: "Campo obrigatório",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "E-mail inválido",
            },
          })}
          type="text"
          placeholder="Digite seu e-mail"
          name="email"
        />
        <div className="invalid-feedback">{errors.email?.message}</div>

        <input
          {...register("password", {
            required: "Campo obrigatório",
          })}
          type="password"
          placeholder="Digite sua senha"
          name="password"
        />
        <div className="invalid-feedback">{errors.password?.message}</div>

        <input
          {...register("confirmPassword", {
            required: true,
            minLength: {
              value: 8,
              message: "deve conter pelo menos 8 caracteres",
            },
            maxLength: {
              value: 16,
              message: "deve ter menos que 16 caracteres",
            },
            validate: (value: string) =>
              watch("password") !== value ? "As senhas não são iguais!" : true,
          })}
          type="password"
          placeholder="Repita sua senha"
          name="confirmPassword"
        />
        <div className="invalid-feedback">
          {errors.confirmPassword?.message}
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? <SpinnerDotted color="#fff" /> : <span>Cadastrar</span>}
        </button>
      </form>
      <button type="button" onClick={() => navigate("/auth/login")}>
        Faça seu login agora
      </button>
    </div>
  );
};

export default Signup;
