"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Offer", path: "/offer" },
  { name: "Book", path: "/book" },
  { name: "Rides", path: "/rides" },
  { name: "Profile", path: "/profile" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200">
      <div className="max-w-md mx-auto flex justify-around py-2 text-sm">
        {navItems.map((item) => {
          const isActive = pathname === item.path;

          return (
            <Link
              key={item.path}
              href={item.path}
              className="flex flex-col items-center gap-1"
            >
              {/* Active indicator */}
              <span
                className={`h-1 w-6 rounded-full ${
                  isActive ? "bg-gray-800" : "bg-transparent"
                }`}
              />

              {/* Label */}
              <span
                className={`${
                  isActive ? "text-gray-900 font-medium" : "text-gray-500"
                }`}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}