import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import { publicRequest } from "../lib/requestMethod";
import "react-quill/dist/quill.snow.css"
import { Separator } from "../components/ui/separator"
import "react-quill/dist/quill.core.css";

const Blog = () => {
    const blogId = useLocation().pathname.split("/")[2];
    const [blog, setBlog] = useState({});
    useEffect(() => {
        const getBlog = async () => {
            try {
                const res = await publicRequest.get(`/blog/find/${blogId}`);
                setBlog(res.data);
                console.log(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        getBlog();
    }, [blogId])
    return (
        <div className="pt-10 pl-2 pr-2 lg:pl-80 lg:pr-80">
            <Separator />
            <h1 className="mb-4 mt-4 text-4xl font-bold text-center">{blog.Title}</h1>
            <Separator />
            <img className="w-full mt-4 mb-4 h-96 object-cove" src={blog.Thumbnail} alt="" />
            <div className="flex justify-center">
                <div className="md:prose-xl lg:prose-2xl ql-editor" dangerouslySetInnerHTML={{ __html: blog.Content }} />
            </div>
            <br />
            <h3>Categories:</h3>
            <div className="flex">
                {blog.Categories && blog.Categories.split(",").map((c, index) => (
                    <p key={index} className="p-2 bg-gray-200 m-1">{c}</p>
                ))}
            </div>
        </div>
    )
}

export default Blog