"use client";
import Appbar from '@/components/Appbar';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getBlogsAll } from '@/server/actions/blogs';
import { blogTypes } from '@/server/types';
import { useRouter } from 'next/navigation';

const BlogPage = () => {
    const { data: session, status } = useSession();  
    const [blogs, setBlogs] = useState<blogTypes[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter()
    
    useEffect(() => {
        const fetchBlogs = async () => {
            if (status === "authenticated" && session?.user?.id) {
                const data = await getBlogsAll();
                if (data?.success && data.blogs) {
                    console.log(data.blogs)
                    setBlogs(data.blogs); 
                } else {
                    setBlogs([]); 
                }
                setLoading(false);
            }
        };

        fetchBlogs();
    }, [status, session?.user?.id]);


    if (status === "loading") {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (status === "unauthenticated") {
        return (
            <div className='flex justify-center items-center h-screen'>
                Not authenticated, Please <Link href={"/login"} className="text-blue-500 underline ml-1">sign in</Link>
            </div>
        );
    }

    return (
        <div>
            <Appbar />
            <div className="p-4">
                {loading ? (
                    <div className="flex justify-center items-center h-screen">Loading blogs...</div>
                ) : blogs?.length > 0 ? (
                    blogs.map((blog) => (
                        <div onClick={ () => router.push(`/blog?id=${blog.id}`)}
                        key={blog.id} className="p-4 border-b border-gray-200">
                            <h3 className="text-xl font-bold">{blog.title}</h3>
                            <p className="text-gray-600">{blog.description}</p>
                        </div>
                    ))
                ) : (
                    <div>No blogs available</div>
                )}
            </div>
        </div>
    );
};

export default BlogPage;
