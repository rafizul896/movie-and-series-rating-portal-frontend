"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { PurchaseData } from "@/types/purchase.type";

import { format } from "date-fns";


interface Props {
  data: PurchaseData[];
}

export function UserPurchaseTable({ data }: Props) {

  return (
    <div className="w-full overflow-x-auto rounded">
      <Table className="p-4">
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[160px] text-gray-300 text-center">Transaction ID</TableHead>
            <TableHead className="text-gray-300 text-center">Movie name</TableHead>
            <TableHead className="text-gray-300 text-center">Type</TableHead>
            <TableHead className="text-gray-300 text-center">Amount</TableHead>
            <TableHead className="text-gray-300 text-center">Status</TableHead>
            <TableHead className="text-gray-300 text-center">Purchased At</TableHead>
            <TableHead className="text-gray-300 text-center">Expiry Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((item:any) => (
            <TableRow key={item.id} className="hover:bg-gray-700">
              <TableCell className="font-medium text-gray-300 text-center">{item.transactionId}</TableCell>
              <TableCell className="text-gray-300 text-center">{item?.movie?.title}</TableCell>
              <TableCell className="text-gray-300 text-center">{item.purchase_type}</TableCell>
              <TableCell className="text-gray-300 text-center">
                {item.amount} {item.currency}
              </TableCell>
              <TableCell
                className={`${
                  item.paymentStatus === "PAID"
                    ? "text-green-500 font-semibold"
                    : "text-red-500"
                } text-gray-300 text-center`}
              >
                {item.paymentStatus}
              </TableCell>
              <TableCell className="text-gray-300 text-center">{new Date(item.purchasedAt).toLocaleDateString()}</TableCell>
              <TableCell className="text-gray-300 text-center">{new Date(item.accessExpiryTime).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
