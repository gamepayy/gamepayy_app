import mockdata from '@/db/mockdata.json';

import BlogCard from '@/components/blog/BlogCard';

const BlogFeed = () => {
    return ( 
        <div className='flex flex-col gap-10 w-full'>
            {mockdata.map((data, index) => (
                <BlogCard 
                    key={index}
                    title={data.title}
                    link={data.link}
                    subtitle={data.subtitle}
                    description={data.description}
                    views={data.post_views}
                    author={data.author}
                />
            ))}
        </div>
     );
}
 
export default BlogFeed;