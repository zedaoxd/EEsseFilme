import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { getTokenData } from "../utils/storage";

type Props = {
  role: "ROLE_MEMBER" | "ROLE_ADMIN";
};

const PrivateRoutes = ({ role }: Props) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  return isAuthenticated() &&
    getTokenData().authorities.some((r) => r === role) ? (
    <Outlet />
  ) : isAuthenticated() ? (
    <Navigate to="/unauthorized" replace state={{ from: location }} />
  ) : (
    <Navigate to="/auth" replace state={{ from: location }} />
  );
};

export default PrivateRoutes;
