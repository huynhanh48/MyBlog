"use client";
import { ArrowUpDown } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatted } from "@/utilize/date";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Posts = {
  _id: string;
  category: string;
  author: string;
  date: Date;
  trending: boolean;
  content: string;
  brief: string;
  img: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getColumns = (router: any): ColumnDef<Posts>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "author",
    header: "Author",
    cell: ({ row }) => {
      const author = row.getValue("author") as string | null;
      return <span>{author ?? "Anonymous"}</span>;
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const dataformatted = formatted(row.getValue("date"));
      return dataformatted;
    },
  },
  {
    accessorKey: "trending",
    header: "Trending",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const posts = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(posts._id)}
            >
              Copy category ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={(e) => {
                router.push(`/postitems/edit?id=${posts._id}`);
              }}
            >
              Edit Post
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={async () => {
                const isConfirmed = confirm("Bạn có chắc muốn xóa không?"); // hộp thoại xác nhận
                if (!isConfirmed) return; // nếu Cancel thì thoát

                try {
                  const res = await fetch(
                    `/api/postitems/delete?id=${posts._id}`,
                    {
                      method: "POST",
                    }
                  );
                  const data = await res.json();

                  if (res.ok) {
                    alert(`Deleted successfully! ID: ${data.id}`); // alert khi server xóa thành công
                  }
                } catch (err) {
                  console.error(err);
                }
              }}
            >
              Delete Post
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
