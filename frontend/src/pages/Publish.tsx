import axios from "axios";
import { Appbar } from "../components/Appbar"
import { ChangeEvent, useState } from "react"
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";


export const Publish = () => {

    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const token = localStorage.getItem('token');

    return (
        <>
            <Appbar />
            <div className="flex justify-center">
                <div className="w-screen max-w-screen-sm ">
                    <div className="border-b">
                        <input onChange={ (e: ChangeEvent<HTMLInputElement>) => {
                            setTitle(e.target.value)
                        } } name="title" className="appearance-none font-serif text-xl  h-16 rounded w-full py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline lg:text-5xl md:text-3xl"  type="text" placeholder="Title"/>
                    </div>
                    <div className="mt-1 border-b">
                        <textarea onChange={ (e: ChangeEvent<HTMLTextAreaElement>) => {
                            setContent(e.target.value)
                        } } rows={15} name="content" className="block p-2.5 border-none font-serif w-full text-sm  lg:text-xl md:text-lg text-gray-900  " placeholder="Write your content..."></textarea>
                    </div>
                    <div className="mt-5">
                        <button type="submit" onClick={ async () => {
                            const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                                title: title,
                                content: content
                            }, {
                                headers: {
                                    'Authorization': `Bearer ${token}`
                                },
                            })
                            const id = response.data.id;
                            navigate(`/blog/${id}`)
                        }} className="text-white bg-gradient-to-br from-green-400 to-blue-300 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-full text-md px-5 py-3 text-center me-7  mb-1">Publish</button>
                    </div>
                </div>
            </div>
        </>
    )
}