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
    <div className="col-span-12">
      <div>
        <Image
          alt={post?.author?.name}
          src={urlFor(post.mainImage).url()}
          className="h-full w-full col-span-3"
          width={1200}
          height={1200}
        />
      </div>

      <div className="flex items-center justify-center w-full">
        <div className="w-3/4">
          <div className="flex flex-row gap-2 mt-5 ">
            {post.categories.map((category) => (
              <div
                className="border border-primary text-center text-white p-2 rounded-3xl text-[14px] font-semibold"
                key={category._id}
              >
                <p>{category.title}</p>
              </div>
            ))}
          </div>

          <article className="text-white">
            <h1 className="my-10 font-semibold text-sm md:text-4xl">
              {post.title}
            </h1>
            <PortableText value={post.body} components={RichTextComponents} />

            <div className="my-10">
              <p className="text-neutral-500 font-semibold text-sm">
                {new Date(post._createdAt).toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>

              <p className="text-[#71ef71] text-sm font-bold italic">
                {post.author.name}
              </p>
            </div>
          </article>
        </div>
      </div>
    </div>
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
    paths: paths.map((slug: string) => ({ params: { slug } })),
    fallback: false,
  };
}

export async function getStaticProps(context: Context) {
  const { slug = '' } = context.params;
  const post = await client.fetch(query, { slug });

  return {
    props: {
      post,
    },
  };
}
export default Post;
