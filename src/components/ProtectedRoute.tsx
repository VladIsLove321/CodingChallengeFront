import { ReactChild } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({
  userName,
  redirectPath = "/login",
  children,
}: {
  userName: string;
  redirectPath?: string;
  children: ReactChild;
}) => {
  if (!userName) {
    return <Navigate to={redirectPath} replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
