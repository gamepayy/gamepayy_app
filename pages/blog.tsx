import BlogFeed from '@/components/blog/BlogFeed';


const BlogPage = () => {
  return (
    <div className="text-white col-span-12">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold">Blog</h2>
      </div>
      <BlogFeed />
    </div>
  );
};

export default BlogPage;
