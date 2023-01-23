import Role from "../../@Types/role";
import { api } from "./api";

export const getAllRoles = async () => {
  return await api.get<Role[]>("/roles").then((r) => r.data);
};
