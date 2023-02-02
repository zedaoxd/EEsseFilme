import AddIcon from "@mui/icons-material/Add";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import Select from "react-select";
import { toast } from "react-toastify";
import { SpinnerDotted } from "spinners-react";
import Role from "../../../../../@Types/role";
import User from "../../../../../@Types/user";
import { getAllRoles } from "../../../../../services/api/role";
import {
  createUser,
  getUserById,
  updateUser,
} from "../../../../../services/api/user";
import "./styles.scss";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  roles: Role[];
  password: string;
  confirmPassword: string;
};

const CreateUser = () => {
  const { id } = useParams();
  const isCreate = id === "create";
  const navigate = useNavigate();
  const {
    handleSubmit,
    watch,
    register,
    formState: { errors },
    control,
    setValue,
  } = useForm<FormData>();
  const { data: roles } = useQuery(["getAllRoles"], getAllRoles);
  const client = useQueryClient();

  useEffect(() => {
    getUserById(Number(id)).then((user) => {
      setValue("firstName", user.firstName);
      setValue("lastName", user.lastName);
      setValue("email", user.email);
      setValue("roles", user.roles);
    });
  }, [isCreate, id]);

  const { mutate, isLoading } = useMutation(
    async (u: User) => (isCreate ? createUser(u) : updateUser(u)),
    {
      onSuccess: () => client.invalidateQueries(["getAllUsersPaged", 0]),
    }
  );

  const onSubmit = (formdata: FormData) => {
    const user: any = { ...formdata, id };
    mutate(user as User);
    navigate("/profile/admin/users");
    toast.success(
      isCreate
        ? "Cadastro efetuado com sucesso!"
        : "Alteração efetuada com sucesso!"
    );
  };

  return (
    <main className="createUserMainContainer">
      <h1>{isCreate ? "Criação de novo usuário" : "Edição de usuário"}</h1>
      <div className="createUserFormContainer">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="createUserFormContainerNameAndLastame">
            <div className="createUserFormInputName">
              <input
                {...register("firstName", {
                  required: "Campo obrigatório",
                })}
                type="text"
                placeholder="Digite seu nome"
                name="firstName"
              />
              <div className="invalid-feedback">
                {errors.firstName?.message}
              </div>
            </div>

            <div>
              <input
                {...register("lastName", {
                  required: "Campo obrigatório",
                })}
                type="text"
                placeholder="Digite seu sobrenome"
                name="lastName"
              />
              <div className="invalid-feedback">{errors.lastName?.message}</div>
            </div>
          </div>

          <div>
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
          </div>

          <div>
            <Controller
              name="roles"
              rules={{ required: true }}
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={roles}
                  isMulti
                  classNamePrefix="createUserSelect"
                  getOptionLabel={(r: Role) => r.name}
                  getOptionValue={(r: Role) => r.id.toString()}
                  placeholder="Selecione as roles"
                />
              )}
            />
            {errors.roles && (
              <div className="invalid-feedback">Campo obrigatório</div>
            )}
          </div>

          <div>
            <input
              {...register("password")}
              type="password"
              placeholder="Digite sua senha"
              name="password"
              disabled={!isCreate}
            />
            <div className="invalid-feedback">{errors.password?.message}</div>
          </div>

          <div>
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
                validate: (value: string) =>
                  watch("password") === value || "As senhas não são iguais!",
              })}
              disabled={!isCreate}
              type="password"
              placeholder="Repita sua senha"
              name="confirmPassword"
            />
            <div className="invalid-feedback">
              {errors.confirmPassword?.message}
            </div>
          </div>

          {isLoading ? (
            <SpinnerDotted />
          ) : (
            <button type="submit">
              {isCreate ? (
                <>
                  <AddIcon />
                  Salvar
                </>
              ) : (
                <>
                  <SystemUpdateAltIcon />
                  Editar
                </>
              )}
            </button>
          )}
        </form>
      </div>
    </main>
  );
};

export default CreateUser;
