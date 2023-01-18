import { Rating } from "@mui/material";
import { useEffect, useState } from "react";
import Movie from "../../../../@Types/movie";
import { api } from "../../../../services/api/api";
import MyCommentsModal from "./MyCommentsModal";
import "./styles.scss";

type Props = {
  idMovie: number;
  rating: number;
};

const MovieCardProfile = ({ idMovie, rating }: Props) => {
  const [movie, setMovie] = useState<Movie>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    api.get<Movie>(`/movies/${idMovie}`).then((r) => setMovie(r.data));
  }, []);

  return (
    <div
      className="MovieCardProfileContainer"
      onClick={() => setIsModalOpen((prev) => !prev)}
    >
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
      <MyCommentsModal
        isOpen={isModalOpen}
        rating={rating}
        idMovie={idMovie}
        originalTitle={movie?.originTitle}
      />
    </div>
  );
};

export default MovieCardProfile;
