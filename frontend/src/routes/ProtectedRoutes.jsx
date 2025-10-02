import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router";

const ProtectedRoutes = () => {
  const location = useLocation();
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);
  console.log("inside the protected route");

  console.log("isAuthenticated: :", isAuthenticated);

  // if (isLoading && isAuthenticated) {
  //   console.log("loading bro...");
  //   return (
  //     <div>
  //       loading bro.... wait....you are Authenticated don't need to worry...😘
  //     </div>
  //   );
  // }

  if (!isAuthenticated)
    return (
      <Navigate to="/auth/login" state={{ from: location }} replace></Navigate>
    );

  return <Outlet></Outlet>;
};

export default ProtectedRoutes;
