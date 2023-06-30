import Form from "@/components/Form";
import PostFeed from "@/components/posts/PostFeed";
import UserHero from "@/components/users/UserHero";
import UserStats from "@/components/users/UserStats";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/router";
import React from "react";
import { ClipLoader } from "react-spinners";

const UserView = () => {
  const router = useRouter();
  const { userId } = router.query;

  const { data: fetchedUser, isLoading } = useUser(userId as string);

  if (isLoading || !fetchedUser) {
    return (
      <div className="col-span-12 flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }
  return (
    <div className="col-span-12 text-white h-full">
      <UserHero userId={userId as string} />
      <div className="flex flex-row gap-4 mt-10">
        <UserStats userId={userId as string} />
        <PostFeed userId={userId as string} />
      </div>
    </div>
  );
};

export default UserView;
