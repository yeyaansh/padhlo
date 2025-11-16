import { Outlet } from "react-router";
import Navbar from "../../Navbar";

export default function ProblemPageLayout() {
  return (
    <><Navbar/>
      <div className="pt-8">
        <Outlet></Outlet>
      </div>
    </>
  );
}
