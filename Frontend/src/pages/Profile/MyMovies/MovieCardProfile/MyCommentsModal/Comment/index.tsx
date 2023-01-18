import DeleteIcon from "@mui/icons-material/Delete";
import "./styles.scss";

type Props = {
  description: string;
};

const Comment = ({ description }: Props) => {
  return (
    <p className="commentModal">
      {description} <DeleteIcon color="primary" />
    </p>
  );
};

export default Comment;
