// src/components/Auth/RegisterForm.jsx
import React from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Container,
  Link,
} from "@mui/material";

const RegisterForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmitForm = async (data) => {
    try {
      await onSubmit(data);
    } catch (error) {
      if (error.response?.data?.field) {
        setError(error.response.data.field, {
          type: "manual",
          message: error.response.data.message,
        });
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" component="h1" gutterBottom textAlign="center">
          Create Account
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmitForm)} noValidate>
          <TextField
            margin="normal"
            fullWidth
            label="Username"
            autoComplete="username"
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 3,
                message: "Username must be at least 3 characters",
              },
            })}
            error={!!errors.username}
            helperText={errors.username?.message}
          />

          <TextField
            margin="normal"
            fullWidth
            label="Email Address"
            autoComplete="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            margin="normal"
            fullWidth
            label="Password"
            type="password"
            autoComplete="new-password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>

          <Box textAlign="center">
            <Link href="/login" variant="body2">
              Already have an account? Sign in
            </Link>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default RegisterForm;
