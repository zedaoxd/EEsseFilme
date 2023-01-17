import { Outlet } from "react-router-dom";
import "./styles.scss";

const Auth = () => {
  return (
    <main className="auth-container">
      <Outlet />
    </main>
  );
};

export default Auth;
