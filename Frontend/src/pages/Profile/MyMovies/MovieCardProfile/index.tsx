import { Rating } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Movie from "../../../../@Types/movie";
import { api } from "../../../../services/api/api";
import "./styles.scss";

type Props = {
  idMovie: number;
  rating: number;
};

const MovieCardProfile = ({ idMovie, rating }: Props) => {
  const [movie, setMovie] = useState<Movie>();

  useEffect(() => {
    api.get<Movie>(`/movies/${idMovie}`).then((r) => setMovie(r.data));
  }, []);

  return (
    <Link to={`/movie/${idMovie}`} className="MovieCardProfileContainer">
      {movie && (
        <img src={`data:image/png;base64, ${movie.imageByte}`} alt="" />
      )}
      <div className="starContainer">
        <Rating
          name="half-rating-read"
          precision={0.5}
          readOnly
          value={rating}
        />
      </div>
    </Link>
  );
};

export default MovieCardProfile;
