import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles.scss";

const Auth = () => {
  return (
    <main className="auth-container">
      <Outlet />
      <ToastContainer />
    </main>
  );
};

export default Auth;
