import Link from "next/link";
import React from "react";
import navigation from "../data/nav";

export default function Header() {
  return (
    <div className="flex justify-between items-center  w-full h-[72px] px-28 py-4 ">
      <a href="#!">
        <img src="/logo.svg" alt="" />
      </a>
      <ul className="flex gap-4 text-[#212121]">
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
