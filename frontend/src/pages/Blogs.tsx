import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from '../hooks/index';

export const Blogs = () => {

    const {loading, blogs} = useBlogs();
    if(loading) {
        return <div>
            <BlogSkeleton/>
            <BlogSkeleton/>
            <BlogSkeleton/>
            <BlogSkeleton/>
            <BlogSkeleton/>
            <BlogSkeleton/>
            <BlogSkeleton/>
        </div>
    }

    return (
        <>
            <Appbar />
            <div className="flex justify-center">
                <div className=" flex flex-col">
                    <div className="-mt-10">
                        {blogs.map(blog => {
                            return <BlogCard id={blog.id} authorName={blog.author.name} title={blog.title} content={blog.content} publishedDate={"2 feb 2024"} />
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}