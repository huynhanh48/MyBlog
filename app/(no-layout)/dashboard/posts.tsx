import { columns, Posts } from "./column";
import { DataTable } from "./data-table";

async function getData(): Promise<Posts[]> {
  try {
    const response = await fetch("/api/postitems/allposts?all=1", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: Posts[] = await response.json();
    return result;
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return []; // Return empty array if something goes wrong
  }
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
