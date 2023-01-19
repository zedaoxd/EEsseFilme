import { AxiosRequestConfig } from "axios";
import { api } from "./api";

export const updateUser = async (config: AxiosRequestConfig, token: string) => {
  return api({
    ...config,
    method: "PUT",
    url: `/users/${config.data?.id}`,
    headers: {
      ...config.headers,
      Authorization: "Bearer " + token,
    },
  });
};
