import Image from "next/image";
import useUser from "@/hooks/useUser";
import { RiEditFill } from "react-icons/ri";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useMemo } from "react";

import { format } from "date-fns";
import Button from "../ui/button";
import useEditModal from "@/hooks/useEditModal";
import Avatar from "../ui/avatar";
import useFollow from "@/hooks/useFollow";

import { TabPanel, useTabs } from "react-headless-tabs";
import { TabSelector } from "./TabSelector";

interface UserHeroProps {
  userId: string;
}
const UserHero: React.FC<UserHeroProps> = ({ userId }) => {
  const { data: fetchedUser } = useUser(userId);
  const { data: currentUser } = useCurrentUser();
  const editModal = useEditModal();
  const { isFollowing, toggleFollow } = useFollow(userId);

  const createdAt = useMemo(() => {
    if (!fetchedUser?.createdAt) {
      return null;
    }

    return format(new Date(fetchedUser.createdAt), "MMMM yyyy");
  }, [fetchedUser?.createdAt]);

  const [selectedTab, setSelectedTab] = useTabs([
    "individual",
    "team",
    "wager",
  ]);

  return (
    <div className="bg-black rounded-lg border border-gray-700">
      <div className="h-60 relative">
        <Image
          src={fetchedUser?.coverImage ?? "/images/default_cover.png"}
          fill
          alt="Cover Image"
          style={{ objectFit: "cover" }}
          className="rounded-t-lg bg-gray-500"
        />
        <div className="absolute top-12 left-4">
          <div className="flex items-center gap-6">
            <div className="">
              <Avatar userId={userId} isLarge />
            </div>

            <div className="flex flex-col gap-2">
              <div>{fetchedUser?.username ?? "Set username"}</div>
              <div>{fetchedUser?.bio ?? "+ Add status"}</div>
              {/* <div>Socials</div> */}
            </div>
          </div>
        </div>
        <div className="absolute top-4 right-4">
          {currentUser?.id === userId ? (
            <RiEditFill
              size={24}
              onClick={editModal.onOpen}
              className="cursor-pointer"
            />
          ) : (
            <Button
              onClick={toggleFollow}
              label={isFollowing ? "Unfollow" : "Follow"}
              secondary={!isFollowing}
              outline={isFollowing}
            />
          )}
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4 p-4">
        <div className="col-span-5 grid grid-cols-3">
          <div className="flex flex-col">
            <p>Friends ({fetchedUser?.friendIds?.length || 0})</p>
            <div className="flex mb-5 -space-x-4">
              {fetchedUser?.friendIds?.slice(-4).map((friendId: any) => (
                <Avatar key={friendId} userId={friendId} hasBorder />
              ))}
            </div>
          </div>
          <div className="flex flex-col">
            <p>Following ({fetchedUser?.followingIds?.length || 0})</p>
            <div className="flex mb-5 -space-x-4">
              {fetchedUser?.followingIds?.slice(-4).map((friendId: any) => (
                <Avatar key={friendId} userId={friendId} hasBorder />
              ))}
            </div>
          </div>
          <div className="flex flex-col">
            <p>Followers ({fetchedUser?.followerIds?.length || 0})</p>
            <div className="flex mb-5 -space-x-4">
              {fetchedUser?.followerIds?.slice(-4).map((friendId: any) => (
                <Avatar key={friendId} userId={friendId} hasBorder />
              ))}
            </div>
          </div>
          <div className="col-span-3 grid grid-cols-3 gap-10">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <p className="text">Win/Losses</p>
                <p>0/0</p>
              </div>
              <div className="flex flex-col gap-2">
                <p>GamePayy Rank</p>
                <p>-</p>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <p>Points</p>
                <p>0</p>
              </div>
              <div className="flex flex-col gap-2">
                <p>Mathces Played</p>
                <p>0</p>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <p>Earnings</p>
                <p>0 $</p>
              </div>
              <div className="flex flex-col gap-2">
                <p>Registered</p>
                <p>{createdAt}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-7">
          <div className="flex border-b border-gray-300">
            <TabSelector
              isActive={selectedTab === "individual"}
              onClick={() => setSelectedTab("individual")}
            >
              Individual Medals
            </TabSelector>
            <TabSelector
              isActive={selectedTab === "team"}
              onClick={() => setSelectedTab("team")}
            >
              Team Medals
            </TabSelector>
            <TabSelector
              isActive={selectedTab === "wager"}
              onClick={() => setSelectedTab("wager")}
            >
              Wager Medals
            </TabSelector>
          </div>
          <div className="p-4">
            <TabPanel hidden={selectedTab !== "individual"}>
              Coming Soon
            </TabPanel>
            <TabPanel hidden={selectedTab !== "team"}>Coming Soon</TabPanel>
            <TabPanel hidden={selectedTab !== "wager"}>Coming Soon</TabPanel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHero;
