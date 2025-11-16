import { Outlet } from "react-router";
import Navbar from "../../Navbar";

const ProfilePageLayout = () => {
  return (
    <div>
      <Navbar/>
      <div className="pt-8">
        <Outlet />
      </div>
    </div>
  );
};

export default ProfilePageLayout;
