import Comment from "../../@Types/comment";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import DeleteIcon from "@mui/icons-material/Delete";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteCommentById,
  updateCommentService,
} from "../../services/api/comments";
import Switch from "@mui/material/Switch";

import "./styles.scss";
import swal from "sweetalert";

type Props = {
  comment: Comment;
};

const CommentCard = ({ comment }: Props) => {
  const { user, hasRole } = useAuth();
  const [spoilerClass, setSpoilerClass] = useState("spoiler");
  const client = useQueryClient();

  const { mutate: deleteComment } = useMutation(
    async (commentId: number) => deleteCommentById(commentId),
    {
      onSuccess: () => {
        client.invalidateQueries(["getCommentsByMovieId"]);
        swal("Seu comentário foi deletado!", {
          icon: "success",
        });
      },
    }
  );

  const { mutate: updateComment } = useMutation(
    async (comment: Comment) => updateCommentService(comment.id, comment),
    {
      onSuccess: () => client.invalidateQueries(["getCommentsByMovieId"]),
    }
  );

  const onHandleChangeSpoiler = () => {
    updateComment({ ...comment, spoiler: !comment.spoiler });
  };

  const onClickDelete = () => {
    swal({
      title: "Deseja realmente deletar o comentário?",
      text: `${comment.description}`,
      icon: "warning",
      buttons: ["Cancelar", "Deletar"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteComment(comment.id);
      }
    });
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
        <div>
          <div hidden={!hasRole("ROLE_ADMIN")}>
            <Switch
              onChange={onHandleChangeSpoiler}
              checked={comment.spoiler}
              title="Spoiler?"
              color="primary"
              size="small"
            />
          </div>

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
            hidden={comment.user.id !== user?.id && !hasRole("ROLE_ADMIN")}
            onClick={onClickDelete}
          >
            <DeleteIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
