import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function LoadingUI({ count = 4 }) {
  const array = new Array(count).fill(null);
  return (
    <div className="w-full min-h-screen  max-md:px-4  px-28 row ">
      {/* <Skeleton className="rounded-sm w-[60%] h-12 mx-auto mb-4 font-semibold"></Skeleton>
      <Skeleton className="w-[40%]  mx-auto h-8 mb-4"></Skeleton> */}
      <div className=" w-full">
        <Skeleton className="w-full  h-[300px] mb-4"></Skeleton>
        <div className="flex gap-10">
          <div className="grid  flex-7 grid-cols-3 max-md:grid-cols-1 max-lg:grid-cols-2 auto-rows-[400px] gap-8 ">
            {array.length > 0 &&
              array.map((_, i) => (
                <Skeleton key={i} className="h-full">
                  <Skeleton className="w-[99%]"></Skeleton>
                  <Skeleton className="w-[97%]"></Skeleton>
                  <Skeleton className="w-[95%]"></Skeleton>
                  <Skeleton className="w-[94%]"></Skeleton>
                </Skeleton>
              ))}
          </div>
          <div className="flex-3  max-md:hidden w-full flex gap-5 flex-col">
            <Skeleton className="w-full h-8"></Skeleton>

            <Skeleton className="w-full h-30"></Skeleton>
            <Skeleton className="w-full h-30"></Skeleton>
            {/* <Skeleton className="w-full h-30"></Skeleton> */}
          </div>
        </div>
        <Skeleton className=" h-8 mt-4 mx-auto  w-[120px]"></Skeleton>
      </div>
    </div>
  );
}
