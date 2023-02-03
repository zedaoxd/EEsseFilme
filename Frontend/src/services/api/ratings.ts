import { AxiosRequestConfig } from "axios";
import Page from "../../@Types/page";
import Rating from "../../@Types/rating";
import { getToken } from "../../utils/storage";
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
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    })
    .then((r) => r.data);
};

export const updateRating = async (
  rating: number,
  movieId: number,
  ratingId: number
) => {
  return await api
    .put<Rating>(
      `/ratings/${ratingId}`,
      { rating, movie: { id: movieId } },
      { headers: { Authorization: "Bearer " + getToken() } }
    )
    .then((r) => r.data);
};
