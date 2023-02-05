import Rating from "@mui/material/Rating";
import RateReviewIcon from "@mui/icons-material/RateReview";
import StarIcon from "@mui/icons-material/Star";
import "./styles.scss";

const BannerRatingComment = () => {
  return (
    <section className="BannerRatingCommentContainer">
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
        <button>
          <RateReviewIcon /> Escrever comentário
        </button>
      </div>
    </section>
  );
};

export default BannerRatingComment;
