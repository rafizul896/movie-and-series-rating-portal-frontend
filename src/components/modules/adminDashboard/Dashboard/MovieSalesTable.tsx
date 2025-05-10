"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { DatePickerWithRange } from "@/components/ui/DateRangePicker";
import CustomPagination from "@/components/shared/Pagination";
import { getMovieWiseSales } from "@/services/dashboardHome";
import { IMovie } from "@/types/dashboardHome.type";
import { useCallback } from "react";
import CommonPagination from "@/components/shared/CommonPagination";

const MovieSalesTable = () => {
  const [salesData, setSalesData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  
  // const [startDate, setStartDate] = useState("");
  // const [endDate, setEndDate] = useState("");
  // const handleDateChange = ({
  //   startDate,
  //   endDate,
  // }: {
  //   startDate: string;
  //   endDate: string;
  // }) => {
  //   setStartDate(startDate);
  //   setEndDate(endDate);
  // };

  const fetchData = useCallback(async () => {
    const res = await getMovieWiseSales({
      searchTerm,
      page,
      pageSize: limit,
    });

    if (res?.data) {
      setSalesData(res.data);
      setTotalPages(res.meta.totalPage);
    }
  }, [searchTerm,  page, limit]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Card className="w-full overflow-x-auto bg-black text-white border-gray-500">
      <div className="flex flex-col md:flex-row gap-4 justify-between px-4">
        <div className="md:w-[50%]">
          <Input
            className="border-gray-400"
            id="search"
            placeholder="Search by Movie Title"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-span-1">
          {/* <DatePickerWithRange onDateChange={handleDateChange} /> */}
        </div>
      </div>
      <CardContent className="px-4">
        <Table >
          <TableHeader>
            <TableRow className="border-gray-500">
              <TableHead>Title</TableHead>
              <TableHead className="text-center">Rentals</TableHead>
              <TableHead className="text-center">Buys</TableHead>
              <TableHead className="text-center">Total Purchases</TableHead>
              <TableHead className="text-center">Rental Revenue</TableHead>
              <TableHead className="text-center">Buy Revenue</TableHead>
              <TableHead className="text-center">Total Revenue</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {salesData?.map((movie: IMovie) => (
              <TableRow key={movie?.movieId} className="border-gray-500 hover:bg-gray-600">
                <TableCell>{movie?.movieTitle}</TableCell>
                <TableCell className="text-center">
                  {movie?.rentalCount}
                </TableCell>
                <TableCell className="text-center">{movie?.buyCount}</TableCell>
                <TableCell className="text-center">
                  {movie?.totalBothPurchases}
                </TableCell>
                <TableCell className="text-center">
                  ${movie?.totalRevenueRental.toFixed(2)}
                </TableCell>
                <TableCell className="text-center">
                  ${movie?.totalRevenueBuy.toFixed(2)}
                </TableCell>
                <TableCell className="text-center">
                  ${movie?.totalRevenue.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-end">
          <div>
            <CommonPagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MovieSalesTable;