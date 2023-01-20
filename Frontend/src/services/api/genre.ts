import { AxiosRequestConfig } from "axios";
import Genre from "../../@Types/genre";
import { api } from "./api";

export const getAllGenres = async () => {
  return await api.get<Genre[]>("/genres").then((r) => r.data);
};

export const saveGenre = async (config: AxiosRequestConfig, token: string) => {
  return api({
    ...config,
    method: "POST",
    url: `/genres`,
    headers: {
      ...config.headers,
      Authorization: "Bearer " + token,
    },
  }).then((r) => r.data);
};

export const updateGenre = async (
  config: AxiosRequestConfig,
  id: number,
  token: string
) => {
  return api({
    ...config,
    method: "PUT",
    url: `/genres/${id}`,
    headers: {
      ...config.headers,
      Authorization: "Bearer " + token,
    },
  }).then((r) => r.data);
};

export const deleteGenre = async (
  id: number,
  token: string,
  config?: AxiosRequestConfig
) => {
  return api({
    ...config,
    method: "DELETE",
    url: `/genres/${id}`,
    headers: {
      ["Accept-Encoding"]: "gzip, deflate, br",
      Authorization: "Bearer " + token,
    },
  }).then((r) => r.data);
};
