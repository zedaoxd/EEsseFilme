import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import "./styles.scss";

const forbidden = () => {
  const navigate = useNavigate();
  return (
    <main className="forbidden-main-container">
      <div className="forbidden-content">
        <h1>Acesso negado</h1>
        <h3>
          se você acha que isso é um erro entre em contato com o administrador
        </h3>
        <button onClick={() => navigate("/")}>
          <ArrowBackIcon />
          Voltar
        </button>
      </div>
      <div className="forbidden-img-container">
        <img src="/public/images/403forbidden.svg" alt="" />
      </div>
    </main>
  );
};

export default forbidden;
