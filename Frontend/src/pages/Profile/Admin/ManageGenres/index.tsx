import AddIcon from "@mui/icons-material/Add";
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";
import { useQuery } from "@tanstack/react-query";
import { getAllGenres } from "../../../../services/api/genre";

import GenreCard from "./GenreCard";
import "./styles.scss";

const ManageGenres = () => {
  const { data } = useQuery(["getAllGenresManager"], getAllGenres);

  return (
    <div className="manageGenresContainer">
      <div className="manageGenresHeaderContainer">
        <h1>
          <TheaterComedyIcon /> Gerenciar Generos
        </h1>
        <button>
          <AddIcon /> Adicionar
        </button>
      </div>

      {data &&
        data.map((x) => <GenreCard id={x.id} name={x.name} key={x.id} />)}
    </div>
  );
};

export default ManageGenres;
