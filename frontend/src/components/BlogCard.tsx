import { NavLink } from "react-router-dom"

interface BlogCardProps {
    id: string,
    authorName: string,
    title: string,
    content: string,
    publishedDate: string,
}

export const Avatar = ({name}: {name: string}) => {
    return (
        <>
            <div className={`relative inline-flex items-center justify-center w-5 h-5 overflow-hidden bg-gray-300 rounded-full dark:bg-gray-600`}>
                <span className="font-medium text-gray-800 dark:text-gray-300">{name[0]}</span>
            </div>
        </>
    )
}

export const BlogCard = ({id, authorName, title, content, publishedDate}: BlogCardProps) => {
    return (
        <>
            <NavLink to={`/blog/${id}`}>
                <div className="border-b-2 pb-5 w-screen max-w-screen-sm mt-10">
                    <div className="flex">
                        <div className="flex justify-center flex-col">
                            {<Avatar name={authorName} />}
                        </div>
                        <div className="pl-1 text-sm font-extralight flex justify-center flex-col">
                            {authorName}
                        </div>
                        <div className="pl-2 -mt-1">
                            .
                        </div>
                        <div className="pl-2 text-xs font-thin text-slate-400 flex justify-center flex-col">
                            {publishedDate}
                        </div>
                    </div>
                    <div className="text-2xl pt-2 font-semibold">
                        {title}
                    </div>
                    <div className="text-md pt-2 font-normal">
                        {content.length > 100 ? content.slice(0, 200) + "..." : content}
                    </div>
                    <div className="text-xs pt-8 font-extralight">
                        {`${Math.ceil(content.length / 100)} minutes`}
                    </div>
                </div>
            </NavLink>
        </>
    )
}

