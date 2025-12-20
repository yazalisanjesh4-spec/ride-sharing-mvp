"use client";

import "./globals.css";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const hideNavbar =
    pathname === "/login" || pathname === "/signup";

  return (
    <html lang="en">
      <body className="pb-16">
        {!hideNavbar && <Navbar />}
        {children}
      </body>
    </html>
  );
}