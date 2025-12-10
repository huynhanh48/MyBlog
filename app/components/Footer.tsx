import React from "react";
import { FaFacebook } from "react-icons/fa6";
import { FaTelegram } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className=" mt-auto px-28 max-md:px-4 max-lg:px-4 py-4 h-32 w-full    z-50">
      <div className=" h-full w-full gap-8 grid  grid-cols-4 max-md:grid-cols-2 max-sm:grid-cols-1  justify-between  items-center p-2">
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
          <span className="text-[14px] font-semibold">Adress</span>
          <p>TP HUE, 48 HO XUAN HUONG</p>
        </div>
        <div>
          <span className="text-[14px] font-semibold">Phone number</span>
          <p>0868299464</p>
        </div>
        <div>
          <span className="text-[14px] font-semibold">Email</span>
          <p>anhpaf @gmail.com</p>
        </div>
      </div>
    </footer>
  );
}
