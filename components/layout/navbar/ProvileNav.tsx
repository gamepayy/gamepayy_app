import React, { useState } from "react";
import { signOut } from "next-auth/react";
import {
  RiNotification2Fill,
  RiLogoutCircleRLine,
  RiUserFill,
} from "react-icons/ri";
import { BsDot } from "react-icons/bs";
import { BiChevronUp, BiChevronDown } from "react-icons/bi";
import Image from "next/image";

import { User } from "@prisma/client";
import { useRouter } from "next/navigation";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import Link from "next/link";

interface ProfileNavProps {
  currentUser: User;
}

const ProfileNav: React.FC<ProfileNavProps> = ({ currentUser }) => {
  const router = useRouter();

  const [isOpen, setisOpen] = useState(false);

  return (
    <div className="flex items-center ">
      {/* <div className="relative">
        <BsDot className="absolute text-secondary -top-4 left-0" size={40} />

        <RiNotification2Fill className="w-6 h-6" />
      </div> */}
      <div className="flex items-center">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="gap-2">
                <Image
                  className="rounded-full bg-white"
                  alt="profile"
                  src={
                    currentUser.profileImage
                      ? currentUser.profileImage
                      : "/images/default_profile.png"
                  }
                  width={24}
                  height={24}
                />
                {currentUser.username
                  ? currentUser.username
                  : currentUser.email}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul>
                  <li
                    onClick={() => router.push(`/users/${currentUser.id}`)}
                    className="cursor-pointer"
                  >
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      <div className="flex items-center gap-2">
                        <RiUserFill />
                        Profile
                      </div>
                    </NavigationMenuLink>
                  </li>
                  <li onClick={() => signOut()} className="cursor-pointer">
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      <div className="flex items-center gap-2">
                        <RiLogoutCircleRLine />
                        Logout
                      </div>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
};

export default ProfileNav;
