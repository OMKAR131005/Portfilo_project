import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../../utils/api";

const ProtectedRoute = ({ children }) => {
  if (!isLoggedIn()) {
    return <Navigate to="/Login" replace />;
  }
  return children;
};

export default ProtectedRoute;
