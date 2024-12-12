import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Protected({ children }) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.currentUser);
  return user ? children : navigate("/login");
}

export default Protected;
