import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { type User } from '../../types/userTypes';
import Dashboard from '../../components/templates/Dashboard/Dashboard';

import backArrowIcon from "../../assets/images/user-details/back-arrow.svg";
import fullStarIcon from "../../assets/images/user-details/full-star.png";
import emptyStarIcon from "../../assets/images/user-details/empty-star.png";
import userAvatar from "../../assets/images/user-details/user-avatar.svg";

export default function UserDetails() {
    const [ user, setUser ] = useState<User>();
    const [ active, setActive ] = useState<'General Settings' | "Documents" | 'Bank Details'  >("General Settings");
    
    const paramValues = useLocation().pathname.split("/");
    const id = paramValues[paramValues.length - 1];
    
    const fetchUserDetails = (): void => {
      const usersFromLocalStorage = localStorage.getItem('users')
      if(usersFromLocalStorage) {
        const users: User[] = JSON.parse(usersFromLocalStorage); //users is an array of objects
        const user = users.find((u) => String(u.id) === id);

        if(user){
          setUser(user);
        } else {
          setUser(undefined);
        }
      } else {
        setUser(undefined);
      }
    }

    function formatCurrency(amount: string) {
      // Extract the currency symbol and numeric part
      const symbol = amount[0];
      const numericPart = amount.slice(1);
    
      const [whole, decimal] = numericPart.split('.');
      const formattedWhole = parseInt(whole, 10).toLocaleString();
    
      return `${symbol}${formattedWhole}.${decimal}`;
    }    

    useEffect(() => {
      fetchUserDetails()
    }, [id]);

    return (
        <Dashboard>
            <div id="user-details-page">
                <Link style={{ textDecoration: 'none'}} to={'/dashboard/users'}>
                    <div className="nav-back-container">
                        <img src={backArrowIcon} alt='back arrow icon'/>
                        <p>Back to Users</p>
                    </div> 
                </Link>

                <main className="user-details-container">
                    <div className="title-container">
                        <h1>User Details</h1>
                        {user && !(user.status.toLowerCase() == "blacklisted" || user.status.toLowerCase() == "Activated") &&
                            <div className="button-container">
                                <button>Blacklist User</button>
                                <button>Activate User</button>
                            </div>
                        }
                    </div>
                    { user === undefined && <p id='user-not-available'>User not available</p>}
                    { user && (
                    <>
                        <section className="user-details">
                            <div>
                                <div className="avatar-container">
                                    <div id="user-avatar-container">
                                        <img src={userAvatar} alt='avatar'/>
                                    </div>
                                    <div className='user-name'>
                                        <p>{`${user.userName}`}</p>  
                                        <p>{user["user_details"].id}</p>  
                                    </div>
                                </div>
                                    <div>
                                        <div className="col-2">
                                            <p>User&apos;s Tier</p>
                                            <div>
                                                <img src={fullStarIcon} alt='full star icon'/>
                                                <img src={emptyStarIcon} alt='empty star icon'/>
                                                <img src={emptyStarIcon} alt='full star icon'/>
                                            </div>
                                        </div> 
                                        <div className="col-3">
                                            <p>{formatCurrency(user["user_details"].account_balance)}</p>
                                            <p>0123456789/{user["user_details"].bank}</p>
                                        </div>
                                    </div>
                                </div>
                            <footer>
                                <p onClick={() => setActive('General Settings')} className={`${active === 'General Settings' ? 'active' : ''}`}>General Details</p>
                                <p>Documents</p>
                                <p>Bank Details</p>
                                <p>Loans</p>
                                <p>Savings</p>
                                <p>App and System</p>
                            </footer>
                        </section>

                        <section className='user-info'>

                            <div className="personal-info">
                                <h3>Personal Information</h3>
                                <div className="personal-info-table">
                                    <div>
                                        <p>Full Name</p> 
                                        <p>{user.userName}</p>    
                                    </div>
                                    <div>
                                        <p>Phone Number</p> 
                                        <p>{user.phoneNumber}</p>    
                                    </div>
                                    <div>
                                        <p>Email Address</p> 
                                        <p>{user.email}</p>    
                                    </div>
                                    <div>
                                        <p>BVN</p> 
                                        <p>{user["user_details"].bvn}</p>    
                                    </div>
                                    <div>
                                        <p>Gender</p> 
                                        <p>{["Male", "Female"][Math.floor(1 * Math.random())]}</p>    
                                    </div>
                                    <div>
                                        <p>Marital Status</p> 
                                        <p>{user["user_details"].personal_info.marital_status}</p>    
                                    </div>
                                    <div>
                                        <p>Children</p> 
                                        <p>{user["user_details"].personal_info.children}</p>    
                                    </div>
                                    <div>
                                        <p>Type of Residence</p> 
                                        <p>{user["user_details"].personal_info.type_of_residence}</p>    
                                    </div>
                                </div> 
                            </div>
                            
                            <div className="education">
                                <h3>Education and Employment</h3>
                                <div className="education-table">
                                    <div>
                                        <p>Level of Education</p> 
                                        <p>{user["user_details"].education_and_employment.level_of_education}</p>    
                                    </div>
                                    <div>
                                        <p>Employment Status</p> 
                                        <p>{user["user_details"].education_and_employment.employment_status}</p>    
                                    </div>
                                    <div>
                                        <p>Sector of Residence</p> 
                                        <p>{user["user_details"].education_and_employment.sector_of_employment}</p>    
                                    </div>
                                    <div>
                                        <p>Duration of Employment</p> 
                                        <p>{user["user_details"].education_and_employment.duration_of_employment}</p>    
                                    </div>
                                    <div>
                                        <p>Office Email</p> 
                                        <p>{user.email}</p>    
                                    </div>
                                    <div>
                                        <p>Monthly Income</p> 
                                        <p>
                                            {formatCurrency(user["user_details"].education_and_employment.monthly_income.split("-")[0])}
                                            - {formatCurrency(user["user_details"].education_and_employment.monthly_income.split("-")[1].trim())}
                                        </p>    
                                    </div>
                                    <div>
                                        <p>Loan Repayment</p> 
                                        <p>{formatCurrency(user["user_details"].education_and_employment.loan_repayment)}</p>    
                                    </div>
                                </div>
                            </div>

                            <div className="socials">
                            <h3>Socials</h3>
                            <div className="socials-table">
                                <div>
                                    <p>Twitter</p> 
                                    <p>{user["user_details"].socials.twitter}</p>    
                                </div>                
                                <div>
                                    <p>Facebook</p> 
                                    <p>{user["user_details"].socials.facebook}</p>    
                                </div>                
                                <div>
                                    <p>Instagram</p> 
                                    <p>{user["user_details"].socials.instagram}</p>    
                                </div>                
                            </div>
                            </div>

                            <div className="guarantor">
                            <h3>Guarantor</h3>
                            <div className="guarantor-table">
                                <div>
                                    <p>Full Name</p> 
                                    <p>{user["user_details"].guarantor.full_name}</p>    
                                </div>                
                                <div>
                                    <p>Phone Number</p> 
                                    <p>{user["user_details"].guarantor.phone_number}</p>    
                                </div>                
                                <div>
                                    <p>Email</p> 
                                    <p>{user["user_details"].guarantor.email_address}</p>    
                                </div>                
                                <div>
                                    <p>Relationship</p> 
                                    <p>{user["user_details"].guarantor.relationship}</p>    
                                </div>                
                            </div>
                            </div>
                        </section>
                    </>
                    )}
                </main>
            </div>
        </Dashboard>
    )
}
