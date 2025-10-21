import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import Navbar from "../components/Navbar";

const ProtectedRoutes = () => {
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);

  console.log("inside the protected route");
  console.log("isAuthenticated:", isAuthenticated, "isLoading:", isLoading);

  // Show loading or nothing while checking auth
  if (isLoading) {
    return <div>Loading...</div>; // Or your loading component
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  // Render protected content if authenticated
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default ProtectedRoutes;
