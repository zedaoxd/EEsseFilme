import Movie from "./movie";
import User from "./user";

type Comment = {
  id: number;
  description: string;
  spoiler: boolean;
  dateComment: string;
  user: User;
  movie: Movie;
};

export default Comment;
