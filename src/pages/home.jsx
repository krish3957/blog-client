import "react-quill/dist/quill.snow.css";
import { Button } from "../components/ui/button";
import { Category } from "../components/category";
import { Link } from "react-router-dom";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { categories } from "../lib/categories";
import { useEffect, useState } from "react";
import { publicRequest } from "../lib/requestMethod";

const Home = () => {
    const [cat, setCat] = useState("");
    const [blog, setBlog] = useState([]);
    useEffect(() => {
        const getBlog = async () => {
            try {
                if (!cat) {
                    const res = await publicRequest.get(`/blog/0`);
                    setBlog(res.data);
                }
                else {
                    const res = await publicRequest.get(`/blog/category/${cat}`);
                    setBlog(res.data);
                }
            } catch (err) {
                console.log(err);
            }
        }
        getBlog();
    }, [cat])
    return (
        <div className="p-2">
            <div className="flex w-full justify-between items-center">
                <ScrollArea className="w-3/4 whitespace-nowrap rounded-md border">
                    <div className="flex">
                        {
                            categories.map((cat, index) => (
                                <Button
                                    variant='secondary'
                                    className="bg-slate-100 text-black mr-2"
                                    key={index}
                                    onClick={() => {
                                        setCat(cat.value);
                                    }}
                                >
                                    <Button variant='secondary' className="bg-slate-100 text-black mr-2">
                                        {cat.name}
                                    </Button>
                                </Button>
                            ))
                        }
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
                <Link to='/new'>
                    <Button>
                        Create New Blog
                    </Button>
                </Link>
            </div>
            <div className="p-2 flex flex-wrap">
                {blog.length ? blog.map((b, index) => (
                    <div key={index} className="basis-1/4">
                        <Link to={`/blog/${b.idBlog}`} key={index}>
                            <div className="aspect-square items-center justify-center">
                                <img src={b.Thumbnail} alt="" className="w-full h-[40vh]" />
                                <h2 className='font-bold text-lg'>{b.Title}</h2>
                            </div>
                        </Link>
                    </div>
                )) : <h2>No Blogs Found</h2>
                }
            </div>
        </div>
    )
}

export default Home