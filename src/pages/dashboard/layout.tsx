import { useState } from "react";
import { Outlet, Routes, Route } from "react-router-dom";
import Header from "../../components/Header/Header";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import PageNotFound from "../404";
import Users from "./pages/users";
import UserDetails from "./pages/userDetails";

const DashboardLayout = () => {
    const [show, setShow] = useState(false);
    return (
        <div id="dashboard-layout">
            <Header handleClick={() => setShow((prevValue: boolean) => !prevValue)} />
            <NavigationBar show={show} />
            
            <Outlet /> {/**TO render nested routes */}
        </div>
    );
}

const DashboardRoutes = () => (
    <Routes>
        <Route path="/" element={<DashboardLayout />}>
            <Route path="users" element={<Users />} />
            <Route path="users/:userId" element={<UserDetails />} />
            <Route path="*" element={<PageNotFound />} />
        </Route>
    </Routes>
)


export default DashboardRoutes;
