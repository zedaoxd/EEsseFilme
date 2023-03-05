import { useCallback, useEffect, useState } from "react";
import Movie from "../../@Types/movie";
import Page from "../../@Types/page";
import MovieCard from "../../components/MovieCard";
import FilterMovie, { MovieFilterData } from "../../components/MovieFilter";
import AppPagination from "../../components/Pagination";
import { getMoviesPaged } from "../../services/api/movie";
import "./styles.scss";

type ControlComponentsData = {
  activePage: number;
  filterData: MovieFilterData;
};

const MovieRepository = () => {
  const [page, setPage] = useState<Page<Movie>>();
  const [controlComponentData, setControlComponentData] =
    useState<ControlComponentsData>({
      activePage: 0,
      filterData: { genre: undefined, originalTitle: "", releaseDate: 0 },
    });

  const getMovies = useCallback(() => {
    getMoviesPaged({
      params: {
        page: controlComponentData.activePage,
        size: 10,
        genreId: controlComponentData.filterData.genre?.id,
        originalTitle: controlComponentData.filterData.originalTitle,
        releaseDate: controlComponentData.filterData.releaseDate,
      },
    }).then((r) => setPage(r));
  }, [controlComponentData]);

  useEffect(getMovies, [getMovies]);

  const handlePageChange = (pageNumber: number) => {
    setControlComponentData((prev) => ({
      ...prev,
      activePage: pageNumber - 1,
    }));
  };

  const onSubmitFilter = (filter: MovieFilterData) => {
    setControlComponentData((prev) => ({ ...prev, filterData: filter }));
  };

  return (
    <main className="movie-repository">
      {page && (
        <div>
          <div>
            <FilterMovie onSubmitFilter={onSubmitFilter} />
          </div>
          {page.content.length === 0 ? (
            <div className="mr-no-movie-found">
              <h1>Nenhum filme encontrado :(</h1>
              <img src="/images/sad.png" alt="" />
            </div>
          ) : (
            <div className="mr-grid-container">
              {page.content.map((x) => (
                <MovieCard
                  key={x.id}
                  id={x.id}
                  image={x.imageByte}
                  nationalTitle={x.nationalTitle}
                />
              ))}
            </div>
          )}

          <div className="mr-pagination-container">
            {page.content.length > 0 && (
              <AppPagination
                page={page.number}
                pageCount={page.totalPages}
                onChange={handlePageChange}
              />
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default MovieRepository;
