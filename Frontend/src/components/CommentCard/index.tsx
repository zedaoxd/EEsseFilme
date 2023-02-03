import Comment from "../../@Types/comment";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import DeleteIcon from "@mui/icons-material/Delete";
import "./styles.scss";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCommentById } from "../../services/api/comments";

type Props = {
  comment: Comment;
};

const CommentCard = ({ comment }: Props) => {
  const { user } = useAuth();
  const [spoilerClass, setSpoilerClass] = useState("spoiler");
  const client = useQueryClient();

  const { mutate } = useMutation(
    async (commentId: number) => deleteCommentById(commentId),
    {
      onSuccess: () => client.invalidateQueries(["getCommentsByMovieId"]),
    }
  );

  const onClickDelete = () => {
    if (
      confirm(
        `Deseja realmente deletar o comentário?\n"${comment.description}"`
      )
    )
      mutate(comment.id);
  };

  return (
    <div className="commentCardContainer">
      <div className="commentCardContent">
        <h3>
          <PersonOutlineIcon /> {comment.user.firstName}
        </h3>
        <p className={comment.spoiler ? spoilerClass : ""}>
          {comment.description}
        </p>
      </div>
      <div className="commentCardActionsContainer">
        <button
          title="Visualizar comentário"
          hidden={!comment.spoiler || !spoilerClass}
          onClick={() => setSpoilerClass("")}
        >
          <VisibilityIcon />
        </button>
        <button
          title="Esconder comentário"
          hidden={!!spoilerClass}
          onClick={() => setSpoilerClass("spoiler")}
        >
          <VisibilityOffIcon />
        </button>
        <button
          title="Deletar"
          hidden={comment.user.id !== user?.id}
          onClick={onClickDelete}
        >
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
};

export default CommentCard;
