import "./_users.scss";
import { useState, useEffect, useMemo, Suspense } from "react";
import Dashboard from "../../components/templates/Dashboard/Dashboard";
import Card from "../../components/atoms/Card/Card";
import PaginatedItems from "../../components/organisms/PaginatedItems/PaginatedItems";
import { type User } from "../../types/userTypes";

import logo from "../../assets/images/login/lendsqr-logo.svg";

const Users = () => {
    const [userList, updateUserList] = useState<User[]>([]);
    const [loading, updateLoading] = useState(true);
    const activeUsersCount = useMemo(() => {
        let count = 0;
        if (!userList || Array.isArray(userList)) {
            userList.forEach(user => user.status.toLowerCase() === "active" && count++);
        }
        return count;
    }, [userList]);

    const cardData = [
        {
            imgSrc: "/images/users/users-icon.svg",
            title: "USERS",
        },
        {
            imgSrc: "/images/users/active-users-icon.svg",
            title: "ACTIVE USERS",
        }, 
        {
            imgSrc: "/images/users/users-with-loans-icon.svg",
            title: "USERS WITH LOANS",
        },
        {
            imgSrc: "/images/users/users-with-savings.svg",
            title: "USERS WITH SAVINGS",
        }
    ];

    const loader = (
        <div id='users-page-loader'>
            <img src={logo} width={174} height={36} alt='Lendsqr Logo' />
            <p>Loading users ....</p>
        </div>
    );

    // Should be in env variable (Left that out because of its not a production app) - woul've been `${process.env.BASE_URL}`
    const baseUrl = `https://opemipoomoniyi.free.beeceptor.com`; 
    const apiConfig = {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        },
    };

    useEffect(() => {
        updateLoading(true);
        const users = localStorage.getItem('users');
        if (users) {
            updateUserList(JSON.parse(users));
            updateLoading(false);
            return;
        }
        // Fetch data from API
        fetch(`${baseUrl}/users`, apiConfig)
            .then(response => response.json())
            .then(list => {
                updateUserList(list);
                localStorage.setItem('users', JSON.stringify(list));
                updateLoading(false);
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => updateLoading(false));
    }, []);

    const getCardNumber = (title: string) => {
        switch(title) {
            case "USERS":
                return userList.length;
            case "ACTIVE USERS":
                return activeUsersCount;
            case "USERS WITH LOANS":
                return userList.length !== 0 ? 342: 0;
            case "USERS WITH SAVINGS":
                return userList.length !== 0 ? 500 - 342: 0;
            default:
                return "";
        }
    }

    return (
        <Suspense fallback={loader}>
            <Dashboard>
                <div id="users-page">
                    <h2>Users</h2>

                    <div id="cards">
                        {cardData.map((data, index) => (
                            <Card 
                                key={index} 
                                imgSrc={data.imgSrc} 
                                title={data.title} 
                                numbers={getCardNumber(data.title)} 
                            />
                        ))}
                    </div>

                    <div id="user-listing">
                        <PaginatedItems userList={userList} loading={loading} />
                    </div>
                </div>
            </Dashboard>
        </Suspense>
    );
}

export default Users;
