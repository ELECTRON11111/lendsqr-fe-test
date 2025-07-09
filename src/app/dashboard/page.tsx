"use client";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import React from 'react';

const Page = () => {
    const router = useRouter();

    useEffect(() => {
        router.push("/dashboard/users");
    }, []);

    return (
        <>
            <div id='users-page-loader'>
                <Image 
                    src={"/login/lendsqr-logo.svg"}
                    alt='Lendsqr Logo'
                    width={245}
                    height={46}
                />

                <p>Redirecting to Users Page ...</p>
            </div>
        </>
    );
}

export default Page;
