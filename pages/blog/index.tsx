import BlogFeed from '@/components/blog/BlogFeed';
import groq from 'groq';
import { client } from '@/sanity/lib/client';

const BlogPage = ({ posts }) => {
  console.log(posts);

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

export async function getStaticProps() {
  const posts = await client.fetch(groq`
      *[_type == "post" && _id in path("drafts.**") == false] | order(publishedAt desc)
    `);
  console.log(posts);

  return {
    props: {
      posts,
    },
  };
}
