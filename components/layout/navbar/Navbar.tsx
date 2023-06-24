import useCurrentUser from "@/hooks/useCurrentUser";

import React, { use } from "react";
import NavbarItem from "./NavbarItem";

import Button from "@/components/ui/button";
import useLoginModal from "@/hooks/useLoginModal";
import ProfileNav from "./ProvileNav";
import useNavbarRoutes from "@/hooks/useNavbarRoutes";

const Navbar = () => {
  const { data: currentUser } = useCurrentUser();
  const loginModal = useLoginModal();
  const navbar_items = useNavbarRoutes();
  return (
    <div className="flex justify-between items-center p-4 ">
      {currentUser ? (
        <ul className="flex items-center space-x-8 text-white">
          {navbar_items.map((item) => (
            <NavbarItem
              key={item.label}
              label={item.label}
              href={item.href}
              active={item.active}
              auth={item.auth}
            />
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
