import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Genre from "../../../../../@Types/genre";
import { deleteGenre } from "../../../../../services/api/genre";
import swal from "sweetalert";
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
      onSuccess: () => {
        client.invalidateQueries(["getAllGenresManager"]);
        swal("Genero deletado com sucesso!", {
          icon: "success",
        });
      },
      onError: (e: any) => {
        if (e.response.status === 400) {
          swal("Para deletar esse gênero antes apague os filmes referentes", {
            icon: "error",
          });
        }
      },
    }
  );

  const confirmDeleteGenre = () => {
    swal({
      title: "Você tem certeza?",
      text: "uma vez deletado não poderá voltar atrás!",
      icon: "warning",
      buttons: ["Cancelar", "Deletar"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        mutate(genre.id);
      } else {
        swal("Delete cancelado!");
      }
    });
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
