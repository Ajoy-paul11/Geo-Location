import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import LocationSelection from "./pages/LocationSelection.jsx";
import AddressManagement from "./pages/AddressManagement.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LocationSelection />,
  },
  {
    path: "/address-management",
    element: <AddressManagement />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
