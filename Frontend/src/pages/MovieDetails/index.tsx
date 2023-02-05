import { useQuery } from "@tanstack/react-query";
import ReactPlayer from "react-player/youtube";
import { useParams } from "react-router-dom";
import CommentCard from "../../components/CommentCard";
import MovieTopic from "../../components/MovieTopic";
import { getCommentsMovieId } from "../../services/api/comments";
import { getOneMovie } from "../../services/api/movie";
import BannerRatingComment from "./BannerRatingComment";
import "./styles.scss";

const MovieDetails = () => {
  const { id } = useParams();

  const { data: movie } = useQuery(["getOneMovie"], () =>
    getOneMovie(Number(id))
  );

  const { data: comments } = useQuery(["getCommentsByMovieId"], () =>
    getCommentsMovieId(Number(id))
  );

  return (
    <main className="md-main-container">
      <div>
        <div>
          <div className="md-movie-details-container">
            <div className="md-image-container">
              {movie && (
                <img
                  src={`data:image;base64, ${movie.imageByte}`}
                  alt={movie.nationalTitle}
                />
              )}
            </div>
            <div className="md-movies-details">
              {movie && (
                <MovieTopic
                  date={movie.releaseDate}
                  genres={movie.genres}
                  mainActors={movie.mainActors}
                  nationalTitle={movie.nationalTitle}
                  originalTitle={movie.originTitle}
                  parentalRating={movie.parentalRating}
                  averageRating={movie.averageRating}
                />
              )}
            </div>
          </div>
          <div className="md-movie-video-container">
            <ReactPlayer
              url={movie?.movieTrailer}
              width="100%"
              pip={false}
              controls={true}
              light={true}
              style={{ position: "relative", top: "20px" }}
            />
          </div>
        </div>
        <div className="md-synopsis">
          <h2>Sinopse:</h2>
          <p>{movie?.synopsis}</p>
        </div>

        <BannerRatingComment />

        <div className="md-content-coments">
          <h2>Comentarios:</h2>
          {comments?.map((x) => (
            <CommentCard key={x.id} comment={x} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default MovieDetails;
