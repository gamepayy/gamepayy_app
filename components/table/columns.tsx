import { ColumnDef } from "@tanstack/react-table";
export type Transaction = {
  id: string;
  hash: string;
  date: string;
  amount: number;
  type: "withdraw" | "deposit" | "transfer";
  status: "Complete" | "Failed" | "Processing";
};

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "hash",
    header: "Tx Hash",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "type",
    header: "Transaction Type",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];
