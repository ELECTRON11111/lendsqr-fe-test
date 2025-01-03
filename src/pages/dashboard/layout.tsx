import { useState } from "react";
import Header from "../../components/Header/Header";
import NavigationBar from "../../components/NavigationBar/NavigationBar";

const DashboardLayout = () => {
    const [show, setShow] = useState(false);
    return (
        <div id="dashboard-layout">
            <Header handleClick={() => setShow((prevValue: boolean) => !prevValue)} />
            <NavigationBar show={show} />
        </div>
    );
}

export default DashboardLayout;
