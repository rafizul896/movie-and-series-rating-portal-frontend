"use client";

import { Trash } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { deleteOrderHistory } from "@/services/purchase";
import { IOrderHistory } from "@/types/purchase.type";

const OrderHistoryTable = ({ orderData }: any) => {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteOrderHistory(id);
      if (res.success) {
        toast.success(res.message || "Order history deleted successfully");
        // router.refresh()
      } else {
        toast.error(res.message || "Could not delete order history");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  console.log(orderData)
  return (
    <div className="p-6">
      <div className="overflow-x-auto rounded-lg shadow border border-gray-700 bg-[#0f172a]">
        <Table className="min-w-full text-sm text-gray-300">
          <TableHeader>
            <TableRow className="text-left font-semibold bg-[#1e293b] text-white">
              <TableHead className="px-4 py-3">SL</TableHead>
              <TableHead className="px-4 py-3">Transaction Id</TableHead>
              <TableHead className="px-4 py-3">User name</TableHead>
              <TableHead className="px-4 py-3">Title</TableHead>
              <TableHead className="px-4 py-3">Amount</TableHead>
              <TableHead className="px-4 py-3">ExpireIn</TableHead>
              <TableHead className="px-4 py-3">Payment Status</TableHead>
              <TableHead className="px-4 py-3">Purchase Type</TableHead>
              <TableHead className="px-4 py-3">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderData && orderData.length > 0 ? (
              orderData?.map((order: IOrderHistory, index: number) => (
                <TableRow
                  key={order.id}
                  className="hover:bg-[#334155] hover:text-white border-b border-gray-700"
                >
                  <TableCell className="px-4 py-3">{index + 1}</TableCell>
                  <TableCell className="px-4 py-3">
                    {order?.transactionId}
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    {order?.users?.name}
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    {order?.movie?.title}
                  </TableCell>
                  <TableCell className="px-4 py-3 ">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium bg-red-700/20 text-red-400`}
                    >
                      ${order.amount}
                    </span>
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    {new Date(order.accessExpiryTime).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        order.paymentStatus === "PAID"
                          ? "bg-green-700/20 text-green-400"
                          : "bg-red-700/20 text-red-400"
                      }`}
                    >
                      {order.paymentStatus}
                    </span>
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        order.purchase_type === "BUY"
                          ? "bg-blue-700/20 text-blue-400"
                          : "bg-yellow-700/20 text-yellow-300"
                      }`}
                    >
                      {order.purchase_type}
                    </span>
                  </TableCell>
                  
                  
                  {/* Actions Column */}
                  <TableCell className="px-4 py-3 flex space-x-3">
                    
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
                            onClick={() => handleDelete(order?.id)}
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
      </div>
    </div>
  );
};

export default OrderHistoryTable;
