import { formatted } from "@/utilize/date";
import { Link } from "lucide-react";
import Image from "next/image";
import React from "react";
import { FaUserCircle } from "react-icons/fa";

interface TrendingCardProps {
  _id: string;
  img: string;
  category: string;
  author?: string | null;
  date: Date;
}

export default function TrendingCard({
  _id,
  img,
  category,
  author,
  date,
}: TrendingCardProps) {
  return (
    <a href={`postitems/view?id=${_id}`} className="block">
      <div className="flex gap-5  cursor-pointer">
        <img
          src={img}
          height={150}
          width={150}
          alt={category}
          className="object-cover h-[120px]"
        />
        <div>
          <span>{formatted(date)}</span>
          <p className="text-md line-clamp-2  font-medium">{category}</p>
          <div className="flex  gap-4 items-center">
            <FaUserCircle />
            <span>Anonymous</span>
          </div>
        </div>
      </div>
    </a>
  );
}
