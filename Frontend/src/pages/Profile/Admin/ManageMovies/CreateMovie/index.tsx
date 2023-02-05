import { useMutation, useQuery } from "@tanstack/react-query";
import flatpickrLib from "flatpickr";
import { Portuguese } from "flatpickr/dist/l10n/pt";
import "flatpickr/dist/themes/material_red.css";
import Flatpickr from "react-flatpickr";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import Genre from "../../../../../@Types/genre";
import { getAllGenres } from "../../../../../services/api/genre";
import Upload from "./Upload";
import "./styles.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Movie from "../../../../../@Types/movie";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import {
  getOneMovie,
  saveMovie,
  updateMovie,
} from "../../../../../services/api/movie";

flatpickrLib.localize(Portuguese);

type FormData = {
  originTitle: string;
  nationalTitle: string;
  releaseDate: string;
  synopsis: string;
  parentalRating: number;
  mainActors: string;
  movieTrailer: string;
  genres: Genre[];
  image: string;
};

const CreateMovie = () => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormData>();
  const [uploadedImageUrl, setUploadedImageUrl] = useState<File>();
  const { id } = useParams();
  const isCreate = id === "create";
  const { data: genres } = useQuery(["getAllGenres"], getAllGenres);
  const [defaultValueDate, setDefaultValueDate] = useState("");
  const [imageByte, setImageByte] = useState<number[]>();

  useEffect(() => {
    if (!isCreate)
      getOneMovie(Number(id)).then((response) => {
        setValue("genres", response.genres);
        setValue("image", response.image);
        setValue("mainActors", response.mainActors);
        setValue("movieTrailer", response.movieTrailer);
        setValue("nationalTitle", response.nationalTitle);
        setValue("originTitle", response.originTitle);
        setValue("parentalRating", response.parentalRating);
        setValue("releaseDate", response.releaseDate);
        setDefaultValueDate(response.releaseDate);
        setValue("synopsis", response.synopsis);
        setImageByte(response.imageByte);
      });
  }, [isCreate, id]);

  const { mutate } = useMutation(async (m: Movie) =>
    isCreate ? saveMovie(m) : updateMovie(m)
  );

  const onSubmitForm = (data: FormData) => {
    mutate(data as Movie);
  };

  const onUploadSuccess = (imgName: string) => {
    setValue("image", imgName);
  };

  const onSelectImage = (image: File) => {
    setUploadedImageUrl(image);
  };

  return (
    <main className="manageMoviesContainer">
      <h1>
        <LocalMoviesIcon fontSize="inherit" />{" "}
        {isCreate ? "Cadastrar Filme" : "Editar Filme"}
      </h1>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <div className="halfForm">
          <input
            {...register("nationalTitle", {
              required: true,
            })}
            name="nationalTitle"
            type="text"
            placeholder="Título nacional"
          />
          {errors.nationalTitle && (
            <div className="invalid-feedback">Campo obrigatório</div>
          )}

          <input
            {...register("originTitle", {
              required: true,
            })}
            name="originTitle"
            type="text"
            placeholder="Título original"
          />
          {errors.originTitle && (
            <div className="invalid-feedback">Campo obrigatório</div>
          )}

          <Controller
            name="genres"
            rules={{ required: true }}
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={genres}
                isMulti
                classNamePrefix="manageMoviesSelect"
                getOptionLabel={(g: Genre) => g.name}
                getOptionValue={(g: Genre) => g.id.toString()}
                placeholder="Selecione os generos"
              />
            )}
          />
          {errors.genres && (
            <div className="invalid-feedback">Campo obrigatório</div>
          )}

          <div className="manageMoviesDateAndParentalRatingContainer">
            <Controller
              name="releaseDate"
              rules={{ required: true }}
              control={control}
              render={({ field }) => (
                <Flatpickr
                  {...field}
                  options={{
                    mode: "single",
                    dateFormat: "d/m/Y",
                    showMonths: 1,
                  }}
                  className="manageMoviesInputDate"
                  onChange={(date) => {
                    setValue("releaseDate", date[0].toISOString());
                    setDefaultValueDate(date[0].toISOString());
                  }}
                  value={new Date(defaultValueDate)}
                  placeholder="Data de lançamento"
                />
              )}
            />
            {errors.releaseDate && (
              <div className="invalid-feedback">Campo obrigatório</div>
            )}

            <input
              {...register("parentalRating", {
                required: true,
              })}
              name="parentalRating"
              type="number"
              placeholder="Classificação indicativa"
            />
            {errors.parentalRating && (
              <div className="invalid-feedback">Campo obrigatório</div>
            )}
          </div>

          <input
            {...register("mainActors", {
              required: true,
            })}
            name="mainActors"
            type="text"
            placeholder="Atores"
          />
          {errors.mainActors && (
            <div className="invalid-feedback">Campo obrigatório</div>
          )}

          <input
            {...register("movieTrailer", {
              required: true,
            })}
            name="movieTrailer"
            type="text"
            placeholder="URL do trailer"
          />
          {errors.movieTrailer && (
            <div className="invalid-feedback">Campo obrigatório</div>
          )}
        </div>

        <div>
          <textarea
            {...register("synopsis", {
              required: true,
            })}
            name="synopsis"
            placeholder="Sinopse"
          ></textarea>
          {errors.synopsis && (
            <p className="invalid-feedback">Campo obrigatório</p>
          )}

          <Upload
            onUploadSuccess={onUploadSuccess}
            onSelectImage={onSelectImage}
          />
          <img
            src={
              uploadedImageUrl
                ? URL.createObjectURL(uploadedImageUrl)
                : !isCreate
                ? `data:image;base64, ${imageByte}`
                : "/images/no-image-select.jpg"
            }
            alt="image"
            height={200}
            width={150}
          />

          <button type="submit">Salvar</button>
        </div>
      </form>
    </main>
  );
};

export default CreateMovie;
