import Comment from "./comment";
import Genre from "./genre";

type Movie = {
  id: number;
  originTitle: string;
  nationalTitle: string;
  image: string;
  releaseDate: string;
  synopsis: string;
  parentalRating: number;
  mainActors: string;
  averageRating: number;
  movieTrailer: string;
  imageByte: number[];
  comments: Comment[];
  genres: Genre[];
};

export default Movie;
