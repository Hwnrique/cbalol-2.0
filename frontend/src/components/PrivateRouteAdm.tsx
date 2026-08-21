import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PrivateRouteAdm = ({ children }: { children: React.ReactNode }) => {
  const { token, adm } = useAuth();

  if(!token) {
    return <Navigate to={"/login"} />
  }

  if (!adm) {
    return <Navigate to={"/"} />;
  }

  return children;
};

export default PrivateRouteAdm;
