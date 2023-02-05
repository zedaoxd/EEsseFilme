import Rating from "@mui/material/Rating";
import RateReviewIcon from "@mui/icons-material/RateReview";
import StarIcon from "@mui/icons-material/Star";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import "./styles.scss";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ModalComment from "./ModalComment";
import Movie from "../../../@Types/movie";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getRatingByMovieIdCurrentUser,
  saveRating,
  updateRating,
} from "../../../services/api/ratings";
import { SpinnerCircular } from "spinners-react";

type Props = {
  movie: Movie;
};

type FormData = {
  id: number;
  rating: number;
  movie: {
    id: number;
  };
};

const BannerRatingComment = ({ movie }: Props) => {
  const { isAuthenticated } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const client = useQueryClient();
  const [rating, setRating] = useState<FormData>();

  useEffect(() => {
    getRatingByMovieIdCurrentUser(movie.id).then((r) => setRating(r));
  }, [movie.averageRating]);

  const { mutate } = useMutation(
    async (formData: FormData) =>
      rating?.rating !== null
        ? updateRating(formData.rating, formData.movie.id, formData.id)
        : saveRating(formData.rating, formData.movie.id),
    {
      onSuccess: () => {
        client.invalidateQueries(["getOneMovie"]);
      },
    }
  );

  const onChangeRating = (
    event: React.SyntheticEvent,
    value: number | null
  ) => {
    mutate({
      rating: value || 0,
      movie: { id: movie.id },
      id: rating?.id,
    } as FormData);
  };

  return (
    <section className="BannerRatingCommentContainer">
      {isAuthenticated() ? (
        <>
          {!rating ? (
            <SpinnerCircular color="red" />
          ) : (
            <div>
              <span>Avaliar :</span>

              <Rating
                name="half-rating"
                value={rating.rating}
                precision={0.5}
                onChange={onChangeRating}
                emptyIcon={
                  <StarIcon
                    style={{ opacity: 1, color: "gray" }}
                    fontSize="inherit"
                  />
                }
              />
            </div>
          )}

          <div>
            <button onClick={() => setIsModalOpen(true)}>
              <RateReviewIcon /> Escrever comentário
            </button>
          </div>
          <ModalComment
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            nationalTitle={movie.nationalTitle}
            movie={movie}
          />
        </>
      ) : (
        <Link to={"/auth"} className="BannerRatingCommentMessageWithoutLogin">
          Para comentar ou avaliar por favor faça o login
          <ArrowForwardIcon />
        </Link>
      )}
    </section>
  );
};

export default BannerRatingComment;
