import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { IconType } from "react-icons";

interface SidebarItemProps {
  label?: string;
  icon: IconType;
  href?: string;
  onClick?: () => void;
  auth?: boolean;
  active: boolean;
  // alert?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  icon: Icon,
  href,
  auth,
  onClick,
  active,
  // alert,
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
    <div
      onClick={handleClick}
      className="flex items-center justify-center w-10 h-10 bg-white/[.20] rounded-full cursor-pointer"
    >
      <Icon
        className={
          "text-[#636B6C] hover:text-white" + (active ? " text-white" : "")
        }
        height={20}
        width={20}
      />
    </div>
  );
};

export default SidebarItem;
