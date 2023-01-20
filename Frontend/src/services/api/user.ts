import User from "../../@Types/user";
import { getToken } from "../../utils/storage";
import { api } from "./api";

export const updateUser = async (data: User) => {
  return api.put(`/users/${data.id}`, data);
};

export const getCurrentUser = async () => {
  return await api
    .get<User>("/users/profile", {
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    })
    .then((r) => r.data);
};
