"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useIsScreenSmall } from '@/hooks/useIsScreenSmall';
import NavigationBar from '@/components/NavigationBar/NavigationBar';
import Header from '@/components/Header/Header';

export default function Page() {
    const [ user, setUser ] = useState<{[key: string]: any}>();
    const [ active, setActive ] = useState<'General Settings' | "Documents" | 'Bank Details'  >("General Settings");
    const [showNavbar, setShowNavbar] = useState(true);
    
    const isMobile = useIsScreenSmall();
    const paramValues = useParams();
    const id = paramValues.userId;
    
    const fetchUserDetails = (): void => {
      const usersFromLocalStorage = localStorage.getItem('users')
      if(usersFromLocalStorage) {
        const users: {[key: string] : any}[] = JSON.parse(usersFromLocalStorage); //users is an array of objects
        let user = users.find((u) => u.id == id? u: undefined);

        if(user){
          setUser(user);
        }
      } else {
        setUser(<h1>User not available</h1>)
      }
    }

    function formatCurrency(amount: string) {
      // Extract the currency symbol and numeric part
      const symbol = amount[0];
      const numericPart = amount.slice(1);
    
      // Split into whole and decimal parts
      const [whole, decimal] = numericPart.split('.');
    
      // Format the whole part with commas
      const formattedWhole = parseInt(whole, 10).toLocaleString();
    
      // Combine the symbol, formatted whole part, and decimal part
      return `${symbol}${formattedWhole}.${decimal}`;
    }    

    useEffect(() => {
      fetchUserDetails()
    }, [id]);

    useEffect(() => {
        setShowNavbar(isMobile);
    }, [isMobile]);

    return (
        <>
            <Header handleClick={() => setShowNavbar(false)} />
            <NavigationBar show={showNavbar} />

            <div id="user-details-page">
                <Link style={{ textDecoration: 'none'}} href={'/dashboard/users'}>
                    <div className="nav-back-container">
                        <img src={'/user-details/back-arrow.svg'} alt='back arrow icon'/>
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
                    { user && (
                    <>
                        <section className="user-details">
                            <div>
                                <div className="avatar-container">
                                    <div id="user-avatar-container"><img src={'/user-details/user-avatar.svg'} alt='avatar'/></div>
                                        <div className='user-name'>
                                            <p>{`${user.userName}`}</p>  
                                            <p>{user["user_details"].id}</p>  
                                        </div>
                                    </div>
                                    <div>
                                        <div className="col-2">
                                            <p>User's Tier</p>
                                            <div>
                                                <img src={'/user-details/full-star.png'} alt='full star icon'/>
                                                <img src={'/user-details/empty-star.png'} alt='full star icon'/>
                                                <img src={'/user-details/empty-star.png'} alt='full star icon'/>
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
        </>
    )
}
