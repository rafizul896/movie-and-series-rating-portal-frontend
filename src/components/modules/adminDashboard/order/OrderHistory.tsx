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

const ManageOrderHistory = () => {
  const [paymentStatus, setPaymentStatus] = useState("");
  const [purchaseType, setPurchaseType] = useState("");
  const [orderData, setOrderData] = useState([]);

  // Handle payment status change
  const handlePaymentStatusChange = (value: string) => {
    setPaymentStatus(value === "none" ? "" : value);
  };

  // Handle purchase type change
  const handlePurchaseTypeChange = (value: string) => {
    setPurchaseType(value === "none" ? "" : value);
  };

  const fetchData = async () => {
    const result = await getAllOrderHistory({
      paymentStatus: paymentStatus,
      purchase_type: purchaseType,
    });
    setOrderData(result?.data?.data || []);
  };
  useEffect(() => {
    fetchData();
  }, [paymentStatus, purchaseType]);

  return (
    <div className="space-y-4 mt-10">
       <div className="px-8 flex justify-start items-center gap-5">
        {/* Dropdown for paymentStatus */}
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

      {/* Dropdown for purchase_type */}

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

      <OrderHistoryTable orderData={orderData} onFetch={fetchData}/>
    </div>
  );
};

export default ManageOrderHistory;
