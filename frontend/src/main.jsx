import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import LocationSelection from "./pages/LocationSelection.jsx";
import AddressManagement from "./pages/AddressManagement.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Protected from "./components/Protected.jsx";
import store from "./app/store.js";
import { Provider } from "react-redux";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <LocationSelection />
      </Protected>
    ),
  },
  {
    path: "/address-management",
    element: (
      <Protected>
        <AddressManagement />
      </Protected>
    ),
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
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
