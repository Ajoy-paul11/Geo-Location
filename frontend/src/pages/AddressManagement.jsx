import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  Button,
  Dialog,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddressList from "../components/AddressList.jsx";
import AddressForm from "../components/AddressForm.jsx";
import MapSelector from "../components/MapSelector.jsx";
import axios from "axios";
import api from "../utils/axios.js";

const AddressManagement = () => {
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingAddress, setEditingAddress] = useState(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await api.get("/addresses");

        if (response.data?.data) {
          setAddresses(response.data?.data?.addresses);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching addresses:", error);
        setLoading(false);
      }
    };

    fetchAddresses();
  }, []);

  const handleAddNew = () => {
    navigate("/");
  };

  const handleEdit = useCallback((address) => {
    setEditingAddress(address);
    setSelectedLocation({
      lat: address.address.latitude,
      lng: address.address.longitude,
    });
    setShowEditDialog(true);
  }, []);

  const handleDelete = async (addressId) => {
    try {
      const response = await api.delete(`addresses/delete/${addressId}`);
      if (response) {
        setAddresses(addresses.filter((addr) => addr._id !== addressId));
      }
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  const handleUpdateAddress = async (updatedData) => {
    try {
      const { type } = updatedData;
      const completeAddress = {
        ...updatedData,
        latitude: selectedLocation.lat,
        longitude: selectedLocation.lng,
      };
      const putData = {
        type,
        address: completeAddress,
      };

      const response = await api.put(
        `addresses/update/${editingAddress._id}`,
        putData
      );

      if (response.data.data) {
        setEditingAddress(null);
        setShowEditDialog(false);

        setAddresses(
          addresses.map((addr) =>
            addr._id === editingAddress._id
              ? response.data.data.address // Use the response data directly
              : addr
          )
        );
      }

      setShowEditDialog(false);
      setEditingAddress(null);
    } catch (error) {
      console.error("Error updating address:", error);
      alert(error?.response?.data?.message || "Error updating address");
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md">
      <Box py={4}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={4}
        >
          <Typography variant="h4">Manage Addresses</Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAddNew}
          >
            Add New Address
          </Button>
        </Box>

        <AddressList
          addresses={addresses}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onSelect={() => {}}
        />

        <Dialog
          open={showEditDialog}
          onClose={() => setShowEditDialog(false)}
          maxWidth="md"
          fullWidth
        >
          <Box p={3}>
            <Typography variant="h6" gutterBottom>
              Edit Address
            </Typography>

            <Box mb={3}>
              <MapSelector
                initialLocation={selectedLocation}
                onLocationSelect={setSelectedLocation}
              />
            </Box>

            <AddressForm
              initialValues={{
                type: editingAddress?.type,
                houseNo: editingAddress?.address?.houseNo,
                street: editingAddress?.address?.street,
                area: editingAddress?.address?.area,
                city: editingAddress?.address?.city,
              }}
              onSubmit={handleUpdateAddress}
            />
          </Box>
        </Dialog>
      </Box>
    </Container>
  );
};

export default AddressManagement;
