import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import FilterMovie, { FilterMovieData } from "../../components/FilterMovie";
import MovieCard from "../../components/MovieCard";
import AppPagination from "../../components/Pagination";
import { getMoviesPaged } from "../../services/api/movie";
import "./styles.scss";

type ControlComponentsData = {
  activePage: number;
  filterData: FilterMovieData;
};

const MovieRepository = () => {
  const [controlComponentData, setControlComponentData] =
    useState<ControlComponentsData>({
      activePage: 0,
      filterData: { genre: undefined, originalTitle: "" },
    });

  const { data } = useQuery(
    ["getMoviesPaged", controlComponentData.activePage],
    () =>
      getMoviesPaged({
        params: {
          page: controlComponentData.activePage,
          size: 5,
        },
      })
  );

  const handlePageChange = (pageNumber: number) => {
    setControlComponentData({
      activePage: pageNumber - 1,
      filterData: controlComponentData.filterData,
    });
  };

  const onSubmitFilter = (filter: FilterMovieData) => {
    setControlComponentData({
      activePage: 0,
      filterData: filter,
    });
  };

  return (
    <main className="movie-repository">
      {data && (
        <div>
          <div>
            <FilterMovie onSubmitFilter={onSubmitFilter} />
          </div>
          <div className="mr-grid-container">
            {data?.content.map((x) => (
              <MovieCard
                key={x.id}
                id={x.id}
                image={x.imageByte}
                nationalTitle={x.nationalTitle}
              />
            ))}
          </div>
          <div className="mr-pagination-container">
            {
              <AppPagination
                page={data.number}
                pageCount={data.totalPages}
                onChange={handlePageChange}
              />
            }
          </div>
        </div>
      )}
    </main>
  );
};

export default MovieRepository;
