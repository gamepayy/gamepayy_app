import React, { useCallback } from "react";
import Image from "next/image";
import gp_logo from "@/public/images/gp_logo.png";
import { useRouter } from "next/router";
import useLoginModal from "@/hooks/useLoginModal";
import useCurrentUser from "@/hooks/useCurrentUser";

const SidebarLogo = () => {
  const loginModal = useLoginModal();
  const router = useRouter();
  const { data: currentUser } = useCurrentUser();
  const onClick = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    router.push("/");
  }, [loginModal, router, currentUser]);
  return (
    <Image
      src={gp_logo}
      alt="logo"
      width={40}
      height={40}
      priority
      onClick={onClick}
    />
  );
};

export default SidebarLogo;
