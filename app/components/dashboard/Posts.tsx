"use strict";
import React from "react";

import { Posts } from "../../(no-layout)/dashboard/column";
import { DataTable } from "../../(no-layout)/dashboard/data-table";

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
    return []; // Return empty array if something goes wrong
  }
}

export default async function PostsDashboard() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      {/* <DataTable columns={columns} data={data} /> */}
    </div>
  );
}
