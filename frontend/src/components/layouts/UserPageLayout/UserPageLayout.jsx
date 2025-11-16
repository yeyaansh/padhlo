import { Outlet } from "react-router";
import Navbar from "../../Navbar";

export default function UserPageLayout(){
    return(<>
    <Navbar/>
    <div>UserPageLayout</div>
        <Outlet></Outlet>
    </>)
}