import { useState } from "react";
import Login from "./Login";
import SingIn from "./singIn";
import "./styles.scss";

const Auth = () => {
  const [isShowLogin, setIsShowLogin] = useState(true);

  const toggleLoginLogout = () => {
    setIsShowLogin((prev) => !prev);
  };

  return (
    <main className="auth-container">
      {isShowLogin ? (
        <Login toggleLogin={toggleLoginLogout} />
      ) : (
        <SingIn toggleLogin={toggleLoginLogout} />
      )}
    </main>
  );
};

export default Auth;
