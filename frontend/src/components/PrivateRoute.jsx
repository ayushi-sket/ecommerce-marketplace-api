import { Navigate } from "react-router-dom";

function PrivateRoute({ children, allowedRoles = [] }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // User not logged in
  if (!token || !user) {
    return <Navigate to="/login" />;
  }

  // Check role
  if (
    allowedRoles.length > 0 &&
    !allowedRoles.includes(user.role)
  ) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default PrivateRoute;
