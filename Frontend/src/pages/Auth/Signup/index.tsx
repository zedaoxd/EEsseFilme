import { useNavigate } from "react-router-dom";
import "./styles.scss";

const Signup = () => {
  const navigate = useNavigate();

  return (
    <div className="singin-container">
      <h1>Cadastre-se</h1>
      <form>
        <input type="text" placeholder="Digite seu nome" />
        <input type="text" placeholder="Digite seu sobrenome" />
        <input type="text" placeholder="Digite seu e-mail" />
        <input type="password" placeholder="Digite sua senha" />
        <input type="password" placeholder="Repita sua senha" />
        <button type="submit">Cadastrar</button>
      </form>
      <button type="button" onClick={() => navigate("/auth/login")}>
        Faça seu login agora
      </button>
    </div>
  );
};

export default Signup;
