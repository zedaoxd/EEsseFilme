import SearchIcon from "@mui/icons-material/Search";
import { useQuery } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import Genre from "../../@Types/genre";
import { getAllGenres } from "../../services/api/genre";
import "./styles.scss";

export type MovieFilterData = {
  originalTitle: string;
  genre: Genre | undefined;
};

type Props = {
  onSubmitFilter: (data: MovieFilterData) => void;
};

const MovieFilter = ({ onSubmitFilter }: Props) => {
  const { register, handleSubmit, control, setValue, getValues } =
    useForm<MovieFilterData>();

  const { data } = useQuery<Genre[]>(["getAllGenres"], getAllGenres);

  const onSubmit = (formData: MovieFilterData) => {
    onSubmitFilter(formData);
  };

  const handleOnChangeGenre = (value: Genre) => {
    setValue("genre", value);
    const obj = {
      originalTitle: getValues("originalTitle"),
      genre: getValues("genre"),
    };
    onSubmitFilter(obj);
  };

  return (
    <div className="fm-container">
      <form onSubmit={handleSubmit(onSubmit)} method="get">
        <input
          {...register("originalTitle")}
          type="text"
          placeholder="Nome do Filme"
          name="originalTitle"
        />
        <button type="submit">
          <SearchIcon className="icon-search-movie" />
        </button>

        <Controller
          name="genre"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={data}
              isClearable
              classNamePrefix="movie-filter-select"
              onChange={(value) => handleOnChangeGenre(value as Genre)}
              getOptionLabel={(g: Genre) => g.name}
              getOptionValue={(g: Genre) => g.id.toString()}
              placeholder="Generos"
            />
          )}
        />
      </form>
    </div>
  );
};

export default MovieFilter;
