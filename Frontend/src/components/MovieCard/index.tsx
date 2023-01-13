import { Link } from "react-router-dom";
import "./styles.scss";

type Props = {
  image: number[];
  nationalTitle: string;
  id: number;
};

const MovieCard = ({ image, nationalTitle, id }: Props) => {
  return (
    <Link to={`/movie/${id}`} className="card-movie-container">
      <img
        className="mc-img-container"
        src={`data:image;base64, ${image}`}
        alt={nationalTitle}
      />
      <span>{nationalTitle}</span>
    </Link>
  );
};

export default MovieCard;
