import React from "react";
import { Outlet } from "react-router";

const AdminAuthLayout = () => {
    console.log("AdminAuthLayout");
    
  return (
    <div>
      {/* <div>AdminAuthLayout</div> */}
      <Outlet/>
    </div>
  );
};

export default AdminAuthLayout;
