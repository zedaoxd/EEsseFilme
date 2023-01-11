import "./styles.scss";

type Props = {
  image: number[];
  nationalTitle: string;
};

const MovieCard = ({ image, nationalTitle }: Props) => {
  return (
    <div className="card-movie-container">
      <img src={`data:image;base64, ${image}`} alt={nationalTitle} />
      <span>{nationalTitle}</span>
    </div>
  );
};

export default MovieCard;
