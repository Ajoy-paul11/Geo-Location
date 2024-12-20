import React from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/RegisterForm.jsx";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../feature/user/userSlice.js";
import api from "../utils/axios.js";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = async (data) => {
    try {
      await api
        .post("/users/register", data)
        .then((response) => {
          if (response.data.data) {
            dispatch(login(response.data.data));
            navigate("/");
            dispatch(login(response.data.data));
          }
        })
        .catch((error) => {
          alert(error.message);
          navigate("/register");
        });
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return <RegisterForm onSubmit={handleRegister} />;
};

export default Register;
