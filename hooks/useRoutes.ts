import { useMemo } from "react";
import { usePathname } from "next/navigation";
import {
  RiHome2Fill,
  RiGroupFill,
  RiMessage2Fill,
  RiQuestionnaireFill,
  RiSettings5Fill,
  RiCoinsFill,
} from "react-icons/ri";
import { HiUserGroup } from "react-icons/hi";

const useRoutes = () => {
  const pathname = usePathname();
  const routes = useMemo(
    () => [
      {
        icon: RiHome2Fill,
        href: "/",
        label: "Home",
        active: pathname === "/",
      },
      {
        icon: RiGroupFill,
        href: "/friends",
        label: "Friends",
        auth: true,
        active: pathname === "/friends",
      },
      {
        icon: RiMessage2Fill,
        href: "/messages",
        label: "Messages",
        auth: true,
        active: pathname === "/messages",
      },
      {
        icon: HiUserGroup,
        href: "/team",
        label: "Team",
        auth: true,
        active: pathname === "/team",
      },
      {
        icon: RiCoinsFill,
        href: "/wallet",
        label: "Wallet",
        auth: true,
        active: pathname === "/wallet",
      },
      {
        icon: RiSettings5Fill,
        href: "/settings",
        label: "Settings",
        auth: true,
        active: pathname === "/settings",
      },
      {
        icon: RiQuestionnaireFill,
        href: "faq",
        label: "FAQ",
        active: pathname === "/faq",
      },
    ],
    [pathname]
  );

  return routes;
};

export default useRoutes;
