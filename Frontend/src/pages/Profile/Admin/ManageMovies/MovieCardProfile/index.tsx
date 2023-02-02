import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Rating } from "@mui/material";
import { Link } from "react-router-dom";
import Movie from "../../../../../@Types/movie";
import GenreTag from "./GenreTag";
import "./styles.scss";

type Props = {
  movie: Movie;
  onDelete: (movieId: number) => void;
};

const MovieCardProfile = ({ movie, onDelete }: Props) => {
  return (
    <div className="mcp-container">
      <div className="mcp-image-container">
        <img src={`data:image;base64, ${movie.imageByte}`} alt="" />
      </div>

      <div className="mcp-content-container">
        <div className="mcp-content-data-container">
          <h2>{movie.nationalTitle}</h2>
          <h2>{movie.originTitle}</h2>
          <p>{new Date(movie.releaseDate).toLocaleDateString()}</p>
          <div>
            <Rating
              name="half-rating-read"
              precision={0.5}
              readOnly
              value={movie.averageRating}
            />
            <div className="mcp-genre-tag-container">
              {movie.genres.map((g) => (
                <GenreTag key={g.id} genre={g} />
              ))}
            </div>
          </div>
        </div>
        <div className="mcp-content-buttons-container">
          <Link to={`/profile/admin/movies/${movie.id}`}>
            <EditIcon />
            Editar
          </Link>
          <button onClick={() => onDelete(movie.id)}>
            <DeleteIcon />
            Deletar
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCardProfile;
