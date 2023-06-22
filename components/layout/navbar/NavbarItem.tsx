import { useRouter } from "next/navigation";
import React, { useCallback } from "react";

interface NavbarItemProps {
  label: string;
  href: string;
}

const NavbarItem: React.FC<NavbarItemProps> = ({ label, href }) => {
  const router = useRouter();
  const handleClick = useCallback(() => {
    router.push(href);
  }, [router, href]);
  return (
    <li onClick={handleClick} className="cursor-pointer hover:text-primary">
      {label}
    </li>
  );
};

export default NavbarItem;
