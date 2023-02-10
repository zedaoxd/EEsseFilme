import CloseIcon from "@mui/icons-material/Close";
import { Rating } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Modal from "react-modal";
import { toast } from "react-toastify";
import useAuth from "../../../../../hooks/useAuth";
import {
  deleteCommentById,
  getCommentsByUserIdAndMovieId,
} from "../../../../../services/api/comments";
import { updateRating } from "../../../../../services/api/ratings";
import Comment from "./Comment";
import "./styles.scss";

type Props = {
  isOpen: boolean;
  rating: number;
  idRating: number;
  idMovie: number;
  originalTitle?: string;
  onClose: () => void;
};

const MyCommentsModal = ({
  isOpen,
  rating,
  idRating,
  idMovie,
  originalTitle,
  onClose,
}: Props) => {
  const { user } = useAuth();

  const client = useQueryClient();

  const { data } = useQuery(["comments", idMovie, user?.id], () =>
    getCommentsByUserIdAndMovieId(user?.id || 0, idMovie)
  );

  const { mutate } = useMutation(
    async (newValue: number) =>
      updateRating(newValue, idMovie, idRating).then(() =>
        toast.success("Avaliação atualizada com sucesso!")
      ),
    {
      onSuccess: () => client.invalidateQueries(),
    }
  );

  const { mutate: mutateDelete } = useMutation(
    async (id: number) => {
      await deleteCommentById(id);
      toast.success("Comentário deletado com sucesso!");
    },
    {
      onSuccess: () =>
        client.invalidateQueries(["comments", idMovie, user?.id]),
    }
  );

  const onChange = (event: React.SyntheticEvent, value: number | null) => {
    mutate(value || 0);
  };

  return (
    <Modal
      isOpen={isOpen}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
      onRequestClose={onClose}
    >
      <button type="button" className="react-modal-close" onClick={onClose}>
        <CloseIcon />
      </button>
      <div className="modalTitleContainer">
        <h1>{originalTitle}</h1>
      </div>

      <div className="modalRatingContainer">
        <label htmlFor="rating">Minha avaliação</label>
        <Rating
          id="rating"
          name="half-rating"
          precision={0.5}
          value={rating}
          onChange={onChange}
        />
      </div>

      <div className="modalCommentsContainer">
        <h2>Meus Comentários</h2>
        {data &&
          data.map((x) => (
            <Comment
              description={x.description}
              onDelete={() => mutateDelete(x.id)}
              key={x.id}
            />
          ))}
      </div>
    </Modal>
  );
};

export default MyCommentsModal;
