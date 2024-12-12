import React, { useState, useCallback } from "react";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";
import { Box, Button, Paper, Stack } from "@mui/material";
import MyLocationIcon from "@mui/icons-material/MyLocation";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const MapSelector = ({ initialLocation, onLocationSelect }) => {
  const [markerPosition, setMarkerPosition] = useState(initialLocation);

  const handleMapClick = useCallback(
    (event) => {
      const newPosition = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      setMarkerPosition(newPosition);
      onLocationSelect(newPosition);
    },
    [onLocationSelect]
  );

  const handleLocateMe = useCallback(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const newPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      setMarkerPosition(newPosition);
      onLocationSelect(newPosition);
    });
  }, [onLocationSelect]);

  return (
    <Paper elevation={3}>
      <Box sx={{ position: "relative", width: "100%", height: "400px" }}>
        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={markerPosition}
            zoom={15}
            onClick={handleMapClick}
          >
            {markerPosition && (
              <Marker position={markerPosition} draggable={true} />
            )}
          </GoogleMap>
        </LoadScript>
        <Button
          variant="contained"
          startIcon={<MyLocationIcon />}
          sx={{ position: "absolute", bottom: 16, right: 16 }}
          onClick={handleLocateMe}
        >
          Locate Me
        </Button>
      </Box>
    </Paper>
  );
};

export default MapSelector;
