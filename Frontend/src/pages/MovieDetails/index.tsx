import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Movie from "../../@Types/movie";
import MovieCard from "../../components/MovieCard";
import { api } from "../../services/api/api";

const MovieDetails = () => {
  const { id } = useParams();

  const [movie, setMovie] = useState<Movie>();

  useEffect(() => {
    api.get<Movie>(`/movies/${id}`).then((response) => setMovie(response.data));
  }, []);

  return (
    <>
      {movie && (
        <MovieCard
          image={movie.imageByte}
          nationalTitle={movie.nationalTitle}
        />
      )}
    </>
  );
};

export default MovieDetails;
