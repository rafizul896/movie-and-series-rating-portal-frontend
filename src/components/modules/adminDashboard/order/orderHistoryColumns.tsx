'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { IOrderHistory } from '@/types/purchase.type';
import { Trash } from 'lucide-react';

type Props = {
  onDelete: (id: string, name?: string) => void;
};

export function useOrderHistoryColumns({ onDelete }: Props) {
  const columns: ColumnDef<IOrderHistory>[] = [
    {
      accessorKey: 'movie.title',
      header: 'Movie',
      cell: ({ row }) => (
        <span className="font-medium text-gray-200 line-clamp-1">
          {row.original.movie?.title || 'N/A'}
        </span>
      ),
    },
    {
      accessorKey: 'users.name',
      header: 'User',
      cell: ({ row }) => (
        <span className="text-sm text-gray-200">{row.original.users?.name || 'N/A'}</span>
      ),
    },
    {
      accessorKey: 'purchase_type',
      header: 'Type',
      cell: ({ row }) => (
        <Badge 
          variant="outline" 
          className="text-xs bg-red-900/30 text-red-400 border-red-600"
        >
          {row.original.purchase_type}
        </Badge>
      ),
    },
    {
      accessorKey: 'paymentStatus',
      header: 'Payment',
      cell: ({ row }) => {
        const status = row.original.paymentStatus;
        let style = 'bg-yellow-900/30 text-yellow-400 border-yellow-600';
        if (status === 'PAID') style = 'bg-green-900/30 text-green-400 border-green-600';
        else if (status === 'FAILED') style = 'bg-red-900/30 text-red-400 border-red-600';

        return (
          <Badge variant="outline" className={`text-xs ${style}`}>
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'amount',
      header: 'Amount',
      cell: ({ row }) => (
        <span className="text-sm text-gray-200">${row.original.amount.toFixed(2)}</span>
      ),
    },
    {
      accessorKey: 'accessExpiryTime',
      header: 'Expiry',
      cell: ({ row }) => {
        const date = new Date(row.original.accessExpiryTime);
        return (
          <span className="text-sm text-gray-300">
            {date.toLocaleDateString()} {date.toLocaleTimeString()}
          </span>
        );
      },
    },
    {
      accessorKey: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const id = row.original.id;
        const name = row.original.movie?.title;
        return (
          <button
            onClick={() => onDelete(id, name)}
            className="p-2 rounded-md bg-gray-700 hover:bg-gray-600 text-red-400 transition-colors shadow-sm"
            title="Delete Order"
          >
            <Trash className="w-4 h-4" />
          </button>
        );
      },
    },
  ];

  return columns;
}