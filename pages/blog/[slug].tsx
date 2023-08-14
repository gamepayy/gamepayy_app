import groq from 'groq';
import { PortableText } from '@portabletext/react';
import { client } from '@/sanity/lib/client';
import urlFor from '@/sanity/lib/image';
import Image from 'next/image';
import { RichTextComponents } from '@/components/blog/RichTextComponents';

type Context = {
  params: {
    slug: string;
  };
};

interface Props {
  post: Post;
}

const Post = ({ post }: Props) => {
  return (
    <article className="text-white col-span-12">
      <h1>{post.title}</h1>
      <span>By {post.author.name}</span>
      {post.categories && (
        <ul>
          Posted in
          {post.categories.map((category) => (
            <li key={category._id}>{category.title}</li>
          ))}
        </ul>
      )}
      {post.author.image && (
        <div>
          <Image
            src={urlFor(post.author.image).width(50).url()}
            alt={`${post.author.image}'s picture`}
            width={50}
            height={50}
          />
        </div>
      )}
      <PortableText value={post.body} components={RichTextComponents} />
    </article>
  );
};

const query = groq`
*[_type == "post" && slug.current == $slug][0] {
  ...,
  author->,
  categories[]->,
}
`;

export async function getStaticPaths() {
  const paths = await client.fetch(
    groq`*[_type == "post" && defined(slug.current)][].slug.current`
  );

  return {
    paths: paths.map((slug: any) => ({ params: { slug } })),
    fallback: true,
  };
}

export async function getStaticProps(context: Context) {
  const { slug = '' } = context.params;
  const post = await client.fetch(query, { slug });
  console.log(post);

  return {
    props: {
      post,
    },
  };
}
export default Post;
