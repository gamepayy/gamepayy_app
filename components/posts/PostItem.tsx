import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";
import { formatDistanceToNowStrict } from "date-fns";

import useLoginModal from "@/hooks/useLoginModal";
import useCurrentUser from "@/hooks/useCurrentUser";
import useLike from "@/hooks/useLike";
import Linkify from "linkify-react";

import Avatar from "../ui/avatar";
import { RiDiscussFill, RiHeart3Fill } from "react-icons/ri";
interface PostItemProps {
  data: Record<string, any>;
  userId?: string;
  currentUser?: Record<string, any>;
}

const PostItem: React.FC<PostItemProps> = ({ data = {}, userId }) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();
  const { hasLiked, toggleLike } = useLike({ postId: data.id, userId });
  const goToUser = useCallback(
    (ev: any) => {
      ev.stopPropagation();
      router.push(`/users/${data.user?.id}`);
    },
    [router, data.user?.id]
  );

  const goToPost = useCallback(() => {
    router.push(`/posts/${data.id}`);
  }, [router, data.id]);

  const onLike = useCallback(
    async (ev: any) => {
      ev.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }

      toggleLike();
    },
    [loginModal, currentUser, toggleLike]
  );

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data.createdAt]);

  const options = {
    defaultProtocol: "https",
    target: "_blank",
  };

  return (
    <div
      className="flex flex-col gap-4 p-4 border-b-[1px] 
    border-neutral-800  
    cursor-pointer 
    hover:bg-neutral-900 
    transition"
      onClick={goToPost}
    >
      <div className="flex justify-between items-center text-white">
        <div className="flex items-center gap-4">
          <div className="flex gap-4 items-center">
            <div className="flex gap-1 items-center">
              <Avatar userId={data.user?.id} />
              <p
                onClick={goToUser}
                className="text-white 
                font-semibold 
                cursor-pointer 
                hover:underline"
              >
                {data.user?.username ?? data.user?.email}
              </p>
            </div>
            <p>{createdAt} ago</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <RiHeart3Fill
            className={hasLiked ? "text-secondary" : ""}
            size={20}
            onClick={onLike}
          />
          {data.likedIds?.length}

          <RiDiscussFill size={20} />
          {data.comments?.length || 0}
        </div>
      </div>
      <Linkify as="p" options={options} className="text-white post-link">
        {data.body}
      </Linkify>
    </div>
  );
};

export default PostItem;
