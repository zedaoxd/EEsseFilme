import Genre from "../../@Types/genre";
import { api } from "./api";

export const getAllGenres = async () => {
  return await api.get<Genre[]>("/genres").then((r) => r.data);
};

export const saveGenre = async (data: Genre) => {
  return api.post("/genres", data).then((r) => r.data);
};

export const updateGenre = async (data: Genre, id: number) => {
  return api.put(`/genres/${id}`, data).then((r) => r.data);
};

export const deleteGenre = async (id: number) => {
  return api.delete(`/genres/${id}`);
};
