import AddIcon from "@mui/icons-material/Add";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Movie from "../../../../@Types/movie";
import Page from "../../../../@Types/page";
import MovieFilter, {
  MovieFilterData,
} from "../../../../components/MovieFilter";
import AppPagination from "../../../../components/Pagination";
import { deleteById, getMoviesPaged } from "../../../../services/api/movie";
import MovieCardProfile from "./MovieCardProfile";
import swal from "sweetalert";
import "./styles.scss";

type FilterData = {
  page: number;
  filter: MovieFilterData;
};

const ManageMovies = () => {
  const [page, setPage] = useState<Page<Movie>>();
  const [filterData, setFilterData] = useState<FilterData>({
    page: 0,
    filter: { genre: undefined, originalTitle: "", releaseDate: 0 },
  });

  const getMovies = useCallback(() => {
    getMoviesPaged({
      params: {
        page: filterData.page,
        size: 3,
        genreId: filterData.filter.genre?.id,
        originalTitle: filterData.filter.originalTitle,
      },
    }).then((r) => setPage(r));
  }, [filterData]);

  useEffect(getMovies, [getMovies]);

  const { mutate: onDelete } = useMutation(
    (movieId: number) => deleteById(movieId),
    {
      onSuccess: () => {
        getMovies();
        swal("Filme deletado com sucesso!", {
          icon: "success",
        });
      },
    }
  );

  const onSubmitFilter = (data: MovieFilterData) => {
    setFilterData((old) => ({ ...old, filter: data }));
  };

  const handleChangePagination = (pageNumber: number) => {
    setFilterData((old) => ({ ...old, page: pageNumber - 1 }));
  };

  return (
    <main className="mm-container">
      <div className="mm-header-container">
        <h1>Gerenciar Filmes</h1>
        <Link to={"/profile/admin/movies/create"}>
          <AddIcon /> Adicionar
        </Link>
      </div>
      <div className="mm-list-container">
        <MovieFilter onSubmitFilter={onSubmitFilter} />
        {page &&
          page.content?.map((m) => (
            <MovieCardProfile movie={m} onDelete={onDelete} key={m.id} />
          ))}
        <div className="mm-pagination-container">
          {page && (
            <AppPagination
              onChange={handleChangePagination}
              page={page.number}
              pageCount={page.totalPages}
              color="secondary"
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default ManageMovies;
