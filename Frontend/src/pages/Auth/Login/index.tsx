import "./styles.scss";

type Props = {
  toggleLogin: () => void;
};

const Login = ({ toggleLogin }: Props) => {
  return (
    <div className="login-container">
      <h1>Logar</h1>
      <form>
        <input type="text" placeholder="Digite seu e-mail" />
        <input type="password" placeholder="Digite sua senha" />
        <button type="submit">Entrar</button>
      </form>
      <span>Não tem conta? </span>
      <button type="button" onClick={toggleLogin}>
        Cadastre-se
      </button>
    </div>
  );
};

export default Login;
