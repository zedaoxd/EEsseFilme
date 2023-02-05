import Modal from "react-modal";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import CreateIcon from "@mui/icons-material/Create";
import "./styles.scss";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { saveComment } from "../../../../services/api/comments";
import Comment from "../../../../@Types/comment";
import Movie from "../../../../@Types/movie";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  nationalTitle: string;
  movie: Movie;
};

type FormData = {
  description: string;
};

const ModalComment = ({ isOpen, onClose, nationalTitle, movie }: Props) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<FormData>();
  const client = useQueryClient();

  const { mutate } = useMutation(async (c: Comment) => await saveComment(c), {
    onSuccess: () => client.invalidateQueries(["getCommentsByMovieId"]),
  });

  const onSubmit = (formData: FormData) => {
    const comment = { ...formData, movie: { id: movie.id } } as Comment;
    mutate(comment);
    reset();
    onClose();
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
      <div className="ModalCommentContent">
        <h2>{nationalTitle}</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <textarea
            {...register("description", {
              required: "Campo obrigatório",
              minLength: {
                value: 20,
                message: "Sua avaliação deve conter pelo menos 20 caracteres",
              },
            })}
            placeholder="Escreva aqui o que você achou deste filme"
          ></textarea>
          <div className="invalid-feedback">{errors.description?.message}</div>
          <Button variant="outlined" color="primary" type="submit">
            <CreateIcon fontSize="small" /> Comentar
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default ModalComment;
