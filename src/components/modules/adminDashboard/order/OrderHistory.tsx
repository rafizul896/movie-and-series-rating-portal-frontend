"use client";
import React, { useState, useEffect } from "react";
import OrderHistoryTable from "./OrderHistoryTable";
import { getAllOrderHistory } from "@/services/purchase";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CommonPagination from "@/components/shared/CommonPagination";

const ManageOrderHistory = () => {
  const [paymentStatus, setPaymentStatus] = useState("");
  const [purchaseType, setPurchaseType] = useState("");
  const [orderData, setOrderData] = useState([]);

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 2;

  //filter by
  const handlePaymentStatusChange = (value: string) => {
    setPaymentStatus(value === "none" ? "" : value);
    setCurrentPage(1);
  };
  const handlePurchaseTypeChange = (value: string) => {
    setPurchaseType(value === "none" ? "" : value);
    setCurrentPage(1);
  };

  const fetchData = async () => {
    const result = await getAllOrderHistory({
      paymentStatus,
      purchase_type: purchaseType,
      page: currentPage,
      limit
    });

    const meta = result?.data?.meta;
    setTotalPages(Math.ceil(meta?.total / meta?.limit));
    setOrderData(result?.data?.data || []);
  };

  useEffect(() => {
    fetchData();
  }, [paymentStatus, purchaseType, currentPage]);

  return (
    <div className="space-y-4 mt-10">
      <div className="px-8 flex flex-wrap justify-center items-center gap-5">
        <Select onValueChange={handlePaymentStatusChange}>
          <SelectTrigger className="w-48 border border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 hover:border-red-500 transition-all duration-200 cursor-pointer">
            <SelectValue placeholder="Sort By paymentStatus" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="PAID">PAID</SelectItem>
            <SelectItem value="FAILED">FAILED</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={handlePurchaseTypeChange}>
          <SelectTrigger className="w-48 border border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 hover:border-red-500 transition-all duration-200 cursor-pointer">
            <SelectValue placeholder="Sort By purchase_type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="BUY">BUY</SelectItem>
            <SelectItem value="RENT">RENT</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <OrderHistoryTable orderData={orderData} onFetch={fetchData} />

      <CommonPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default ManageOrderHistory;
