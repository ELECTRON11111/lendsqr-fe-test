import logo from "../../assets/images/login/lendsqr-logo.svg";
import briefcase from '../../assets/images/sidebar/briefcase.png'
import dropdown from '../../assets/images/sidebar/dropdown.png'
import home from '../../assets/images/sidebar/home.png'
import userFriends from '../../assets/images/sidebar/user-friends.png'
import users from '../../assets/images/sidebar/users.png'
import sack from '../../assets/images/sidebar/sack.png'
import handShake from '../../assets/images/sidebar/handshake.png'
import piggyBank from '../../assets/images/sidebar/piggy-bank.png'
import sack1 from '../../assets/images/sidebar/sack1.png'
import userCheck from '../../assets/images/sidebar/user-check.png'
import userTimes from '../../assets/images/sidebar/user-times.png'
import savingsProduct from '../../assets/images/sidebar/savings-product.png'
import coinSolid from '../../assets/images/sidebar/coins-solid.png'
import transaction from '../../assets/images/sidebar/transactions.png'
import service from '../../assets/images/sidebar/services.png'
import serviceAccount from '../../assets/images/sidebar/service-account.png'
import settlement from '../../assets/images/sidebar/settlement.png'
import chartBar from '../../assets/images/sidebar/chart-bar.png'
import slider from '../../assets/images/sidebar/sliders.png'
import fees from '../../assets/images/sidebar/fees-and-pricing.png'
import audit from '../../assets/images/sidebar/audit.png'
import systemMessages from '../../assets/images/sidebar/system-messages.png'
import signOut from '../../assets/images/sidebar/sign-out.png'
import { NavLink, useNavigate } from "react-router-dom"


export default function NavigationBar({ show }: { show: boolean }) {
   
   const navigate = useNavigate()

   const handleLogOut = () => {
       navigate('/')
       sessionStorage.removeItem('auth')
   }

   return (
        <aside className={`${show ? 'show' : ''} sidebar`}>
            
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
                <img src={home} alt='briefcase icon'/>
                <p>Dashboard</p>
                </li>

                <p className="title">Customers</p>
                
                <NavLink
                 style={{
                    textDecoration: 'none'
                 }}
                 to="/dashboard/users"
                 className={({ isActive }) =>
                 isActive ? "active" : ""}>
                <li>
                <img src={userFriends} alt='user icon'/>
                <p>Users</p>
                </li>
                </NavLink>

                <li>
                <img src={users} alt='users icon'/>
                <p>Guarantors</p>
                </li>

                <li>
                <img src={sack} alt='sack icon'/>
                <p>Loans</p>
                </li>

                <li>
                <img src={handShake} alt='handshake icon'/>
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
                <img src={userCheck} alt='user icon'/>
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
                <img src={coinSolid} alt='fees icon '/>
                <p>Fees and Charges</p>
                </li>

                <li>
                <img src={transaction} alt='transaction icon'/>
                <p>Transactions</p>
                </li>

                <li>
                <img src={service} alt='service icon'/>
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
                <img src={slider} alt='preferences icon'/>
                <p>Preferences</p>
                </li>

                <li>
                <img src={fees} alt='fees icon'/>
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
                <li onClick={handleLogOut}>
                <img src={signOut} alt='signout icon'/>
                <p>Log Out</p>
                </li>
                <span>v1.2.0</span>
                {/* <p>v1.2.0</p> */}
                 </footer>
            </ul>
        </aside>
   )
}