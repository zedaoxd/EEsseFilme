import LogoutIcon from "@mui/icons-material/Logout";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link, NavLink, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./styles.scss";

const Profile = () => {
  const { logout } = useAuth();

  return (
    <main className="profile-main-contaier">
      <div>
        <div className="profile-container">
          <nav>
            <NavLink to="/profile/movies">
              <MovieFilterIcon /> Meus Filmes Avaliados
            </NavLink>
            <NavLink to="/profile/settings">
              <SettingsIcon /> Alterar Dados Pessoais
            </NavLink>
            <Link to="/" onClick={logout}>
              <LogoutIcon /> Sair
            </Link>
          </nav>
        </div>
        <div className="profile-content">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default Profile;
