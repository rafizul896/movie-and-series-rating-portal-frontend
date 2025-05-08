'use client';

import { 
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';
import { IUserType } from '@/types/user';
import { useUserColumns } from './userTableColums';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";

interface UserTableProps {
  data?: IUserType[]; 
}

export function UserTable({ data = [] }: UserTableProps) {
  // Ensure columns is always defined
  const columns = useUserColumns();

  // Validate data before passing to table
  const tableData = Array.isArray(data) ? data : [];
  
  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full overflow-auto rounded-lg border-2 border-gray-700 shadow-sm">
      <Table className="w-full border-collapse">
        <TableHeader className="bg-gray-800 border-b-2 border-gray-700">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="hover:bg-gray-800">
              {headerGroup.headers.map((header) => (
                <TableHead 
                  key={header.id}
                  className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider border-r border-gray-700 last:border-r-0"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="bg-gray-900">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className="hover:bg-gray-800 border-b-2 border-gray-700 last:border-b-0"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell 
                    key={cell.id}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 border-r border-gray-700 last:border-r-0"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell 
                colSpan={columns.length}
                className="h-16 text-center text-gray-400 border-r border-gray-700 last:border-r-0"
              >
                No users found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}