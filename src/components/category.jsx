import { useEffect, useState } from 'react'
import { publicRequest } from '../lib/requestMethod';
import { CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Link } from 'react-router-dom';

export function CarouselSpacing(props) {
    return (
        <Carousel className="w-[95vw]">
            <CarouselContent>
                {props.data.map((b, index) => (
                    <CarouselItem key={index} className="pl-1 h-[50vh] md:basis-1/2 lg:basis-1/4">
                        <Link to={`/blog/${b.idBlog}`} key={index}>
                            <div>
                                <div>
                                    <CardContent className="aspect-square items-center justify-center">
                                        <img src={b.Thumbnail} alt="" className="w-full h-[40vh]" />
                                        <h2 className='font-bold text-lg'>{b.Title}</h2>
                                    </CardContent>
                                </div>
                            </div>
                        </Link>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}
export const Category = (cat) => {
    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
        console.log(cat.cat);
        const getBlog = async () => {
            try {
                const res = await publicRequest.get(`/blog/category/${cat.cat}`);
                setBlogs(res.data.slice(0, 5));
            } catch (err) {
                console.log(err);
            }
        }
        getBlog();

    }, [cat.cat])
    if (!blogs.length) return <h2>No Blogs Found</h2>
    return (
        <div className='flex w-full'>
            <CarouselSpacing data={blogs} />
        </div>
    )
}

