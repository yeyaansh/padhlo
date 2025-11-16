import { Outlet } from "react-router";
import Navbar from "../../Navbar";

export default function OsmosisPageLayout(){
    return(<>
    <Navbar/>
    <div className="pt-8">
    {/* <div>OsmosisPageLayout</div> */}
        <Outlet></Outlet></div>
    </>)
}