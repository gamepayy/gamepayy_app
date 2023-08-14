import BlogFeed from '@/components/blog/BlogFeed';
import groq from 'groq';
import { client } from '@/sanity/lib/client';

type Props = {
  posts: Post[];
};

const BlogPage = ({ posts }: Props) => {
  return (
    <div className="text-white col-span-12">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold">Blog</h2>
      </div>
      <BlogFeed posts={posts} />
    </div>
  );
};

export default BlogPage;

export async function getStaticProps() {
  const query = groq`
	*[_type == "post"] {
		...,
		author->,
		categories[]->
	} | order(_createdAt desc)
`;
  const posts = await client.fetch(query);

  return {
    props: {
      posts,
    },
  };
}
