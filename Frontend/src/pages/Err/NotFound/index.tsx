import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./styles.scss";

const NotFound = () => {
  const [redirectIn, setRedirectIn] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    if (redirectIn <= 0) {
      navigate("/");
    } else {
      setTimeout(() => {
        setRedirectIn((prev) => prev - 1);
      }, 1000);
    }
  }, [redirectIn]);

  return (
    <div className="notfoundContainer">
      <div className="notfoundImagecontainer">
        <img src="./images/404notfound.svg" alt="" />
      </div>
      <div className="notfoundContentContainer">
        <h1>
          A página que você esta procurando não existe ou está em manutenção...
        </h1>
        <p>
          Você será redirecionado em <span>{redirectIn} </span>segundos
        </p>
      </div>
    </div>
  );
};

export default NotFound;
