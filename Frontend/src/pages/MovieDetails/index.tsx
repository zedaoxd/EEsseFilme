import { useEffect, useState } from "react";
import ReactPlayer from "react-player/youtube";
import { useParams } from "react-router-dom";
import Movie from "../../@Types/movie";
import MovieTopic from "../../components/MovieTopic";
import { api } from "../../services/api/api";
import "./styles.scss";

const MovieDetails = () => {
  const { id } = useParams();

  const [movie, setMovie] = useState<Movie>();

  useEffect(() => {
    api.get<Movie>(`/movies/${id}`).then((response) => setMovie(response.data));
  }, []);

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
        <div className="md-content-coments">
          <h2>Comentarios:</h2>
          {movie?.comments?.map((x) => (
            <div key={x.id}>
              <h3>{x.user.firstName} </h3>
              <p>{x.description}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default MovieDetails;
