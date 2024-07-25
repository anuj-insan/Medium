import { BlogContent } from "../components/BlogContent";
import { SingleBlogSkeleton } from '../components/BlogSkeleton';
import { useBlog } from "../hooks"
import { useParams } from "react-router-dom";



export const Blog = () => {

    const { id } = useParams();
    const {loading, blog} = useBlog({id});
    if(loading) {
        return <div>
            <div className="flex justify-center">
                <div className="grid grid-cols-12 gap-8 px-10 w-full pt-200 max-w-screen-xl pt-12">
                    <div className="col-span-8 ">
                        <SingleBlogSkeleton/>
                        <SingleBlogSkeleton/>
                        <SingleBlogSkeleton/>
                        <SingleBlogSkeleton/>
                        <SingleBlogSkeleton/>
                        <SingleBlogSkeleton/>
                        <SingleBlogSkeleton/>
                    <div className="col-span-4">
                        <SingleBlogSkeleton/>
                        <SingleBlogSkeleton/>
                    </div>
                </div>
            </div>
        </div>
    </div>
    }
    return (
        <>
            <div>
                <BlogContent authorName={blog.author.name} title={blog?.title} content={blog?.content} publishedDate="22 Feb 2004"/>
            </div>
        </>
    )
}