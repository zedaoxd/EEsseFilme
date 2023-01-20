import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Genre from "../../../../../@Types/genre";
import { deleteGenre } from "../../../../../services/api/genre";
import "./styles.scss";

type Props = {
  onOpenModal: (genre: Genre) => void;
  genre: Genre;
};

const GenreCard = ({ genre, onOpenModal }: Props) => {
  const client = useQueryClient();

  const { mutate } = useMutation(
    async (id: number) => {
      return await deleteGenre(id);
    },
    {
      onSuccess: () => client.invalidateQueries(["getAllGenresManager"]),
      onError: (e: any) => {
        if (e.response.status === 400) {
          toast.error(
            "Para deletar esse gênero antes apague os filmes referentes"
          );
        }
      },
    }
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
