import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import User from "../../../@Types/user";
import useAuth from "../../../hooks/useAuth";
import { updateUser } from "../../../services/api/user";
import "./styles.scss";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const MyData = () => {
  const { user, getLoginResponse, setUser } = useAuth();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<FormData>();

  useEffect(() => {
    setValue("firstName", user?.firstName || "");
    setValue("lastName", user?.lastName || "");
    setValue("email", user?.email || "");
  }, []);

  const validatePassword = (value: string) =>
    watch("newPassword") !== value ? "As senhas não são iguais!" : true;

  const { mutate } = useMutation(async (data: User) => {
    return await updateUser({ data }, getLoginResponse()?.access_token || "")
      .then((r) => {
        setUser(r.data);
        toast.success("Alterado");
      })
      .catch((e) => {
        if (e.response.status === 406) {
          toast.error("Senha antiga incorreta");
        } else if (e.response.status === 422) {
          toast.error("Este e-mail já esta em uso");
        } else {
          toast.error("Algo deu errado");
        }
      });
  });

  const onSubimit = (formData: FormData) => {
    const obj: any = { ...user, ...formData };
    Object.keys(obj).forEach((k) => obj[k] === "" && delete obj[k]);
    mutate(obj);
  };

  return (
    <div className="myDataContainer">
      <h1>Alterar meus dados</h1>

      <form onSubmit={handleSubmit(onSubimit)}>
        <label htmlFor="firstName">Nome</label>
        <input
          {...register("firstName")}
          type="text"
          name="firstName"
          id="firstName"
        />

        <label htmlFor="lastName">Sobrenome</label>
        <input
          {...register("lastName")}
          type="text"
          name="lastName"
          id="lastName"
        />

        <label htmlFor="email">E-mail</label>
        <input
          {...register("email", {
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "E-mail inválido",
            },
          })}
          type="email"
          name="email"
          id="email"
        />
        <div className="invalid-feedback">{errors.email?.message}</div>

        <label htmlFor="oldPassword">Senha Antiga</label>
        <input
          {...register("oldPassword", {
            minLength: {
              value: 8,
              message: "deve conter pelo menos 8 caracteres",
            },
            maxLength: {
              value: 16,
              message: "deve ter menos que 16 caracteres",
            },
          })}
          type="password"
          name="oldPassword"
          id="oldPassword"
        />
        <div className="invalid-feedback">{errors.oldPassword?.message}</div>

        <label htmlFor="newPassword">Nova Senha</label>
        <input
          {...register("newPassword", {
            minLength: {
              value: 8,
              message: "deve conter pelo menos 8 caracteres",
            },
            maxLength: {
              value: 16,
              message: "deve ter menos que 16 caracteres",
            },
          })}
          type="password"
          name="newPassword"
          id="newPassword"
        />
        <div className="invalid-feedback">{errors.newPassword?.message}</div>

        <label htmlFor="confirmPassword">Confirmar Senha</label>
        <input
          {...register("confirmPassword", {
            minLength: {
              value: 8,
              message: "deve conter pelo menos 8 caracteres",
            },
            maxLength: {
              value: 16,
              message: "deve ter menos que 16 caracteres",
            },
            validate: validatePassword,
          })}
          type="password"
          name="confirmPassword"
          id="confirmPassword"
        />
        <div className="invalid-feedback">
          {errors.confirmPassword?.message}
        </div>

        <button type="submit">Alterar dados</button>
      </form>
    </div>
  );
};

export default MyData;
