import { Rating } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Movie from "../../../../@Types/movie";
import { api } from "../../../../services/api/api";
import { updateRating } from "../../../../services/api/ratings";
import MyCommentsModal from "./MyCommentsModal";
import "./styles.scss";

type Props = {
  idMovie: number;
  rating: number;
  idRating: number;
};

const MovieCardProfile = ({ idMovie, rating, idRating }: Props) => {
  const [movie, setMovie] = useState<Movie>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  

  useEffect(() => {
    api.get<Movie>(`/movies/${idMovie}`).then((r) => setMovie(r.data));
  }, []);

  return (
    <div className="MovieCardProfileContainer">
      {movie && (
        <img src={`data:image/png;base64, ${movie.imageByte}`} alt="" onClick={() => setIsModalOpen(true)}/>
      )}
      <div className="starContainer">
        <Rating
          name="half-rating"
          precision={0.5}
          readOnly
          value={rating}
        />
      </div>
      <MyCommentsModal
        isOpen={isModalOpen}
        rating={rating}
        idRating={idRating}
        idMovie={idMovie}
        originalTitle={movie?.originTitle}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default MovieCardProfile;
