import Genre from "../../../../../../@Types/genre";
import "./styles.scss";

type Props = {
  genre: Genre;
};

const GenreTag = ({ genre }: Props) => {
  return (
    <div className="gt-container">
      <p>{genre.name}</p>
    </div>
  );
};

export default GenreTag;
