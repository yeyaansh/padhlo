import { Outlet } from "react-router";

const AdminAuthorizedRoutes = () => {
  return (
    <div className="pt-8">
      {/* <div>AdminAuthorizedRoutes</div> */}
      <Outlet/>
    </div>
  );
};

export default AdminAuthorizedRoutes;
