import usePosts from "@/hooks/usePosts";

import PostItem from "./PostItem";
import Form from "../Form";

interface PostFeedProps {
  userId?: string;
}

const PostFeed: React.FC<PostFeedProps> = ({ userId }) => {
  const { data: posts = [] } = usePosts(userId);

  if (!posts.length) {
    return (
      <div className="flex flex-col gap-10 w-full justify-center items-center text-gray-500">
        No Posts yet!
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10 w-full">
      {posts.map((post: Record<string, any>) => (
        <PostItem userId={userId} key={post.id} data={post} />
      ))}
    </div>
  );
};

export default PostFeed;
