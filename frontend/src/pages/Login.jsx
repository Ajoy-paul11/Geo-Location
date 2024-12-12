import React from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/Auth/LoginForm";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    try {
      await axios
        .post("http://localhost:5001/api/v1/users/login", data)
        .then((response) => {
          if (response.data.data) {
            navigate("/");
          }
        })
        .catch((error) => {
          alert(error.message);
        });
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return <LoginForm onSubmit={handleLogin} />;
};

export default Login;
