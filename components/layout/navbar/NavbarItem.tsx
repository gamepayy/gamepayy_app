import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";

interface NavbarItemProps {
  label: string;
  href: string;
  auth?: boolean;
  active: boolean;
  onClick?: () => void;
}

const NavbarItem: React.FC<NavbarItemProps> = ({
  label,
  href,
  auth,
  onClick,
  active,
}) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const { data: currentUser } = useCurrentUser();

  const handleClick = useCallback(() => {
    if (onClick) {
      return onClick();
    }

    if (auth && !currentUser) {
      loginModal.onOpen();
    } else if (href) {
      router.push(href);
    }
  }, [router, href, auth, loginModal, onClick, currentUser]);

  return (
    <li
      onClick={handleClick}
      className={
        "cursor-pointer hover:text-primary" + (active ? " text-primary" : "")
      }
    >
      {label}
    </li>
  );
};

export default NavbarItem;
