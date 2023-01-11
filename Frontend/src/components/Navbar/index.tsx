import HomeIcon from "@mui/icons-material/Home";
import MovieIcon from "@mui/icons-material/Movie";
import PersonIcon from "@mui/icons-material/Person";
import "./styles.scss";

const Navbar = () => {
  return (
    <div className="container-navbar">
      <div>
        <h2>E Esse Filme</h2>
        <nav>
          <button>
            <HomeIcon /> <span>Página Inicial</span>
          </button>
          <button>
            <MovieIcon /> <span>Repositório de Filmes</span>
          </button>
          <button>
            <PersonIcon /> <span>Área de Login</span>
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
