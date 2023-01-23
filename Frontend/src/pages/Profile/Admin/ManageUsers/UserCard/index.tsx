import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import User from "../../../../../@Types/user";
import RoleTag from "./RoleTag";
import "./styles.scss";

type Props = {
  user: User;
  onDeleteUser: (userId: number) => void;
};

const UserCard = ({ user, onDeleteUser }: Props) => {
  return (
    <div className="userCardContainer">
      <div className="userCardContentContainer">
        <div>
          <h3>
            {user.firstName} {user.lastName}
          </h3>
          <p>{user.email}</p>
        </div>

        <div className="userCardRoles">
          {user.roles.map((x) => (
            <RoleTag key={x.id} role={x} />
          ))}
        </div>
      </div>

      <div className="userCardButtonsContainer">
        <Link to={`/profile/admin/users/${user.id}`} title="Editar">
          <EditIcon />
        </Link>
        <button title="Deletar" onClick={() => onDeleteUser(user.id)}>
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
};

export default UserCard;
