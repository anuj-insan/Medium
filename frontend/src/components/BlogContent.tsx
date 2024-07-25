import { Appbar } from "./Appbar"
import { Avatar } from "./BlogCard"


interface BlogContentProps {
    authorName: string,
    title: string,
    content: string,
    publishedDate: string,
}

export const BlogContent = ({authorName, title, content, publishedDate}: BlogContentProps) => {
    return (
        <>
            <Appbar />
            <div className="flex justify-center">
                <div className="grid grid-cols-12 gap-8 px-10 w-full pt-200 max-w-screen-xl pt-12">
                    <div className="col-span-8 ">
                        <div className="text-5xl font-extrabold">
                            {title}
                        </div>
                        <div className="mt-4 text-slate-500 text-xs">
                            Posted on {publishedDate}
                        </div>
                        <div className="mt-10">
                            {content}
                        </div>
                    </div>
                    <div className="col-span-4">
                        Author
                        <div className="flex pt-4 justify-between">
                            <div className="pt-6">
                                <Avatar name={authorName}/>
                            </div>
                            <div className="ml-5">
                                <div className="text-2xl font-bold">
                                    {authorName}
                                </div>
                                <div className="text-sm text-slate-500">
                                    My name is author so please read my blog you will feel good after reading my blog
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}