import { Outlet } from "react-router";
import Navbar from "../../Navbar";

export default function ProblemQuestionPageLayout(){
    return(<>
    {/* <Navbar/> */}
    <div>ProblemQuestionPageLayout</div>
        <Outlet></Outlet>
    </>)
}