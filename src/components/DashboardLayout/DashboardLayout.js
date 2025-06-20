import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar.js";
import Footer from "../Footer/Footer.js";

const DashboardLayout = () => {
  return (
    <>
      <div className="wrapper">
        <Navbar />
        <main role="main" className="main-content">
          <div className="container-fluid">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
};
export default DashboardLayout;
