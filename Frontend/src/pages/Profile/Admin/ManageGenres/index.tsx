import AddIcon from "@mui/icons-material/Add";
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { SpinnerDotted } from "spinners-react";
import Genre from "../../../../@Types/genre";
import { getAllGenres } from "../../../../services/api/genre";
import GenreCard from "./GenreCard";
import GenreModal from "./GenreModal";
import "./styles.scss";

const ManageGenres = () => {
  const { data, isLoading } = useQuery(["getAllGenresManager"], getAllGenres);
  const [isGenreModalOpen, setIsGenreModalOpen] = useState<boolean>(false);
  const [genre, setGenre] = useState<Genre>();

  const onEdit = (g: Genre) => {
    setGenre(g);
    setIsGenreModalOpen(true);
  };

  const onCloseModal = () => {
    setGenre(undefined);
    setIsGenreModalOpen(false);
  };

  const onCreate = () => {
    setGenre(undefined);
    setIsGenreModalOpen(true);
  };

  return (
    <div className="manageGenresContainer">
      <div className="manageGenresHeaderContainer">
        <h1>
          <TheaterComedyIcon /> Gerenciar Generos
        </h1>
        <button onClick={onCreate}>
          <AddIcon /> Adicionar
        </button>
      </div>

      {isLoading ? (
        <SpinnerDotted color="red" />
      ) : (
        data?.map((x) => (
          <GenreCard key={x.id} genre={x} onOpenModal={onEdit} />
        ))
      )}

      <GenreModal
        isOpen={isGenreModalOpen}
        onClose={onCloseModal}
        genre={genre}
      />
    </div>
  );
};

export default ManageGenres;
