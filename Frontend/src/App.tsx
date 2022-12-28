import { useEffect, useState } from "react";
import "./App.css";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Movie } from "./types/movie";
import { useForm } from "react-hook-form";
import { Genre } from "./types/genre";
import { useAppContext } from "./contexts/hook";

type GenreDTO = {
  id: number;
  name: string;
};

function App() {
  //Uint8Array
  const [image, setImage] = useState<number[]>();

  //const client = useQueryClient();

  const appContext = useAppContext();

  // useEffect(() => {
  //   axios.get("http://localhost:8080/api/movies/1").then((response) => {
  //     setImage(response.data.imageByte);
  //   });
  // }, [image]);

  const query = useQuery<Movie>(
    "teste",
    () => axios.get(`http://localhost:8080/api/movies/2`).then((r) => r.data),
    {
      onSuccess: (movie) => {
        setImage(movie.imageByte);
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );

  // if (query.isLoading) {
  //   return <>Carregando...</>;
  // }

  // const { mutate } = useMutation(
  //   (id: string) => axios.get(`http://localhost:8080/api/movies/${id}`),
  //   {
  //     onSuccess: (response) => {
  //       setImage(response.data.imageByte);
  //       // refazer as querys com os ids passados no parametro
  //       // client.invalidateQueries();
  //     },
  //     onError: () => {},
  //   }
  // );

  // useEffect(() => {
  //   mutate("1");
  // }, [mutate]);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Genre>();

  const [isSuccess, setIsSuccess] = useState(false);
  const [genre, setGenre] = useState<Genre>();

  const onSubmit = (formData: Genre) => {
    console.log(formData);
    axios<AxiosRequestConfig>({
      baseURL: "http://localhost:8080",
      url: "/api/genres",
      data: formData,
      method: "POST",
    }).then((response) => {
      setIsSuccess(true);
      setGenre(response.data as Genre);
    });
    setValue("name", "");
  };

  return (
    <div className="App">
      {image && (
        <img src={`data:image;base64, ${image}`} style={{ width: "400px" }} />
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("name", {
            required: "Campo obrigatório",
          })}
          type="text"
          placeholder="enter genre"
          className="form-control mt-3"
          name="name"
        />
        <div className="invalid-feedback d-block">{errors.name?.message}</div>
        <button className="btn btn-primary">Salvar</button>
      </form>

      {isSuccess ? <div>{genre?.name}</div> : null}
      <button onClick={appContext.toggleTheme}>Teste Toggle</button>
      <button onClick={appContext.setAuthContext}>Teste Login</button>
    </div>
  );
}

export default App;
