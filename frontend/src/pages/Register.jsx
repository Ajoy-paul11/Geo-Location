// src/pages/Auth/Register.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../../components/Auth/RegisterForm";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = async (data) => {
    try {
      await axios
        .post("http://localhost:5001/api/v1/users/register", data)
        .then((response) => {
          if (response.data.data) {
            navigate("/");
          }
        })
        .catch((error) => {
          alert(error.message);
        });
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return <RegisterForm onSubmit={handleRegister} />;
};

export default Register;
