import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import { publicRequest } from "../lib/requestMethod";
import "react-quill/dist/quill.snow.css"



const Blog = () => {
    const blogId = useLocation().pathname.split("/")[2];
    const [blog, setBlog] = useState({});
    useEffect(() => {
        const getBlog = async () => {
            try {
                const res = await publicRequest.get(`/blog/find/${blogId}`);
                setBlog(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        getBlog();
    }, [blogId])
    return (
        <div className="p-2">
            <h1 className="text-4xl font-bold">{blog.Title}</h1>
            <img className="w-full mt-4 mb-4 h-96 object-cover" src={blog.Thumbnail} alt="" />
            <div className="text-lg p-2 border border-spacing-1" dangerouslySetInnerHTML={{ __html: blog.Content }} />

            <br />
            <h3>Categories:</h3>
            <div className="flex">
                {blog.Categories && blog.Categories.split(",").map((c, index) => (
                    <p key={index} className="p-2 bg-gray-200 m-1">{c}</p>
                ))
                }
            </div>
        </div>
    )
}

export default Blog