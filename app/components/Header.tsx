"use client";
import Link from "next/link";
import React, { useState } from "react";
import navigation from "../data/nav";
import { AiOutlineMenu } from "react-icons/ai";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex justify-between items-center  w-full h-[72px] max-md:px-4 max-lg:px-4 px-28 py-4 ">
      <Link href="/">
        <img src="/logo.svg" alt="" />
      </Link>
      <div className="flex relative md:hidden">
        <div className="p-2 rounded-sm shadow bg-gray-400">
          <AiOutlineMenu
            className="text-white "
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>

        {isOpen && (
          <div className="fixed  z-10 bg-white shadow-2xl h-full w-[50%] left-0 bottom-0 p-4">
            <ul>
              {navigation.map((el) => (
                <li key={el.id} className=" relative py-2 group">
                  <Link href={el.href}>{el.label}</Link>
                  <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
                  <span className="absolute  left-0 bottom-0 h-[1px] w-full bg-gray-500 mt-4"></span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <ul className="flex gap-4 text-[#212121] max-md:hidden">
        {navigation.map((el) => (
          <li key={el.id} className=" relative group">
            <Link href={el.href}>{el.label}</Link>
            <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
          </li>
        ))}
      </ul>
    </div>
  );
}
