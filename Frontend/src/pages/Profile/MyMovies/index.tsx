import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Pagination from "../../../components/Pagination";
import useAuth from "../../../hooks/useAuth";
import { getRatingsPagedByUser } from "../../../services/api/ratings";
import MovieCardProfile from "./MovieCardProfile";
import "./styles.scss";

const MyMovies = () => {
  const { user } = useAuth();
  const [pageNumber, setPageNumber] = useState<number>(0);

  const { data, isLoading } = useQuery([`getRatings, ${pageNumber}`], () =>
    getRatingsPagedByUser(user?.id || 0, pageNumber)
  );

  const onChange = (value: number) => {
    setPageNumber(value - 1);
  };

  if (isLoading) {
    return <h1>Carregando...</h1>;
  }

  return (
    <>
      <div className="mymovies-container">
        {data?.content.map((x) => (
          <MovieCardProfile key={x.id} idMovie={x.movie.id} rating={x.rating} />
        ))}
      </div>
      <div className="myMoviesPaginationContainer">
        {data && data.content.length !== 0 ? (
          <Pagination
            onChange={onChange}
            page={pageNumber}
            pageCount={data.totalPages}
          />
        ) : (
          <>
            <div className="noHasMovies">
              <h1>Você ainda não avaliou nenhum filme :(</h1>
              <img src="/images/sad.png" alt="" />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default MyMovies;
