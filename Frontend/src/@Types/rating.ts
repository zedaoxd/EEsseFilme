import Comment from "./comment";
import Genre from "./genre";
import Role from "./role";

type Rating = {
  id: number;
  rating: number;
  dateRating: string;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    roles: Role[];
    comments: Comment[];
    ratings: Rating[];
  };
  movie: {
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
};

export default Rating;
