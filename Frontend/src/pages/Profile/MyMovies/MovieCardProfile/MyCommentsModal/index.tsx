import CloseIcon from "@mui/icons-material/Close";
import { Rating } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Modal from "react-modal";
import useAuth from "../../../../../hooks/useAuth";
import { getCommentsByUserIdAndMovieId } from "../../../../../services/api/comments";
import Comment from "./Comment";
import "./styles.scss";

type Props = {
  isOpen: boolean;
  rating: number;
  idMovie: number;
  originalTitle?: string;
};

const MyCommentsModal = ({ isOpen, rating, idMovie, originalTitle }: Props) => {
  const { user } = useAuth();

  const { data } = useQuery([`comments, ${idMovie}, ${user?.id}`], () =>
    getCommentsByUserIdAndMovieId(user?.id || 0, idMovie)
  );

  console.log(data);

  return (
    <Modal
      isOpen={isOpen}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button type="button" className="react-modal-close">
        <CloseIcon />
      </button>
      <div className="modalTitleContainer">
        <h1>{originalTitle}</h1>
      </div>

      <div className="modalRatingContainer">
        <label htmlFor="rating">Minha avaliação</label>
        <Rating id="rating" name="half-rating" precision={0.5} value={rating} />
      </div>

      <div className="modalCommentsContainer">
        <h2>Meus Comentários</h2>
        {data &&
          data.map((x) => <Comment description={x.description} key={x.id} />)}
      </div>
    </Modal>
  );
};

export default MyCommentsModal;
