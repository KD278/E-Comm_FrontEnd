import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// Private component is used to restrict the particular pages to display using some condition

const PrivateComponent = () => {
  const auth = localStorage.getItem("user");
  return auth ? <Outlet /> : <Navigate to="/signup" />;
};

export default PrivateComponent;
