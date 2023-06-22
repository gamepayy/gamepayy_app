import React from "react";
import SidebarLogo from "./SidebarLogo";
import SidebarItem from "./SidebarItem";
import useRoutes from "@/hooks/useRoutes";

const Sidebar = () => {
  const routes = useRoutes();
  return (
    <div className="sticky top-0 flex flex-col gap-6 mt-6 items-center ">
      <SidebarLogo />
      <div className="flex flex-col gap-4 items-center">
        {routes.map((item, index) => (
          <SidebarItem
            key={index}
            icon={item.icon}
            href={item.href}
            auth={item.auth}
            active={item.active}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
