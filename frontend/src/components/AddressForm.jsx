import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  TextField,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  Stack,
  Paper,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import BusinessIcon from "@mui/icons-material/Business";
import PeopleIcon from "@mui/icons-material/People";

const AddressForm = ({ initialValues, onSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues || {
      houseNo: "",
      street: "",
      area: "",
      city: "",
      type: "Home",
    },
  });

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <Controller
            name="type"
            control={control}
            rules={{ required: "Please select address type" }}
            render={({ field }) => (
              <ToggleButtonGroup
                {...field}
                exclusive
                fullWidth
                onChange={(_, value) => field.onChange(value)}
              >
                <ToggleButton value="home">
                  <HomeIcon sx={{ mr: 1 }} /> Home
                </ToggleButton>
                <ToggleButton value="office">
                  <BusinessIcon sx={{ mr: 1 }} /> Office
                </ToggleButton>
                <ToggleButton value="friend & family">
                  <PeopleIcon sx={{ mr: 1 }} /> Friends & Family
                </ToggleButton>
              </ToggleButtonGroup>
            )}
          />
          {errors.type && (
            <span style={{ color: "red", fontSize: "0.75rem" }}>
              {errors.type.message}
            </span>
          )}

          <Controller
            name="houseNo"
            control={control}
            rules={{ required: "House/Flat No. is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="House/Flat No."
                error={!!errors.houseNo}
                helperText={errors.houseNo?.message}
              />
            )}
          />

          <Controller
            name="street"
            control={control}
            rules={{ required: "Street is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Street"
                error={!!errors.street}
                helperText={errors.street?.message}
              />
            )}
          />

          <Controller
            name="area"
            control={control}
            rules={{ required: "Area is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Area"
                error={!!errors.area}
                helperText={errors.area?.message}
              />
            )}
          />

          <Controller
            name="city"
            control={control}
            rules={{ required: "City is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="City"
                error={!!errors.city}
                helperText={errors.city?.message}
              />
            )}
          />

          <Button color="primary" variant="contained" fullWidth type="submit">
            Save Address
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};

export default AddressForm;
