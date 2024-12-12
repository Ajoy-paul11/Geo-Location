import React from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/Auth/LoginForm";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../feature/user/userSlice.js";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (data) => {
    try {
      await axios
        .post("http://localhost:5001/api/v1/users/login", data)
        .then((response) => {
          if (response.data.data) {
            navigate("/");
            dispatch(login(response.data.data));
          }
        })
        .catch((error) => {
          alert(error.message);
          navigate("/login");
        });
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return <LoginForm onSubmit={handleLogin} />;
};

export default Login;
