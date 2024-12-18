import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Box, Typography, Paper, Button } from "@mui/material";
import LocationPermissionModal from "../components/LocationPermission.jsx";
import MapSelector from "../components/MapSelector.jsx";
import AddressForm from "../components/AddressForm.jsx";
import axios from "axios";
import { logout } from "../feature/user/userSlice.js";
import { useDispatch } from "react-redux";
import api from "../utils/axios.js";

const defaultLocation = {
  lat: 40.7128,
  lng: -74.006,
};

const LocationSelection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPermissionModal, setShowPermissionModal] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState(defaultLocation);
  const [showAddressForm, setShowAddressForm] = useState(false);

  const handleLocationEnable = useCallback((locationData) => {
    setSelectedLocation({
      lat: locationData.latitude,
      lng: locationData.longitude,
    });
    setShowPermissionModal(false);
  }, []);

  const handleManualSearch = useCallback(() => {
    setShowPermissionModal(false);
    setSelectedLocation({
      lat: 40.7128,
      lng: -74.006,
    });
  }, []);

  const handleLocationSelect = useCallback((location) => {
    setSelectedLocation(location);
    setShowAddressForm(true);
  }, []);

  const handleAddressSubmit = async (addressData) => {
    try {
      const { type, houseNo, street, area, city } = addressData;
      const payload = {
        type,
        address: {
          houseNo,
          street,
          area,
          city,
          latitude: selectedLocation.lat,
          longitude: selectedLocation.lng,
        },
      };

      const response = await api.post("/addresses/create", payload);

      if (response.data.data) {
        navigate("/address-management");
      }
    } catch (error) {
      console.error("Error saving address:", error);
      alert(error?.response?.data?.message || error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await api
        .post("/users/logout")
        .then((response) => {
          if (response.data) {
            dispatch(logout());
            navigate("/login");
          }
        })
        .catch((error) => {
          alert(error.message);
        });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Container maxWidth="md">
      <Box py={4}>
        <Typography variant="h4" gutterBottom>
          Select Your Location
        </Typography>

        <Button
          variant="contained"
          // startIcon={<MyLocationIcon />}
          sx={{ position: "absolute", top: 26, right: 156 }}
          onClick={() => navigate("/address-management")}
        >
          Addresses
        </Button>

        <Button
          variant="contained"
          // startIcon={<MyLocationIcon />}
          sx={{ position: "absolute", top: 26, right: 16 }}
          onClick={handleLogout}
        >
          Logout
        </Button>

        <LocationPermissionModal
          open={showPermissionModal}
          onEnableLocation={handleLocationEnable}
          onManualSearch={handleManualSearch}
        />

        <Box mb={4}>
          <MapSelector
            initialLocation={selectedLocation}
            onLocationSelect={handleLocationSelect}
          />
        </Box>

        {showAddressForm && (
          <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Enter Address Details
            </Typography>
            <AddressForm onSubmit={handleAddressSubmit} />
          </Paper>
        )}
      </Box>
    </Container>
  );
};

export default LocationSelection;
