import Comment from "../../@Types/comment";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import DeleteIcon from "@mui/icons-material/Delete";
import "./styles.scss";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";

type Props = {
  comment: Comment;
};

const CommentCard = ({ comment }: Props) => {
  const { user } = useAuth();
  const [spoilerClass, setSpoilerClass] = useState("spoiler");
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
        <button hidden={comment.user.id !== user?.id}>
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
};

export default CommentCard;
