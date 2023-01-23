import Page from "../../@Types/page";
import User from "../../@Types/user";
import { getToken } from "../../utils/storage";
import { api } from "./api";

export const deleteById = async (id: number) => {
  return api.delete<void>(`/users/${id}`);
};

export const updateUser = async (data: User) => {
  return api.put(`/users/${data.id}`, data);
};

export const createUser = async (data: User) => {
  return api.post(`/users`, data);
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

export const getUserById = async (id: number) => {
  return api.get<User>(`/users/${id}`).then((r) => r.data);
};

export const getAllUsersPaged = async (page: number, emailFilter: string) => {
  const r = await api.get<Page<User>>("/users/page/", {
    params: {
      page: page,
      size: 7,
      sort: "firstName,asc",
      email: emailFilter,
    },
  });
  return r.data;
};
