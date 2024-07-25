import { NavLink, useNavigate } from "react-router-dom"
import { Avatar } from "./BlogCard"

export const Appbar = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="flex justify-between px-10 pt-2 border-b shadow-sm mb-10">
                <NavLink to="/blogs">
                    <div className="font-medium text-lg cursor-pointer">
                        Medium
                    </div>
                </NavLink>
                <div className="">
                    <button type="button" onClick={() => {
                        navigate("/publish")
                    }} className="text-white bg-gradient-to-br from-green-300 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded text-sm px-2 py-1 text-center me-3  mb-1">New Blog</button>

                    <button type="button" onClick={() => {
                        localStorage.clear();
                        navigate("/signin")
                    }} className="text-white bg-red-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded text-sm px-2 py-1 text-center me-7  mb-1">logout</button>
                    <Avatar name="Anuj"/>
                </div>
            </div>
        </>
    )
}