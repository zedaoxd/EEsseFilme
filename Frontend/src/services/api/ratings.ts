import { AxiosRequestConfig } from "axios";
import Page from "../../@Types/page";
import Rating from "../../@Types/rating";
import { api } from "./api";

export const getRatingsPagedByUser = async (
  userId: number,
  pageNumber: number,
  options?: AxiosRequestConfig
) => {
  return await api
    .get<Page<Rating>>(`/ratings/users/${userId}`, {
      ...options,
      params: { page: pageNumber, size: 10 },
    })
    .then((r) => r.data);
};
