import "react-quill/dist/quill.snow.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { categories } from "../lib/categories";
import { publicRequest } from "../lib/requestMethod";

import { X, Search, Heart } from "lucide-react";
import { Fade, Slide } from "react-awesome-reveal";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

const Home = () => {
    const [cat, setCat] = useState("");
    const [blog, setBlog] = useState([]);
    const [search, setSearch] = useState("");
    useEffect(() => {
        const getBlog = async () => {
            try {
                const res = await publicRequest.get(`/blog/0?search=${search}&cat=${cat}`);
                setBlog(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        getBlog();
    }, [cat, search])
    return (
        <div className="p-2">
            <Slide>
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
                    <div className="flex align-center items-center w-1/4 m-2">
                        <Input
                            value={search}
                            className="border-r-0 mr-2" placeholder="Search Blogs"
                            onChange={(e) => {
                                setSearch(e.target.value);
                            }}
                        />
                        {search && <X onClick={() => setSearch("")} />}
                        <Search />
                    </div>
                    <Link to='/new'>
                        <Button>
                            Create New Blog
                        </Button>
                    </Link>
                </div>
            </Slide>
            <Fade>
                <div className="p-2 flex flex-wrap">
                    {blog.length ? blog.map((b, index) => (
                        <div key={index} className="p-2 md:basis-1/2 lg:basis-1/4 hover:scale-105  hover:bg-slate-100 transition-transform">
                            <Link to={`/blog/${b.idBlog}`} key={index}>
                                <div className="aspect-square items-center justify-center">
                                    <img src={b.Thumbnail} alt="" className="w-full h-[40vh]" />
                                    <div className='flex w-full justify-between'>
                                        <h2 className='font-bold text-lg'>{b.Title}</h2>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <Button variant='transperant'>
                                                        <Heart />
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Add to Library</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <span className="w-full flex justify-between">
                                        <p><strong>Writer:</strong> {b.username} </p>
                                        <p>{b.createdAt.split('T')[0]}</p>
                                    </span>
                                </div>
                            </Link>
                        </div>
                    )) : <h2>No Blogs Found</h2>
                    }
                </div>
            </Fade>
        </div>
    )
}

export default Home