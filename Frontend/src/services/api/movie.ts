import { AxiosRequestConfig } from "axios";
import Movie from "../../@Types/movie";
import Page from "../../@Types/page";
import { api } from "./api";

export const getTop10rating = () => {
  return api.get<Movie[]>("/movies/top10rating").then((r) => r.data);
};

export const getTop10date = () => {
  return api.get<Movie[]>("/movies/top10date").then((r) => r.data);
};

export const getMoviesPaged = (options?: AxiosRequestConfig) => {
  return api.get<Page<Movie>>("/movies", options).then((r) => r.data);
};