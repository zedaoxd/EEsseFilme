import Genre from "../../@Types/genre";
import RatingStar from "../RatingStar";
import "./styles.scss";

type Props = {
  originalTitle: string;
  nationalTitle: string;
  date: string;
  genres: Genre[];
  mainActors: string;
  parentalRating: number;
  averageRating: number;
};

const MovieTopic = ({
  date,
  genres,
  mainActors,
  nationalTitle,
  originalTitle,
  parentalRating,
  averageRating,
}: Props) => {
  return (
    <div className="mt-container">
      <h3 className="mt-topic-title">Titulo original:</h3>
      <p className="mt-topic-content">{originalTitle}</p>

      <h3 className="mt-topic-title">Titulo nacional:</h3>
      <p className="mt-topic-content">{nationalTitle}</p>

      <h3 className="mt-topic-title">Data de lançamento:</h3>
      <p className="mt-topic-content">{new Date(date).toLocaleDateString()}</p>

      <h3 className="mt-topic-title">Gênero(s):</h3>
      <p className="mt-topic-content">
        {genres
          .reduce((acc, g) => {
            return (acc += `${g.name}, `);
          }, "")
          .slice(0, -2)}
      </p>

      <h3 className="mt-topic-title">Principais atores:</h3>
      <p className="mt-topic-content">{mainActors}</p>

      <h3 className="mt-topic-title">
        Classificação indicativa:{" "}
        <span>{parentalRating === 0 ? "Livre" : parentalRating}</span>
      </h3>

      <RatingStar readable={false} initialValue={averageRating} />
    </div>
  );
};

export default MovieTopic;
