import useCurrentUser from "@/hooks/useCurrentUser";

import React, { use } from "react";
import NavbarItem from "./NavbarItem";

import Button from "@/components/ui/button";
import useLoginModal from "@/hooks/useLoginModal";
import ProfileNav from "./ProvileNav";

const Navbar = () => {
  const { data: currentUser } = useCurrentUser();
  const loginModal = useLoginModal();

  const navbar_items = [
    {
      label: "Play",
      href: "/play",
    },
    {
      label: "Leaderboard",
      href: "/leaderboard",
    },
    {
      label: "Blog",
      href: "/blog",
    },
  ];
  return (
    <div className="flex justify-between items-center p-4 ">
      {currentUser ? (
        <ul className="flex items-center space-x-8 text-white">
          {navbar_items.map((item) => (
            <NavbarItem key={item.label} label={item.label} href={item.href} />
          ))}
        </ul>
      ) : (
        <div></div>
      )}

      {currentUser ? (
        <ProfileNav currentUser={currentUser!} />
      ) : (
        <Button
          label="Sign In"
          onClick={() => {
            loginModal.onOpen();
          }}
        />
      )}
    </div>
  );
};

export default Navbar;
