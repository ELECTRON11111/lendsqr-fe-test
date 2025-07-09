import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./index.scss";

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Login | Lensqr",
  description: "Login page for lendsqr dashboard.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${workSans.variable}`}>
        {children}
      </body>
    </html>
  );
}
