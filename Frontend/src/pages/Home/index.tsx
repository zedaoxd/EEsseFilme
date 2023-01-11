import { useEffect, useState } from "react";
import Movie from "../../@Types/movie";
import MovieSlider from "../../components/MovieSlider";
import { api } from "../../services/api/api";
import "./styles.scss";

const Home = () => {
  const [moviesTop10, setMoviesTop10] = useState<Movie[]>();
  const [lastMovies, setLastMovies] = useState<Movie[]>();

  useEffect(() => {
    api
      .get<Movie[]>("/movies/top10rating")
      .then((response) => setMoviesTop10(response.data));

    api
      .get<Movie[]>("/movies/top10date")
      .then((response) => setLastMovies(response.data));
  }, []);

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
