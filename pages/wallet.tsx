import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const WalletPage = () => {
  return (
    <div className="text-white col-span-12">
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <h1 className="text-4xl font-bold">Wallet Page</h1>
        <ConnectButton />
      </div>
    </div>
  );
};

export default WalletPage;
