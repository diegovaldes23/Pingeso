import React from "react";
import { Navigate } from "react-router-dom";


const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role_u");

  // Si no hay token o el rol no está permitido, redirige al componente Error
  if (!token || (allowedRoles && !allowedRoles.includes(role))) {
    return <Navigate to="/error" />;
  }

  return children;
};

export default ProtectedRoute;
