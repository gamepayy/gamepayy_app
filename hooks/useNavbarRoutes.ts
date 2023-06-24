import { useMemo } from "react";
import { usePathname } from "next/navigation";

const useNavbarRoutes = () => {
  const pathname = usePathname();

  const navbar_routes = useMemo(
    () => [
      {
        href: "/play",
        label: "Play",
        active: pathname === "/play",
        auth: true,
      },
      {
        href: "/leaderboard",
        label: "Leaderboard",
        auth: true,
        active: pathname === "/leaderboard",
      },
      {
        href: "/blog",
        label: "Blog",
        auth: true,
        active: pathname === "/blog",
      },
    ],
    [pathname]
  );

  return navbar_routes;
};

export default useNavbarRoutes;
