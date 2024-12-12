import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation, Navigate } from "react-router-dom";

function Protected({ children }) {
  const location = useLocation();

  const currentUser = useSelector((state) => state.user.currentUser);

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default Protected;
