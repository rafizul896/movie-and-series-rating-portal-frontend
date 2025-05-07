// app/admin/media/page.tsx

"use client";
import { useState, useEffect } from "react";
import { columns } from "@/components/modules/adminDashboard/Media/columns";
import { DataTable } from "@/components/modules/adminDashboard/Media/data-table";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import UpdateModal from "@/components/modules/adminDashboard/Media/updateModal";

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

// Dummy data
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
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await getData();
      setData(fetchedData);
    };
    fetchData();
  }, []);

  const handleAddMediaClick = () => {
    setOpen(true);
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <h1 className="text-2xl font-bold text-center py-4">Manage Media</h1>
      <div className="container mx-auto py-10">
        <div className="flex justify-end mb-6">
          <Button onClick={handleAddMediaClick} variant={"custom"}>
            <PlusCircle className="w-5 h-5" />
            <span>Add Movie</span>
          </Button>
        </div>

        <DataTable columns={columns} data={data} />
        <UpdateModal open={open} setOpen={setOpen} />
      </div>
    </div>
  );
}
