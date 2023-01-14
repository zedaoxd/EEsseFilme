import "./styles.scss";

type Props = {
  toggleLogin: () => void;
};

const SingIn = ({ toggleLogin }: Props) => {
  return (
    <div className="singin-container">
      <h1>Cadastre-se</h1>
      <form>
        <input type="text" placeholder="Digite seu e-mail" />
        <input type="password" placeholder="Digite sua senha" />
        <input type="password" placeholder="Repita sua senha" />
        <button type="submit">Cadastrar</button>
      </form>
      <button type="button" onClick={toggleLogin}>
        Faça seu login agora
      </button>
    </div>
  );
};

export default SingIn;
