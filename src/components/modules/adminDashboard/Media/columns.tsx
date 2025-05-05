/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";

export type Movie = {
  id: string;
  title: string;
  type: "MOVIE" | "SERIES";
  releaseYear: number;
  director: string;
  isTrending: boolean;
  isDeleted: boolean;
};


export const columns: ColumnDef<Movie>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "releaseYear",
    header: "Year",
  },
  {
    accessorKey: "director",
    header: "Director",
  },
  {
    accessorKey: "isTrending",
    header: "Trending",
    cell: ({ row }) => {
      const isTrending = row.getValue("isTrending") as boolean;
      return (
        <Badge className={isTrending ? "bg-blue-600" : "bg-gray-500"}>
          {isTrending ? "Trending" : "Not Trending"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "isDeleted",
    header: "Status",
    cell: ({ row }) => {
      const isDeleted = row.getValue("isDeleted") as boolean;
      return (
        <Badge className={isDeleted ? "bg-red-600" : "bg-green-600"}>
          {isDeleted ? "Deleted" : "Active"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      const media = row.original;
      return (
        <div className="flex gap-2">
          <button className="text-blue-500 hover:underline">Edit</button>
          <button className="text-red-500 hover:underline">Delete</button>
        </div>
      );
    },
  },
];
