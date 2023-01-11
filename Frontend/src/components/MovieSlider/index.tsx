import Movie from "../../@Types/movie";
import Slider from "../Slider";
import "./styles.scss";

type Props = {
  title: string;
  movies: Movie[];
};

const MovieSlider = ({ title, movies }: Props) => {
  console.log(movies);
  return (
    <div className="sm-container">
      <div>{title}</div>
      <div className="teste">{<Slider movies={movies} />}</div>
    </div>
  );
};

export default MovieSlider;
