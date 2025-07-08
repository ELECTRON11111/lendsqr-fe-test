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
            <div id='Dashboard'>
                <Image 
                    src={"/login/lendsqr-logo.svg"}
                    alt='Lendsqr Logo'
                    width={245}
                    height={245}
                />

                <h1>Redirecting to Users Page ...</h1>
            </div>
        </>
    );
}

export default Page;
