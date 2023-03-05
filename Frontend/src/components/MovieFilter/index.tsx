import SearchIcon from "@mui/icons-material/Search";
import { useQuery } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import flatpickrLib from "flatpickr";
import Flatpickr from "react-flatpickr";
import { Portuguese } from "flatpickr/dist/l10n/pt";
import Genre from "../../@Types/genre";
import { getAllGenres } from "../../services/api/genre";
import "./styles.scss";
import { useState } from "react";

flatpickrLib.localize(Portuguese);

export type MovieFilterData = {
  originalTitle: string;
  genre: Genre | undefined;
  releaseDate: number;
};

type Props = {
  onSubmitFilter: (data: MovieFilterData) => void;
};

const MovieFilter = ({ onSubmitFilter }: Props) => {
  const { register, handleSubmit, control, setValue, getValues } =
    useForm<MovieFilterData>();
  const [defaultValueDate, setDefaultValueDate] = useState("");
  const { data } = useQuery<Genre[]>(["getAllGenres"], getAllGenres);

  const onSubmit = (formData: MovieFilterData) => {
    onSubmitFilter(formData);
  };

  const handleOnChangeGenre = (g: Genre) => {
    setValue("genre", g);
    onSubmitFilter({
      originalTitle: getValues("originalTitle"),
      genre: getValues("genre"),
      releaseDate: getValues("releaseDate"),
    });
  };

  const handleOnChangeDate = (date: Date) => {
    setValue("releaseDate", date.getTime());
    setDefaultValueDate(date.toISOString());
    onSubmitFilter({
      originalTitle: getValues("originalTitle"),
      genre: getValues("genre"),
      releaseDate: getValues("releaseDate"),
    });
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

        <div className="mf-date">
          <Controller
            name="releaseDate"
            control={control}
            render={({ field }) => (
              <Flatpickr
                {...field}
                options={{
                  mode: "single",
                  dateFormat: "d/m/Y",
                  showMonths: 1,
                  locale: "pt",
                }}
                onChange={(date) => handleOnChangeDate(date[0])}
                value={new Date(defaultValueDate)}
                placeholder="Data de lançamento"
              />
            )}
          />
        </div>

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
