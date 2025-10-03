import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router";
import Navbar from "../components/Navbar";

const ProtectedRoutes = () => {
  const location = useLocation();
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);

  console.log("inside the protected route");
  console.log("isAuthenticated: :", isAuthenticated);

  useEffect(()=>{
      if (!isAuthenticated)
         <Navigate to="/auth/login" state={{ from: location }} replace></Navigate>
    
  },[])



  return (
    <>
      <Navbar />
      <Outlet></Outlet>
    </>
  );
};

export default ProtectedRoutes;
