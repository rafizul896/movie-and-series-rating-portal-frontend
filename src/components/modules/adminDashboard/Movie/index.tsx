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

const AllMedia = ({ mediaData }: any) => {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-white">All Movies</h2>
      {/* Responsive Table Wrapper */}
      <div className="overflow-x-auto bg-white">
        <Table className="min-w-full border border-gray-300">
          {/* Table Head */}
          <TableHeader>
            <TableRow className="bg-gray-200 text-gray-700 uppercase text-sm font-semibold">
              <TableHead className="px-4 py-3 text-left">Image</TableHead>
              <TableHead className="px-4 py-3 text-left">Title</TableHead>

              <TableHead className="px-4 py-3 text-left">Type</TableHead>
              <TableHead className="px-4 py-3 text-left">
                Release Year
              </TableHead>
              <TableHead className="px-4 py-3 text-left">Like Count</TableHead>
              {/* <TableHead className="px-4 py-3 text-left">Year</TableHead> */}
              <TableHead className="px-4 py-3 text-left">Actions</TableHead>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody>
            {mediaData && mediaData.length > 0 ? (
              mediaData?.map((listing: any, index: number) => (
                <TableRow
                  key={listing.id}
                  className="border-b hover:bg-gray-100 transition"
                >
                  {/* <TableCell className="px-4 py-3 font-medium">
                    {index + 1}
                  </TableCell> */}

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

                  <TableCell className="px-4 py-3 text-black">
                    {listing.title}
                  </TableCell>

                  {/* Price Column */}
                  <TableCell className="px-4 py-3 font-semibold text-green-600">
                    {listing.type}
                  </TableCell>

                  {/* Status Column */}
                  <TableCell className="px-4 py-3 ">
                    {/* <span
                      className={`px-3 py-1 rounded-full text-white text-xs font-bold ${
                        listing.status === "Active"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      {listing.status}
                    </span> */}
                    <span className="text-black">{listing.releaseYear}</span>
                  </TableCell>

                  <TableCell className="px-4 py-3">
                    {/* <span
                      className={`px-3 py-1 rounded-full text-white text-xs font-bold ${
                        listing.isTrending === "true"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      {listing.isTrending}
                    </span> */}
                    <span className="text-black">{listing.likesCount}</span>
                  </TableCell>

                  {/* Actions Column */}
                  <TableCell className="px-4 py-3 flex space-x-3">
                    <Link href={`/user/dashboard/listing/${listing._id}`}>
                      <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md transition">
                        <Pencil className="w-5 h-5 cursor-pointer" />
                      </button>
                    </Link>
                    <button
                      // onClick={() => handleDelete(listing._id)}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md transition cursor-pointer"
                    >
                      <Trash className="w-5 h-5" />
                    </button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="px-4 py-3 text-center text-gray-500"
                >
                  No listings found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AllMedia;
