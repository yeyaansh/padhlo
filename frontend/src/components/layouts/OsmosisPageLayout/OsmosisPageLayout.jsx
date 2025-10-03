import { Outlet } from "react-router";

export default function OsmosisPageLayout(){
    return(<>
    <div className="pt-8">
    {/* <div>OsmosisPageLayout</div> */}
        <Outlet></Outlet></div>
    </>)
}