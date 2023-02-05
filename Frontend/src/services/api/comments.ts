import Comment from "../../@Types/comment";
import Page from "../../@Types/page";
import { api } from "./api";

export const getCommentsByUserIdAndMovieId = async (
  userId: number,
  movieId: number
) => {
  const r = await api.get<Comment[]>(
    `/comments/user/${userId}/movie/${movieId}`
  );
  return r.data;
};

export const getCommentsMovieId = async (movieId: number) => {
  return await api
    .get<Page<Comment>>(`/comments/movie/${movieId}`)
    .then((r) => r.data.content);
};

export const saveComment = async (data: Comment) => {
  return await api.post<Comment>(`/comments`, data).then((r) => r.data);
};

export const updateCommentService = async (
  commentId: number,
  data: Comment
) => {
  return await api
    .put<Comment>(`/comments/${commentId}`, data)
    .then((r) => r.data);
};

export const deleteCommentById = async (commentId: number) => {
  return await api.delete<void>(`/comments/${commentId}`);
};
