// src/components/LocationPermission/LocationPermissionModal.jsx
import React, { useState } from "react";
import {
  Box,
  Modal,
  Typography,
  Button,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchIcon from "@mui/icons-material/Search";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const LocationPermissionModal = ({
  onEnableLocation,
  onManualSearch,
  open,
}) => {
  const [error, setError] = useState(null);
  const handleEnableLocation = async () => {
    try {
      // First check if geolocation is supported
      if (!navigator.geolocation) {
        setError("Geolocation is not supported by your browser");
      }

      // Request permission with options
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true, // Request high accuracy
          timeout: 5000, // Time to wait for location
          maximumAge: 0, // Don't use cached position
        });
      });

      // Validate coordinates
      const { latitude, longitude } = position.coords;
      if (!latitude || !longitude) {
        setError("Invalid coordinates received");
      }

      // If successful, call the callback with location data
      onEnableLocation({
        latitude,
        longitude,
        accuracy: position.coords.accuracy,
      });
    } catch (error) {
      setError("Error getting location:", error);

      // Handle specific error types
      let errorMessage = "Unable to get your location. ";
      switch (error.code) {
        case error.PERMISSION_DENIED:
          errorMessage +=
            "Please enable location permissions in your browser settings.";
          break;
        case error.POSITION_UNAVAILABLE:
          errorMessage += "Location information is unavailable.";
          break;
        case error.TIMEOUT:
          errorMessage += "Request timed out. Please try again.";
          break;
        default:
          errorMessage += error.message || "Please try again later.";
      }

      setError(errorMessage);

      // Fallback to manual search after error
      setTimeout(() => {
        onManualSearch();
      }, 3000);
    }
  };

  const handleManualSearch = () => {
    // Clear any existing errors
    setError(null);

    // Call the parent component's manual search handler
    onManualSearch();
  };

  return (
    <>
      <Modal open={open}>
        <Box sx={style}>
          <Typography variant="h6" component="h2" mb={2}>
            Enable Location Services
          </Typography>
          <Typography variant="body1" mb={3}>
            Please enable location services to help us serve you better
          </Typography>
          <Stack spacing={2}>
            <Button
              variant="contained"
              startIcon={<LocationOnIcon />}
              onClick={handleEnableLocation}
              fullWidth
            >
              Enable Location
            </Button>
            <Button
              variant="outlined"
              startIcon={<SearchIcon />}
              onClick={handleManualSearch}
              fullWidth
            >
              Search Manually
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setError(null)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};

export default LocationPermissionModal;