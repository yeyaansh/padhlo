import { Outlet } from "react-router";
import Navbar from "../../Navbar";

export default function HomePageLayout() {
  return (
    <>
      {/* <div>HomePageLayout</div> */}
      <div>
        <Navbar />
        <div className="pt-8">
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
}
