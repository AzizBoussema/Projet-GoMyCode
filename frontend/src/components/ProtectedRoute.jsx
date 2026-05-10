import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, requiredRole, requiredAdmin }) => {
  const { isAuth, user } = useSelector((state) => state.authReducer);

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  if (requiredAdmin && !user.isAdmin) {
    return <Navigate to="/" />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;