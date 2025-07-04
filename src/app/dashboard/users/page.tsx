"use client";
import React, { useState, useEffect } from 'react';
import Card from '@/components/Card/Card';
import Header from '@/components/Header/Header';
import NavigationBar from '@/components/NavigationBar/NavigationBar';
import { useIsScreenSmall } from '@/hooks/useIsScreenSmall';
import PaginatedItems from '@/components/PaginatedItems/PaginatedItems';

const Page = () => {
    const [showNavbar, setShowNavbar] = useState(true);
    const isMobile = useIsScreenSmall();
    const cardData = [
        {
            imgSrc: "/users-images/users-icon.svg",
            title: "USERS",
            numbers: "2,453"
        },
        {
            imgSrc: "/users-images/active-users-icon.svg",
            title: "ACTIVE USERS",
            numbers: "2,453"
        }, 
        {
            imgSrc: "/users-images/users-with-loans-icon.svg",
            title: "USERS WITH LOANS",
            numbers: "12,453"
        },
        {
            imgSrc: "/users-images/users-with-savings.svg",
            title: "USERS WITH SAVINGS",
            numbers: "102,453"
        }
    ];

    useEffect(() => {
        setShowNavbar(isMobile);
    }, [isMobile]);

    return (
        <>
            <Header handleClick={() => setShowNavbar(!showNavbar)} />
            <NavigationBar show={showNavbar} />
            <div id="users-page">
                <h2>Users</h2>

                <div id="cards">
                    {cardData.map((data, index):any => <Card key={index} imgSrc={data.imgSrc} title={data.title} numbers={data.numbers} />)}
                </div>

                <div id="user-listing">
                    <PaginatedItems />
                </div>
            </div>
        </>
    );
}

export default Page;
