"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { columns } from "@/components/modules/adminDashboard/Media/columns";
import { DataTable } from "@/components/modules/adminDashboard/Media/data-table";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

// Movie type
type Movie = {
  id: string;
  title: string;
  type: "MOVIE" | "SERIES";
  releaseYear: number;
  director: string;
  isTrending: boolean;
  isDeleted: boolean;
};

// Dummy data (replace with actual API call later)
async function getData(): Promise<Movie[]> {
  return [
    {
      id: "1",
      title: "Avengers",
      type: "MOVIE",
      releaseYear: 2012,
      director: "Joss Whedon",
      isTrending: true,
      isDeleted: false,
    },
    {
      id: "2",
      title: "Loki",
      type: "SERIES",
      releaseYear: 2021,
      director: "Kate Herron",
      isTrending: true,
      isDeleted: false,
    },
    {
      id: "3",
      title: "Old Classic",
      type: "MOVIE",
      releaseYear: 1995,
      director: "Someone",
      isTrending: false,
      isDeleted: true,
    },
  ];
}

export default function ManageMediaPage() {
  const [data, setData] = useState<Movie[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await getData();
      setData(fetchedData);
    };
    fetchData();
  }, []);

  const handleAddMediaClick = () => {
    router.push("/admin/media/add-movie");
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <h1 className="text-2xl font-bold text-center py-4">Manage Media</h1>
      <div className="container mx-auto py-10">
        <div className="flex justify-end mb-6">
          <Button
            className="bg-gradient-to-r cursor-pointer from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 
                      text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-lg
                      transition-all duration-300 ease-in-out transform hover:-translate-y-1
                      focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50
                      flex items-center space-x-2"
            onClick={handleAddMediaClick}
          >
            <PlusCircle className="w-5 h-5" />
            <span>Add Movie</span>
          </Button>
        </div>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
