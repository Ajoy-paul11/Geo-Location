import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Paper,
  Typography,
  Box,
  Chip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeIcon from "@mui/icons-material/Home";
import BusinessIcon from "@mui/icons-material/Business";
import PeopleIcon from "@mui/icons-material/People";

const getAddressIcon = (type) => {
  switch (type) {
    case "home":
      return <HomeIcon />;
    case "office":
      return <BusinessIcon />;
    case "friends & family":
      return <PeopleIcon />;
    default:
      return <HomeIcon />;
  }
};

const AddressList = ({ addresses, onEdit, onDelete, onSelect }) => {
  return (
    <Paper elevation={3}>
      <Box p={2}>
        <Typography variant="h6" gutterBottom>
          Saved Addresses
        </Typography>
        <List>
          {addresses.map((address) => (
            <ListItem
              key={address._id}
              button
              onClick={() => onSelect(address)}
              sx={{ mb: 1, border: 1, borderColor: "divider", borderRadius: 1 }}
            >
              <Box sx={{ mr: 2 }}>{getAddressIcon(address.type)}</Box>
              <ListItemText
                primary={
                  <Box display="flex" alignItems="center">
                    <Typography variant="subtitle1">{address.type}</Typography>
                    {address.isFavorite && (
                      <FavoriteIcon
                        color="error"
                        sx={{ ml: 1, fontSize: "small" }}
                      />
                    )}
                  </Box>
                }
                secondary={
                  <>
                    <Typography variant="body2" color="text.secondary">
                      {`${address.address.houseNo}, ${address.address.street}`}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {`${address.address.area}, ${address.address.city}`}
                    </Typography>
                  </>
                }
              />

              <IconButton
                edge="end"
                ariaLabel="edit"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(address);
                }}
                sx={{ mr: 1 }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                edge="end"
                ariLabel="delete"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(address._id);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Paper>
  );
};

export default AddressList;
