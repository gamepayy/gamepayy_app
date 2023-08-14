import Link from 'next/link';
import { AiOutlineEye } from 'react-icons/ai';
import Image from 'next/image';
import urlFor from '@/sanity/lib/image';

interface Props {
  post: Post;
}

const BlogCard = ({ post }: Props) => {
  return (
    <div className="rounded-xl border-2 border-gray-100 cursor-pointer hover:bg-neutral-800 hover:opacity-95">
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
    </div>
  );
};

export default BlogCard;
