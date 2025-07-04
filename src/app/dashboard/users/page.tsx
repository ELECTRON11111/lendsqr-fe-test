import React from 'react';
import NavigationBar from '@/components/NavigationBar/NavigationBar';
import Header from '@/components/Header/Header';

const Page = () => {
    return (
        <div id='dashboard-users'>
            <Header />
            <NavigationBar show />
        </div>
    );
}

export default Page;
