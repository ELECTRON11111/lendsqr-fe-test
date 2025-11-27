import Header from "../../organisms/Header/Header";
import NavigationBar from "../../organisms/NavigationBar/NavigationBar";

const Dashboard = ({ children, showNavbar }: { children: React.ReactNode, showNavbar: boolean }) => {
    return (
        <div>
            <Header handleClick={() => console.log("something")} />
            <NavigationBar show={showNavbar} />
            {children}
        </div>
    );
}

export default Dashboard;
