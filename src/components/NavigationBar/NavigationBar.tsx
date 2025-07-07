"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from 'next/navigation';
import "../../styles/_navigationbar.scss";

export default function NavigationBar({ show }: { show: boolean }) {
   const router = useRouter();
   const pathname = usePathname();

   const handleLogOut = () => {
       router.push('/');
       sessionStorage.removeItem('auth');
    } 

   return (
        <aside data-testid="nav-container" className={`${show ? 'show' : ''} sidebar`}>
            
            <div className="sidebar-logo-container">
                <img src={'/login/lendsqr-logo.svg'} alt="lendsqr-logo"/>
            </div>
            
            <ul>
                <li>
                    <img src={'/sidebar/briefcase.png'} alt='briefcase icon'/>
                    <p>Switch Organization</p>
                    <img src={'/sidebar/dropdown.png'} alt='dropdown icon'/>
                </li>

    
                <li>
                    <img src={'/sidebar/home.png'} alt='briefcase icon'/>
                    <p>Dashboard</p>
                </li>

                <p className="title">Customers</p>
                
                <Link
                 style={{
                    textDecoration: 'none'
                 }}
                 href="/dashboard/users"
                 className={pathname.includes('dashboard/users') ? "active" : ""}
                >
                    <li>
                        <img src={'/sidebar/user-friends.png'} alt='user icon'/>
                        <p>Users</p>
                    </li>
                </Link>

                <li>
                    <img src={'/sidebar/users.png'} alt='users icon'/>
                    <p>Guarantors</p>
                </li>

                <li>
                    <img src={'/sidebar/sack.png'} alt='sack icon'/>
                    <p>Loans</p>
                </li>

                <li>
                    <img src={'/sidebar/handshake.png'} alt='handshake icon'/>
                    <p>Decision Models</p>
                </li>

                <li>
                    <img src={'/sidebar/piggy-bank.png'} alt='piggybank icon'/>
                    <p>Savings</p>
                </li>

                <li>
                    <img src={'/sidebar/sack1.png'} alt='sack icon'/>
                    <p>Loan Requests</p>
                </li>

                <li>
                    <img src={'/sidebar/user-times.png'} alt='user icon'/>
                    <p>Whitelist</p>
                </li>

                <li>
                    <img src={'/sidebar/user-times.png'} alt='user icon'/>
                    <p>Karma</p>
                </li>

                <p className="title">Businesses</p>

                <li>
                    <img src={'/sidebar/briefcase.png'} alt='briefcase icon'/>
                    <p>Organization</p>
                </li>

                <li>
                    <img src={'/sidebar/sack1.png'} alt='loan icon'/>
                    <p>Loan Products</p>
                </li>

                <li>
                    <img src={'/sidebar/savings-product.png'} alt='savings icon'/>
                    <p>Savings Products</p>
                </li>

                <li>
                    <img src={'/sidebar/coins-solid.png'} alt='fees icon '/>
                    <p>Fees and Charges</p>
                </li>

                <li>
                    <img src={'/sidebar/transactions.png'} alt='transaction icon'/>
                    <p>Transactions</p>
                </li>

                <li>
                    <img src={'/sidebar/services.png'} alt='service icon'/>
                    <p>Services</p>
                </li>

                <li>
                    <img src={'/sidebar/service-account.png'} alt='service-account icon'/>
                    <p>Service Account</p>
                </li>

                <li>
                    <img src={'/sidebar/settlement.png'} alt='settlement icon'/>
                    <p>Settlements</p>
                </li>

                <li>
                    <img src={'/sidebar/chart-bar.png'} alt='reports icon'/>
                    <p>Reports</p>
                </li>

                <p className="title">Settings</p>

                <li>
                    <img src={'/sidebar/sliders.png'} alt='preferences icon'/>
                    <p>Preferences</p>
                </li>

                <li>
                    <img src={'/sidebar/fees-and-pricing.png'} alt='fees icon'/>
                    <p>Fees and Pricing</p>
                </li>

                <li>
                    <img src={'/sidebar/audit.png'} alt='audit icon'/>
                    <p>Audit Logs</p>
                </li>

                <li>
                    <img src={'/sidebar/system-messages.png'} alt='system icon'/>
                    <p>System Messages</p>
                </li>

                <footer>
                    <li data-testid="logout" onClick={handleLogOut}>
                        <img src={'/sidebar/sign-out.png'} alt='signout icon'/>
                        <p>Log Out</p>
                    </li>
                    <span>v1.2.0</span>
                </footer>
            </ul>
        </aside>
   )
}