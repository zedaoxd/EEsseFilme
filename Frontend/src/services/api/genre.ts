import Genre from "../../@Types/genre";
import { api } from "./api";

export const getAllGenres = async () => {
  return await api.get<Genre[]>("/genres").then((r) => r.data);
};
