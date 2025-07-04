import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard | Users",
    description: "This is the dashboard page for accessing all of lendsqr features."
}

export default function Layout ({ children } : { children: React.ReactNode }) {
    return (
        <>
            {children}
        </>
    );
};