import React, { useEffect, useState } from "react";
import Header from "../../organisms/Header/Header";
import NavigationBar from "../../organisms/NavigationBar/NavigationBar";
import { useIsScreenSmall } from "../../../hooks/useIsScreenSmall";

const Dashboard = ({ children }: { children: React.ReactNode }) => {
    const [showNavbar, setShowNavbar] = useState(true);
    const isMobile = useIsScreenSmall();

    useEffect(() => {
        setShowNavbar(isMobile);
    }, [isMobile]);

    return (
        <>
            <Header handleClick={() => setShowNavbar(!showNavbar)} />
            <NavigationBar show={showNavbar} />
            {children}
        </>
    );
}

export default Dashboard;
