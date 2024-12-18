import React from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm.jsx";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../feature/user/userSlice.js";
import api from "../utils/axios.js";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (data) => {
    try {
      const response = await api.post("/users/login", data);
      if (response.data.data) {
        dispatch(login(response.data.data));
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error?.response?.data || error.message);
      alert(error?.response?.data?.message || error.message);
    }
  };

  return <LoginForm onSubmit={handleLogin} />;
};

export default Login;
