import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useBalance } from "wagmi";

import Button from "@/components/ui/button";
import { DataTable } from "@/components/table/data-table";
import { Transaction, columns } from "@/components/table/columns";

function getData(): Transaction[] {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      hash: "asad",
      amount: 100,
      date: "11/11/11111",
      status: "Complete",
      type: "withdraw",
    },
    {
      id: "728ed52f",
      hash: "asad",
      amount: 100,
      date: "11/11/11111",
      status: "Complete",
      type: "withdraw",
    },
    {
      id: "728ed52f",
      hash: "asad",
      amount: 100,
      date: "11/11/11111",
      status: "Complete",
      type: "withdraw",
    },
    {
      id: "728ed52f",
      hash: "asad",
      amount: 100,
      date: "11/11/11111",
      status: "Complete",
      type: "withdraw",
    },
    {
      id: "728ed52f",
      hash: "asad",
      amount: 100,
      date: "11/11/11111",
      status: "Complete",
      type: "withdraw",
    },
    {
      id: "728ed52f",
      hash: "asad",
      amount: 100,
      date: "11/11/11111",
      status: "Complete",
      type: "withdraw",
    },
    {
      id: "728ed52f",
      hash: "asad",
      amount: 100,
      date: "11/11/11111",
      status: "Complete",
      type: "withdraw",
    },
    {
      id: "728ed52f",
      hash: "asad",
      amount: 100,
      date: "11/11/11111",
      status: "Complete",
      type: "withdraw",
    },
    {
      id: "728ed52f",
      hash: "asad",
      amount: 100,
      date: "11/11/11111",
      status: "Complete",
      type: "withdraw",
    },
    {
      id: "728ed52f",
      hash: "asad",
      amount: 100,
      date: "11/11/11111",
      status: "Complete",
      type: "withdraw",
    },
    {
      id: "728ed52f",
      hash: "asad",
      amount: 100,
      date: "11/11/11111",
      status: "Complete",
      type: "withdraw",
    },
  ];
}

const WalletPage = () => {
  const { address, isConnecting, isDisconnected, isConnected } = useAccount();

  const table_data = getData();

  return (
    <div className="text-white col-span-12">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold">Wallet</h2>
        <ConnectButton />
      </div>
      {/* <div className="flex flex-col h-full gap-4 mt-4">
        <div className="flex gap-4">
          <div className="w-full border border-gray-700 rounded-md p-4 flex justify-between items-start">
            <div className="flex flex-col gap-3">
              <p className="text-gray-400">Pending Rewards</p>
              <div>
                <p className="text-2xl">$ 259.00</p>
                <p className="text-gray-400">~ 0 MATIC</p>
              </div>
            </div>
            <Button label="Withdraw" secondary onClick={() => {}} />
          </div>
          <div className="w-full border border-gray-700 rounded-md p-4 flex justify-between items-start">
            <div className="flex flex-col gap-3">
              <p className="text-gray-400">Wallet Balance</p>
              <div>
                <p className="text-2xl">0 MATIC</p>
                <p className="text-gray-400">~ $0</p>
              </div>
            </div>
          </div>
        </div>
        <DataTable columns={columns} data={table_data} />
      </div> */}
    </div>
  );
};

export default WalletPage;
