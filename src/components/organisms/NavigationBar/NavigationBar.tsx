import "./_navigationBar.scss";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import logo from "../../../assets/images/login/lendsqr-logo.svg";
import briefcase from "../../../assets/images/sidebar/briefcase.png";
import dropdown from "../../../assets/images/sidebar/dropdown.png";
import home from "../../../assets/images/sidebar/home.png";
import userFriends from "../../../assets/images/sidebar/user-friends.png";
import usersImg from "../../../assets/images/sidebar/users.png";
import sack from "../../../assets/images/sidebar/sack.png";
import handshake from "../../../assets/images/sidebar/handshake.png";
import piggyBank from "../../../assets/images/sidebar/piggy-bank.png";
import sack1 from "../../../assets/images/sidebar/sack1.png";
import userTimes from "../../../assets/images/sidebar/user-times.png";
import savingsProduct from "../../../assets/images/sidebar/savings-product.png";
import coinsSolid from "../../../assets/images/sidebar/coins-solid.png";
import transactions from "../../../assets/images/sidebar/transactions.png";
import services from "../../../assets/images/sidebar/services.png";
import serviceAccount from "../../../assets/images/sidebar/service-account.png";
import settlement from "../../../assets/images/sidebar/settlement.png";
import chartBar from "../../../assets/images/sidebar/chart-bar.png";
import sliders from "../../../assets/images/sidebar/sliders.png";
import feesAndPricing from "../../../assets/images/sidebar/fees-and-pricing.png";
import audit from "../../../assets/images/sidebar/audit.png";
import systemMessages from "../../../assets/images/sidebar/system-messages.png";
import signOut from "../../../assets/images/sidebar/sign-out.png";

export default function NavigationBar({ show }: { show: boolean }) {
   const navigate = useNavigate();
   const location = useLocation();
   const pathname = location.pathname;

   const handleLogOut = () => {
        navigate('/');
        sessionStorage.removeItem('auth');
    } 

   return (
        <aside data-testid="nav-container" className={`${show ? 'show' : ''} sidebar`}>
            
            <div className="sidebar-logo-container">
                <img src={logo} alt="lendsqr-logo"/>
            </div>
            
            <ul>
                <li>
                    <img src={briefcase} alt='briefcase icon'/>
                    <p>Switch Organization</p>
                    <img src={dropdown} alt='dropdown icon'/>
                </li>

    
                <li>
                    <img src={home} alt='home icon'/>
                    <p>Dashboard</p>
                </li>

                <p className="title">Customers</p>
                
                <Link
                 style={{
                    textDecoration: 'none'
                 }}
                 to="/dashboard/users"
                 className={pathname.includes('dashboard/users') ? "active" : ""}
                >
                    <li>
                        <img src={userFriends} alt='user icon'/>
                        <p>Users</p>
                    </li>
                </Link>

                <li>
                    <img src={usersImg} alt='users icon'/>
                    <p>Guarantors</p>
                </li>

                <li>
                    <img src={sack} alt='sack icon'/>
                    <p>Loans</p>
                </li>

                <li>
                    <img src={handshake} alt='handshake icon'/>
                    <p>Decision Models</p>
                </li>

                <li>
                    <img src={piggyBank} alt='piggybank icon'/>
                    <p>Savings</p>
                </li>

                <li>
                    <img src={sack1} alt='sack icon'/>
                    <p>Loan Requests</p>
                </li>

                <li>
                    <img src={userTimes} alt='user icon'/>
                    <p>Whitelist</p>
                </li>

                <li>
                    <img src={userTimes} alt='user icon'/>
                    <p>Karma</p>
                </li>

                <p className="title">Businesses</p>

                <li>
                    <img src={briefcase} alt='briefcase icon'/>
                    <p>Organization</p>
                </li>

                <li>
                    <img src={sack1} alt='loan icon'/>
                    <p>Loan Products</p>
                </li>

                <li>
                    <img src={savingsProduct} alt='savings icon'/>
                    <p>Savings Products</p>
                </li>

                <li>
                    <img src={coinsSolid} alt='fees icon '/>
                    <p>Fees and Charges</p>
                </li>

                <li>
                    <img src={transactions} alt='transaction icon'/>
                    <p>Transactions</p>
                </li>

                <li>
                    <img src={services} alt='service icon'/>
                    <p>Services</p>
                </li>

                <li>
                    <img src={serviceAccount} alt='service-account icon'/>
                    <p>Service Account</p>
                </li>

                <li>
                    <img src={settlement} alt='settlement icon'/>
                    <p>Settlements</p>
                </li>

                <li>
                    <img src={chartBar} alt='reports icon'/>
                    <p>Reports</p>
                </li>

                <p className="title">Settings</p>

                <li>
                    <img src={sliders} alt='preferences icon'/>
                    <p>Preferences</p>
                </li>

                <li>
                    <img src={feesAndPricing} alt='fees icon'/>
                    <p>Fees and Pricing</p>
                </li>

                <li>
                    <img src={audit} alt='audit icon'/>
                    <p>Audit Logs</p>
                </li>

                <li>
                    <img src={systemMessages} alt='system icon'/>
                    <p>System Messages</p>
                </li>

                <footer>
                    <li data-testid="logout" onClick={handleLogOut}>
                        <img src={signOut} alt='signout icon'/>
                        <p>Log Out</p>
                    </li>
                    <span>v1.2.0</span>
                </footer>
            </ul>
        </aside>
   )
}