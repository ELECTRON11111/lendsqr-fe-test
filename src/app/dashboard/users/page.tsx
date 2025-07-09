"use client";
import React, { useState, useEffect, useMemo, Suspense } from 'react';
import Image from 'next/image';
import Card from '@/components/Card/Card';
import Header from '@/components/Header/Header';
import NavigationBar from '@/components/NavigationBar/NavigationBar';
import { useIsScreenSmall } from '@/hooks/useIsScreenSmall';
import PaginatedItems from '@/components/PaginatedItems/PaginatedItems';
import { User } from '@/types/userTypes';

const Page = () => {
    const [showNavbar, setShowNavbar] = useState(true);
    const [userList, updateUserList] = useState<User[]>([]);
    const [loading, updateLoading] = useState(true);
    const isMobile = useIsScreenSmall();
    const activeUsersCount = useMemo(() => {
        let count = 0;
        if (!userList || Array.isArray(userList)) {
            userList.forEach(user => user.status.toLowerCase() === "active" && count++);
        }
        return count;
    }, [userList]);
    const cardData = [
        {
            imgSrc: "/users-images/users-icon.svg",
            title: "USERS",
        },
        {
            imgSrc: "/users-images/active-users-icon.svg",
            title: "ACTIVE USERS",
        }, 
        {
            imgSrc: "/users-images/users-with-loans-icon.svg",
            title: "USERS WITH LOANS",
        },
        {
            imgSrc: "/users-images/users-with-savings.svg",
            title: "USERS WITH SAVINGS",
        }
    ];
    const loader = (
        <div id='users-page-loader'>
            <Image src={"/login/lendsqr-logo.svg"} width={174} height={36} alt='Lendsqr Logo' />
            <h4>Loading users ....</h4>
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

    useEffect(() => {
        setShowNavbar(isMobile);
    }, [isMobile]);

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
            <Header handleClick={() => setShowNavbar(!showNavbar)} />
            <NavigationBar show={showNavbar} />
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
        </Suspense>
    );
}

export default Page;
