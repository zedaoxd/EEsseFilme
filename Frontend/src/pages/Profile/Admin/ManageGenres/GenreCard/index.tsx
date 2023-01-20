import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Genre from "../../../../../@Types/genre";
import useAuth from "../../../../../hooks/useAuth";
import { deleteGenre } from "../../../../../services/api/genre";
import "./styles.scss";

type Props = {
  onOpenModal: (genre: Genre) => void;
  genre: Genre;
};

const GenreCard = ({ genre, onOpenModal }: Props) => {
  const { getLoginResponse } = useAuth();
  const client = useQueryClient();

  const { mutate } = useMutation(
    async (id: number) => {
      return await deleteGenre(id, getLoginResponse()?.access_token || "");
    },
    { onSuccess: () => client.invalidateQueries(["getAllGenresManager"]) }
  );

  const confirmDeleteGenre = () => {
    if (confirm(`Deseja realmente deletar o gênero: ${genre.name}`))
      mutate(genre.id);
  };

  return (
    <div className="genreCardContainer">
      <h2>{genre.name}</h2>
      <div className="genreCardButtonsContainer">
        <button title="Editar" onClick={() => onOpenModal(genre)}>
          <EditIcon />
        </button>
        <button title="Deletar" onClick={confirmDeleteGenre}>
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
};

export default GenreCard;
