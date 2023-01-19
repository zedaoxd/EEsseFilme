import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

type Props = {
  role: "ROLE_MEMBER" | "ROLE_ADMIN";
};

const PrivateRoutes = ({ role }: Props) => {
  const { isAuthenticated, hasRole } = useAuth();
  const location = useLocation();

  return hasRole(role) ? (
    <Outlet />
  ) : isAuthenticated() ? (
    <Navigate to="/unauthorized" replace state={{ from: location }} />
  ) : (
    <Navigate to="/auth" replace state={{ from: location }} />
  );
};

export default PrivateRoutes;
