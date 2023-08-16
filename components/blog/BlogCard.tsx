import Link from 'next/link';
import { AiOutlineEye } from 'react-icons/ai';
import Image from 'next/image';
import urlFor from '@/sanity/lib/image';

interface Props {
  post: Post;
}

const BlogCard = ({ post }: Props) => {
  const numberOfColums = post.title.length;
  return (
    <div>
      <Link href={`blog/${post.slug.current}`} className="hover:bg-gray-500">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <article className="relative overflow-hidden rounded-lg shadow transition hover:shadow-lg">
              <Image
                alt={post.author.name}
                src={urlFor(post.mainImage).url()}
                className="absolute  h-full w-full object-cover"
                width={1200}
                height={1200}
              />

              <div className="relative pt-32 sm:pt-48 lg:pt-64">
                <div
                  className="p-4 sm:p-6 relative"
                  style={{ backgroundColor: 'rgba(14, 14, 14, 0.6)'}}
                >
                  <div
                    className="mt-0.5 text-3xl font-semibold text-white hover:underline hover:cursor-pointer"
                  >
                    {post.title}
                  </div>

                  <div className="flex flex-row gap-2 mt-5">
                    {post.categories.map((category) => (
                      <div
                        className="border border-primary text-center text-white p-2 rounded-3xl text-[14px] font-semibold"
                        key={category._id}
                      >
                        <p>{category.title}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BlogCard;

{
  /* <div className="rounded-xl border-2 border-gray-100 cursor-pointer hover:bg-neutral-800 hover:opacity-95">
<Image
  className=""
  src={urlFor(post.mainImage).url()}
  alt={post.author.name}
  width={300}
  height={300}
/>
<div className="flex flex-col items-start p-8">
  <div className="flex justify-between w-full font-bold text-3xl">
    <Link href={`blog/${post.slug.current}`} className="hover:underline">
      {post.title}
    </Link>

    <div className="flex flex-row gap-1">
      {post.categories.map((category) => (
        <div
          className="bg-primary text-center text-gray-900 p-3 rounded-lg text-sm font-semibold]"
          key={category._id}
        >
          <p>{category.title}</p>
        </div>
      ))}
    </div>
  </div>

  <p className="text-neutral-500 font-semibold text-sm">
    {new Date(post._createdAt).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })}
  </p>

  <div className="flex mt-4">
    <p className="text-white font-medium text-xl">{post.title}</p>
  </div>
</div>

<p className="text-[#71ef71] flex justify-end text-sm m-2 font-bold italic">
  {post.author.name}
</p>
</div> */
}
