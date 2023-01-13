import { useQuery } from "@tanstack/react-query";
import Movie from "../../@Types/movie";
import MovieSlider from "../../components/MovieSlider";
import { getTop10date, getTop10rating } from "../../services/api/movie";
import "./styles.scss";

const Home = () => {
  const { data: moviesTop10 } = useQuery<Movie[]>(
    ["top10rating"],
    getTop10rating
  );
  const { data: lastMovies } = useQuery<Movie[]>(["top10date"], getTop10date);

  return (
    <main className="home-container">
      {moviesTop10 && (
        <MovieSlider movies={moviesTop10} title="top 10 mais avaliados" />
      )}
      {lastMovies && (
        <MovieSlider movies={lastMovies} title="ultimos 10 lançamentos" />
      )}
    </main>
  );
};

export default Home;
