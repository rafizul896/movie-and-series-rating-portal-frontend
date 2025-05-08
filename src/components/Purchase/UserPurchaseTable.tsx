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
    <div className="w-full overflow-x-auto rounded-xl border border-gray-200 bg-gray-800 dark:bg-gray-800">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[160px] text-white">Transaction ID</TableHead>
            <TableHead className="text-white">Movie ID</TableHead>
            <TableHead className="text-white">Type</TableHead>
            <TableHead className="text-white">Amount</TableHead>
            <TableHead className="text-white">Status</TableHead>
            <TableHead className="text-white">Purchased At</TableHead>
            <TableHead className="text-white">Expiry Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium text-white">{item.transactionId}</TableCell>
              <TableCell className="text-white">{item.movieId}</TableCell>
              <TableCell className="text-white">{item.purchase_type}</TableCell>
              <TableCell className="text-white">
                {item.amount} {item.currency}
              </TableCell>
              <TableCell
                className={`${
                  item.paymentStatus === "PAID"
                    ? "text-green-500 font-semibold"
                    : "text-red-500"
                } text-white`}
              >
                {item.paymentStatus}
              </TableCell>
              <TableCell className="text-white">{format(new Date(item.purchasedAt), "PPpp")}</TableCell>
              <TableCell className="text-white">{format(new Date(item.accessExpiryTime), "PPpp")}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
