import { Outlet } from "react-router";

const ProfilePageLayout = () => {
  return (
    <div>
      <div className="pt-8">
        <Outlet />
      </div>
    </div>
  );
};

export default ProfilePageLayout;
