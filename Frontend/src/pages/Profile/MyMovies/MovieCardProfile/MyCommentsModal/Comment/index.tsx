import DeleteIcon from "@mui/icons-material/Delete";
import "./styles.scss";

type Props = {
  description: string;
  onDelete: () => void;
};

const Comment = ({ description, onDelete }: Props) => {
  return (
    <p className="commentModal">
      {description} <DeleteIcon color="primary" onClick={onDelete} />
    </p>
  );
};

export default Comment;
