import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Profile = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const onClick = () => {
    logout();
    navigate("/");
  };

  return (
    <div>
      <h1>Profile</h1>
      <button type="button" onClick={onClick}>
        Sair
      </button>
    </div>
  );
};

export default Profile;
