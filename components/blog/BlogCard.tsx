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
