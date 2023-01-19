import ConstructionIcon from "@mui/icons-material/Construction";
import FaceRetouchingNaturalIcon from "@mui/icons-material/FaceRetouchingNatural";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import LogoutIcon from "@mui/icons-material/Logout";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SettingsIcon from "@mui/icons-material/Settings";
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";
import { Link, NavLink, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./styles.scss";

const Profile = () => {
  const { logout, hasRole } = useAuth();

  return (
    <main className="profile-main-contaier">
      <div>
        <div className="profile-container">
          <nav>
            <div>
              <div className="profileMenuLogoContainer">
                <img src="/images/logo.png" alt="" />
              </div>

              <h3>
                <FaceRetouchingNaturalIcon /> Opções
              </h3>
              <NavLink to="/profile/movies">
                <MovieFilterIcon /> Meus Filmes Avaliados
              </NavLink>
              <NavLink to="/profile/settings">
                <SettingsIcon /> Alterar Dados Pessoais
              </NavLink>
              {hasRole("ROLE_ADMIN") && (
                <div className="gerenciaContainerOptions">
                  <h3>
                    <ConstructionIcon /> Gerenciamento
                  </h3>
                  <NavLink to="/profile/admin/genres">
                    <TheaterComedyIcon /> Gêneros
                  </NavLink>
                  <NavLink to="/profile/admin/movies">
                    <LocalMoviesIcon /> Filmes
                  </NavLink>
                  <NavLink to="/profile/admin/users">
                    <PeopleAltIcon /> Usuários
                  </NavLink>
                </div>
              )}
            </div>

            <div className="buttonLogoutContainer">
              <Link to="/" onClick={logout}>
                <LogoutIcon /> Sair
              </Link>
            </div>
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
