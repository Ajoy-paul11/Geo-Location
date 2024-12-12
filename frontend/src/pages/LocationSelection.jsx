import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Box, Typography, Paper } from "@mui/material";
import LocationPermissionModal from "../components/LocationPermission.jsx";
import MapSelector from "../components/MapSelector.jsx";
import AddressForm from "../components/AddressForm.jsx";
import axios from "axios";

const defaultLocation = {
  lat: 40.7128,
  lng: -74.006,
};

const LocationSelection = () => {
  const navigate = useNavigate();
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
      const { type } = addressData;
      const completeAddress = {
        ...addressData,
        latitude: selectedLocation.lat,
        longitude: selectedLocation.lng,
      };

      const postData = {
        type,
        address: completeAddress,
      };

      await axios
        .post("http://localhost:5001/api/v1/addresses/create", postData)
        .then((response) => {
          if (response.data.data) {
            navigate("/address-management");
          }
        })
        .catch((error) => {
          alert(error.message);
        });
    } catch (error) {
      console.error("Error saving address:", error);
    }
  };

  return (
    <Container maxWidth="md">
      <Box py={4}>
        <Typography variant="h4" gutterBottom>
          Select Your Location
        </Typography>

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
