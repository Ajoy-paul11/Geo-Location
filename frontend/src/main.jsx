import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import LocationSelection from "./pages/LocationSelection.jsx";
import AddressManagement from "./pages/AddressManagement.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LocationSelection />,
  },
  {
    path: "/address-management",
    element: <AddressManagement />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
