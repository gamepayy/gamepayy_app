import React from "react";
import Sidebar from "./layout/sidebar/Sidebar";
import Navbar from "./layout/navbar/Navbar";
import FollowBar from "./layout/FollowBar";
interface LayoutProps {
  children: React.ReactNode;
}
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex">
      <div className="w-[72px] flex justify-center bg-black">
        <Sidebar />
      </div>
      <div className="flex flex-col w-full">
        <Navbar />
        <div className="grid grid-cols-12 gap-6 h-full p-4">
          {children}
          {/* <FollowBar /> */}
        </div>
      </div>
    </div>
  );
};

export default Layout;
