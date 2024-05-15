import { useEffect, useState } from 'react'
import { publicRequest } from '../lib/requestMethod';
import { Separator } from '../components/ui/separator';
import { Link } from 'react-router-dom';
import { Edit2Icon } from 'lucide-react';
import { Button } from '../components/ui/button';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

const Profile = () => {
    const id = window.location.pathname.split("/")[2];
    const [userBlogs, setUserBlogs] = useState([]);
    const [user, setUser] = useState({});
    useEffect(() => {
        publicRequest.get(`/user/find/${id}`).then(res => {
            setUser(res.data);
            console.log(res.data);
        }).catch(err => {
            console.log(err);
        });
        publicRequest.get(`/user/blogs/${id}`).then(res => {
            setUserBlogs(res.data);
            console.log(res.data);
        }).catch(err => {
            console.log(err);
        });
    }, [id]);
    return (
        <div className='w-full flex p-2'>
            <div>
                <h2 className='font-bold text-2xl'>User Info</h2>
                <Separator />
                <p className='text-lg'><strong>Username:</strong> {user.username}</p>
                <p className='text-lg'><strong>Email:</strong> {user.email}</p>
                <div className="flex flex-wrap">
                    <h2 className='font-bold text-xl w-[50vw] p-2'>User Blogs</h2>
                    <Separator />
                    {
                        userBlogs.map((b, index) => (
                            <div key={index} className="p-2 md:basis-1/2 lg:basis-1/4 hover:scale-105  hover:bg-slate-100 transition-transform">
                                <Link to={`/blog/${b.idBlog}`} key={index}>
                                    <div className="aspect-square items-center justify-center">
                                        <img src={b.Thumbnail} alt="" className="w-full h-[40vh]" />
                                        <div className='flex w-full justify-between'>
                                            <h2 className='font-bold text-lg'>{b.Title}</h2>
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger>
                                                        <Link to={`/edit/${b.idBlog}`}>
                                                            <Button variant='transperant'>
                                                                <Edit2Icon />
                                                            </Button>
                                                        </Link>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>Edit</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Profile