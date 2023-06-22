import usePosts from "@/hooks/usePosts";

import PostItem from "./PostItem";
import Form from "../Form";

interface PostFeedProps {
  userId?: string;
}

const PostFeed: React.FC<PostFeedProps> = ({ userId }) => {
  const { data: posts = [] } = usePosts(userId);

  return (
    <div className="flex flex-col gap-10 w-full">
      {posts.map((post: Record<string, any>) => (
        <PostItem userId={userId} key={post.id} data={post} />
      ))}
    </div>
  );
};

export default PostFeed;
