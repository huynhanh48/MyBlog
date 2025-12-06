import React from "react";
import { FaFacebook } from "react-icons/fa6";
import { FaTelegram } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className=" px-28 py-4 h-32 w-full fixed bottom-0 left-0 z-50">
      <div className=" h-full w-full z-20 flex justify-between items-center p-2">
        <div>
          <img src="/logo.svg" alt="" />
          <div className="flex ml-2 mt-2  items-center gap-4">
            <Link
              href={"#!"}
              className=" bg-[#F4F4F4] hover:text-white hover:bg-black transition-all  duration-300 p-2 rounded-sm"
            >
              <FaFacebook className="text-xl  " />
            </Link>
            <Link
              href={"#!"}
              className=" bg-[#F4F4F4] hover:text-white hover:bg-black transition-all  duration-300 p-2 rounded-sm"
            >
              <FaTelegram className="text-xl " />
            </Link>
            <Link
              href={"#!"}
              className=" bg-[#F4F4F4] hover:text-white hover:bg-black transition-all  duration-300 p-2 rounded-sm"
            >
              <IoLogoYoutube className="text-xl " />
            </Link>
          </div>
        </div>
        <div>
          <span className="text-[14px] font-semibold">adress</span>
          <p>Level 1, 12 Sample St, Sydney NSW 2000</p>
        </div>
        <div>
          <span className="text-[14px] font-semibold">Phone number</span>
          <p>0868299464</p>
        </div>
        <div>
          <span className="text-[14px] font-semibold">Email</span>
          <p>anhpfa@gmail.com</p>
        </div>
      </div>
    </footer>
  );
}
