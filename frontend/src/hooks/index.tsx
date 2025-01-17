import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

interface Blog {
    content: string,
    title: string,
    id: string,
    author: {
        name: string
    }
}

export const useBlog = ({id}: {id: any}) => {
    const [loading, setLoading] = useState(true);

    const [blog, setBlog] = useState<Blog>({
        content: "",
        title: "",
        id: "",
        author: {
            name: ""
    }
    });
    const token = localStorage.getItem('token');

    useEffect( () => {
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })
        .then(response => {
            setBlog(response.data.blog);
            setLoading(false)
        })
        .catch(error => {
            console.error('Error fetching blog:', error);
            setLoading(false);
        });
    }, [id, token])
    

    return {
        loading,
        blog
    }
}

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);

    const [blogs, setBlogs] = useState<Blog[]>([]);

    const token = localStorage.getItem('token');

    useEffect( () => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })

        .then(response => {
            setBlogs(response.data.blogs);
            setLoading(false)
        })
        .catch(error => {
            console.error('Error fetching blogs:', error);
            setLoading(false);
        });
    }, [token])
    

    return {
        loading,
        blogs
    }
}