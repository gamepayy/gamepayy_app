import useUsers from "@/hooks/useUsers";
import React, { useCallback } from "react";
import Avatar from "../ui/avatar";
import { RiAddFill } from "react-icons/ri";
import useFollow from "@/hooks/useFollow";
import { useRouter } from "next/router";

const FollowBar = () => {
  const { data: users = [] } = useUsers();

  if (users.length === 0) {
    return null;
  }

  return (
    <div className="col-span-3 text-white border px-6 py-5 flex flex-col gap-4 rounded-lg">
      <div>New users</div>
      <div className="flex flex-col gap-4">
        {users.slice(0, 5).map((user: Record<string, any>) => (
          <div
            key={user.id}
            className="flex flex-row items-center justify-between"
          >
            <div className="flex flex-row items-center gap-2">
              <Avatar userId={user.id} />
              <div className="flex flex-col">
                <p className="text-white font-semibold text-sm">
                  {user.username}
                </p>
                <p className="text-neutral-400 text-sm">{user.bio}</p>
              </div>
            </div>
            {/* <RiAddFill size={16} onClick={() => {}} /> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FollowBar;
