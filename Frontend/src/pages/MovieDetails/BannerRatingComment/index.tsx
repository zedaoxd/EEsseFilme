import Rating from "@mui/material/Rating";
import RateReviewIcon from "@mui/icons-material/RateReview";
import StarIcon from "@mui/icons-material/Star";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import "./styles.scss";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";
import { useState } from "react";
import ModalComment from "./ModalComment";
import Movie from "../../../@Types/movie";

type Props = {
  movie: Movie;
};

const BannerRatingComment = ({ movie }: Props) => {
  const { isAuthenticated } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <section className="BannerRatingCommentContainer">
      {isAuthenticated() ? (
        <>
          <div>
            <span>Avaliar :</span>
            <Rating
              name="half-rating"
              value={0}
              precision={0.5}
              emptyIcon={
                <StarIcon
                  style={{ opacity: 1, color: "gray" }}
                  fontSize="inherit"
                />
              }
            />
          </div>
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
