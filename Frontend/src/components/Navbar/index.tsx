import HomeIcon from "@mui/icons-material/Home";
import MovieIcon from "@mui/icons-material/Movie";
import PersonIcon from "@mui/icons-material/Person";
import { Link, NavLink } from "react-router-dom";
import "./styles.scss";

const Navbar = () => {
  return (
    <div className="container-navbar">
      <div>
        <Link to={"/"}>
          <h2>E Esse Filme</h2>
        </Link>
        <nav>
          <NavLink to={"/"}>
            <HomeIcon /> <span>Página Inicial</span>
          </NavLink>

          <NavLink to={"/movie"}>
            <MovieIcon /> <span>Repositório de Filmes</span>
          </NavLink>

          <NavLink to={"/auth"}>
            <PersonIcon /> <span>Área de Login</span>
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
