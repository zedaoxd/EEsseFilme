import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Genre from "../../../../../@Types/genre";
import "./styles.scss";

const GenreCard = (genre: Genre) => {
  return (
    <div className="genreCardContainer">
      <h2>{genre.name}</h2>
      <div className="genreCardButtonsContainer">
        <button title="Editar">
          <EditIcon />
        </button>
        <button title="Deletar">
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
};

export default GenreCard;
