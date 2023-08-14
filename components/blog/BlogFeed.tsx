import BlogCard from '@/components/blog/BlogCard';

type Props = {
  posts: Post[];
};

const BlogFeed = ({ posts }: Props) => {
  return (
    <div className="flex flex-col gap-10 w-full">
      {posts.map((item) => (
        <BlogCard post={item} key={item._id} />
      ))}
    </div>
  );
};

export default BlogFeed;
