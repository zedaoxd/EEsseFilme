import Comment from "../../@Types/comment";
import { api } from "./api";

export const getCommentsByUserIdAndMovieId = (
  userId: number,
  movieId: number
) => {
  return api
    .get<Comment[]>(`/comments/user/${userId}/movie/${movieId}`)
    .then((r) => r.data);
};
