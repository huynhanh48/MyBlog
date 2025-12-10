"use client";
import { navDashboard } from "@/app/data/dashboard";
import React, { useEffect, useState } from "react";
import { MdDashboard } from "react-icons/md";
import { getColumns, Posts } from "./column";
import { DataTable } from "./data-table";
import { useRouter } from "next/navigation";
import ImageDashboard from "./image";
import { fakePosts } from "./fake-post";

export default function Page() {
  const router = useRouter();
  const [image, setImage] = useState("Post");
  async function getData(): Promise<Posts[]> {
    try {
      const response = await fetch("/api/postitems/allposts?all=1", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log("oke");
      const result: Posts[] = await response.json();
      console.log("result", result);
      return result;
    } catch (error) {
      console.error("Failed to fetch posts:", error);
      return [];
    }
  }
  const [idTab, setIdTab] = useState<number>(navDashboard[0].id);
  const [data, setData] = useState<Posts[]>([]);
  useEffect(() => {
    async function FetchData() {
      const result = await getData();
      setData(result);
    }
    FetchData();
  }, []);
  return (
    <div className="min-h-screen flex ">
      <aside className="bg-blue-400 relative flex-[2] flex flex-col gap-4 p-2">
        <div className="relative">
          <div className="flex items-center  gap-4">
            <MdDashboard className="text-white text-xl" />
            <div className="relative font-bold  w-full text-xl py-4 text-white ">
              Dashboard
            </div>
          </div>
          <span className="absolute  w-full h-[1px] bg-white "></span>
        </div>
        <p className="text-sm font-semibold text-gray-100">Quản lý</p>
        <div className="flex flex-col gap-4">
          {navDashboard.length > 0 &&
            navDashboard.map((e, index) => (
              <div
                key={index}
                className="p-4 bg-white font-medium cursor-pointer"
                onClick={() => {
                  console.log(e.title);
                  setImage(e.title);
                }}
              >
                {e.title ?? "Posts"}
              </div>
            ))}
        </div>
      </aside>

      <section className=" flex-[8] p-2">
        <div className="container mx-auto py-10">
          {image === "Post" ? (
            <DataTable columns={getColumns(router)} data={data} />
          ) : (
            <ImageDashboard />
          )}
        </div>
      </section>
    </div>
  );
}
