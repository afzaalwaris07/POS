import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
//import SideMenuBar from "../../SideMenuBar/SideMenuBar";



const AppLayout = () => {
  return <div style={{padding: '50px 0px 0px 370px'}}>
        {/* <SideMenuBar /> */}
        <Sidebar />
        <Outlet />
    </div>;
  
};

export default AppLayout;