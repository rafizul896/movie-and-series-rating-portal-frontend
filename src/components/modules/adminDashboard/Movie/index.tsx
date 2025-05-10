"use client";

import { Pencil, Trash } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import Link from "next/link";
import { deletedMovie,  getMovies } from "@/services/movie";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import CommonPagination from "@/components/shared/CommonPagination";

const AllMedia = () => {
  const [mediaData, setMediaData] = useState([]);

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  const fetchData = async () => {
    const result = await getMovies({
      page: currentPage,
      limit: 5
    });
    const meta = result?.data?.meta;
    setTotalPages(Math.ceil(meta?.total / meta?.limit));
    setMediaData(result?.data?.data || []);
  };

  useEffect(() => {
    fetchData();
  }, [currentPage,totalPages,currentPage]);


  const handleDelete = async (id: string) => {
    try {
      const res = await deletedMovie(id);
      if (res.success) {
        toast.success(res.message || "Media deleted successfully");
        fetchData()
      } else {
        toast.error(res.message || "Could not delete media");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-white">All Movies</h2>
      {/* Responsive Table Wrapper */}
      <div className="overflow-x-auto bg-[#101828] ">
        <Table className="min-w-full border border-gray-300 text-white">
          {/* Table Head */}
          <TableHeader>
            <TableRow className="bg-gray-200 text-gray-700 uppercase text-sm font-semibold ">
              <TableHead className="px-4 py-3 text-left">Image</TableHead>
              <TableHead className="px-4 py-3 text-left">Title</TableHead>

              <TableHead className="px-4 py-3 text-left">Type</TableHead>
              <TableHead className="px-4 py-3 text-left">
                Release Year
              </TableHead>
              <TableHead className="px-4 py-3 text-left">
                Discount Price
              </TableHead>
              <TableHead className="px-4 py-3 text-left">Like Count</TableHead>
              <TableHead className="px-4 py-3 text-left">
                Streaming Link
              </TableHead>
              <TableHead className="px-4 py-3 text-left">Actions</TableHead>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody>
            {mediaData && mediaData?.length > 0 ? (
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              mediaData?.map((listing: any, index: number) => (
                <TableRow
                  key={listing.id}
                  className="border-b hover:bg-gray-700 text-white"
                >
                  {/* Image Column */}
                  <TableCell className="px-4 py-3">
                    <Image
                      src={listing.thumbnail}
                      alt={listing.title}
                      width={100}
                      height={100}
                      className="w-16 h-16 rounded-md object-cover border"
                    />
                  </TableCell>

                  <TableCell className="px-4 py-3 ">{listing.title}</TableCell>

                  {/* Price Column */}
                  <TableCell className="px-4 py-3 font-semibold text-green-600">
                    {listing.type}
                  </TableCell>

                  {/* Status Column */}
                  <TableCell className="px-4 py-3 ">
                    <span className="">{listing.releaseYear}</span>
                  </TableCell>

                  <TableCell className="px-4 py-3 ">
                    <span>
                      {listing.discountPrice ? listing.discountPrice : "0"}
                    </span>
                  </TableCell>

                  <TableCell className="px-4 py-3">
                    <span>{listing.likesCount}</span>
                  </TableCell>

                  <TableCell className="px-4 py-3">
                    {/* <span >{listing.streamingLink}</span> */}
                    <Link
                      href={
                        listing.streamingLink ||
                        `https://www.youtube.com/embed/iu2eXrYe8Fo?si=bhSoxnmmO81yqATw`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant={"customOutlined"}
                        className="cursor-pointer w-full  mb-2"
                      >
                        Streaming link
                      </Button>
                    </Link>
                  </TableCell>

                  {/* Actions Column */}
                  <TableCell className="px-4 py-3 flex space-x-3">
                    <Link href={`/admin/movie/${listing.id}`}>
                      <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md transition">
                        <Pencil className="w-5 h-5 cursor-pointer" />
                      </button>
                    </Link>
                    {/* deleted dialog add there */}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md transition cursor-pointer">
                          {" "}
                          <Trash className="w-5 h-5" />
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-red-500">
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your media and remove your data from our
                            servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="bg-gray-500 hover:bg-gray-600 cursor-pointer">
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(listing.id)}
                            className="text-white hover:bg-red-500 bg-red-600 cursor-pointer"
                          >
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="px-4 py-3 text-center text-gray-500"
                >
                  No Media found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <CommonPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      </div>
    </div>
  );
};

export default AllMedia;
