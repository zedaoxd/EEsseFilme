import Movie from "../../@Types/movie";
import Slider from "../Slider";
import "./styles.scss";

type Props = {
  title: string;
  movies: Movie[];
};

const MovieSlider = ({ title, movies }: Props) => {
  return (
    <div className="sm-container">
      <div>
        <h1>{title}</h1>
      </div>
      <div className="sm-movie-slider-container">
        {<Slider movies={movies} />}
      </div>
    </div>
  );
};

export default MovieSlider;
