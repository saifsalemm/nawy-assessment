"use client";

import Logo from "@/assets/sample-logo.svg";
import { House, Megaphone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className="w-full">
      <nav className="sticky top-0 z-50 bg-white px-8 py-2 shadow w-full flex">
        <Image
          src={Logo}
          alt="Logo"
          className="md:me-8 me-4 self-start"
          width={60}
          height={60}
        />
        <ul className="md:gap-8 gap-6 grow flex items-center justify-center">
          <li>
            <Link href="/?page=1" className="font-semibold flex items-center gap-2">
              <House className="size-4" />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link
              href="/add-unit"
              className="font-semibold flex items-center gap-2"
            >
              <Megaphone className="size-4" />
              <span>List Your Property</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
