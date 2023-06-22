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

interface ProfileNavProps {
  currentUser: User;
}

const ProfileNav: React.FC<ProfileNavProps> = ({ currentUser }) => {
  const router = useRouter();

  const [isOpen, setisOpen] = useState(false);

  return (
    <div className="flex gap-6 items-center text-white">
      {/* <div className="relative">
        <BsDot className="absolute text-secondary -top-4 left-0" size={40} />

        <RiNotification2Fill className="w-6 h-6" />
      </div> */}
      <div className="flex items-center gap-1">
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
        <div className="relative flex flex-col items-center z-50">
          <button
            className="flex items-center justify-between"
            onClick={() => setisOpen(!isOpen)}
          >
            {currentUser.username ? currentUser.username : currentUser.email}
            {isOpen ? (
              <BiChevronUp className="w-6 h-6" />
            ) : (
              <BiChevronDown className="w-6 h-6" />
            )}
          </button>
          {isOpen && (
            <div className="absolute flex flex-col top-10 bg-slate-700 p-[12px] right-4 gap-4">
              <button
                className="flex items-center gap-2"
                onClick={() => router.push(`/users/${currentUser.id}`)}
              >
                <RiUserFill size={24} />
                Profile
              </button>
              <button
                className="flex items-center gap-2"
                onClick={() => signOut()}
              >
                <RiLogoutCircleRLine size={24} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileNav;
