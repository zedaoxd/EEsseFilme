import Genre from "../../@Types/genre";
import { api } from "./api";

export const getAllGenres = () => {
  return api.get<Genre[]>("/genres").then((r) => r.data);
};
