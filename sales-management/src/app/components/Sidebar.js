"use client";

import { useState } from "react";
import { BsList } from "react-icons/bs";
import { HiOutlineX } from "react-icons/hi";
import { useMediaQuery } from "react-responsive";
import Link from "next/link";
import { BsBarChart, BsCreditCard, BsGrid, BsCart } from "react-icons/bs";
import { MdOutlineCategory, MdOutlineSettings } from "react-icons/md";

// Sidebar component
const SideBar = () => {
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const isTablet = useMediaQuery({ minWidth: 640, maxWidth: 1023 });
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`${
        isMobile
          ? "fixed top-0 right-0 bg-blue-200"
          : isTablet
          ? "lg:flex lg:fixed lg:inset-y-0 lg:left-0 lg:w-40 bg-blue-200"
          : "lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:left-0 lg:w-52 bg-blue-200"
      } overflow-auto`}
    >
      {isMobile ? (
        <div className="p-4">
          <button
            onClick={toggleSidebar}
            className={`text-2xl ${isOpen ? "text-gray-100"  : "text-blue-500"}`}
          >
            {isOpen ? <HiOutlineX /> : <BsList />}
          </button>
        </div>
      ) : null}
      <ul
        className={`${
          isMobile && !isOpen ? "hidden" : "block"
        } lg:flex lg:flex-col p-4 space-y-4`}
      >
        <li className="flex items-center space-x-2">
          <BsGrid className="w-6 h-6" />
          <Link href="/dashboard">Dashboard</Link>
        </li>
        <li className="flex items-center space-x-2">
          <BsCreditCard className="w-6 h-6" />
          <Link href="/finance">Finance</Link>
        </li>
        <li className="flex items-center space-x-2">
          <BsBarChart className="w-6 h-6" />
          <Link href="/sales">Sales</Link>
        </li>
        <li className="flex items-center space-x-2">
          <BsCart className="w-6 h-6" />
          <Link href="/product">Products</Link>
        </li>
        <li className="flex items-center space-x-2">
          <MdOutlineCategory className="w-6 h-6" />
          <Link href="/category">Category</Link>
        </li>
        <li className="flex items-center space-x-2">
          <MdOutlineSettings className="w-6 h-6" />
          <Link href="/setting">Setting</Link>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
