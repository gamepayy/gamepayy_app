import Link from 'next/link';

import { AiOutlineEye } from 'react-icons/ai';

interface BlogCardProp {
  title: string;
  link: string;
  subtitle?: string;
  description: string;
  views: number;
  author: string;
}

const BlogCard: React.FC<BlogCardProp> = ({
  title,
  link,
  subtitle,
  description,
  views,
  author
}) => {
  return (
    <div className="rounded-xl border-2 border-gray-100 cursor-pointer hover:bg-neutral-800 hover:opacity-95">
      <div className="flex flex-col items-start p-8">
        <div className="flex justify-between w-full font-bold text-3xl">
          <Link href={link} className="hover:underline">
            {title}
          </Link>

          <div className="flex flex-row gap-1">
            <span className="text-[#71ef71] text-sm">{views}</span>
            <AiOutlineEye size={20} className="text-[#71ef71]" />
          </div>
        </div>

        <p className="text-neutral-500 font-semibold text-sm">{subtitle}</p>

        <div className="flex mt-4">
          <p className="text-white font-medium text-xl">{description}</p>
        </div>
      </div>

      <p className='text-[#71ef71] flex justify-end text-sm m-2 font-bold italic'>
        {author}
      </p>
      
    </div>
  );
};

export default BlogCard;
