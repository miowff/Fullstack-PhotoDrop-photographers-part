import { AUTH_TOKEN_KEY } from "@/enums/authTokenKey";
import { Navigate } from "react-router-dom";

export const PrivateWrapper = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  return token ? children : <Navigate to="/login" replace />;
};
