'use client'

import { blogTypes } from '@/server/types';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { getBlog } from '@/server/actions/blogs';
import Appbar from '@/components/Appbar';

const Blog = () => {
    const { data: session, status } = useSession();
    const params = useSearchParams();
    const [blog, setBlog] = useState<blogTypes | null>(null);
    const [loading, setLoading] = useState(true);
    const id = params.get("id");

    if (status === "unauthenticated") {
        return (
            <div className='flex justify-center items-center h-screen'>
                Not authenticated, Please <Link href={"/login"} className="text-blue-500 underline ml-1">sign in</Link>
            </div>
        );
    }

    useEffect(() => {
        const getData = async () => {
            if (id) {
                const data = await getBlog(id as string);
                if (!data.success) {
                    setBlog(null);
                } else {
                    setBlog(data.blog || null);
                }
                setLoading(false);
            }
        };

        getData();
    }, [id]);

    if (loading) {
        return <div className='flex justify-center items-center h-screen'>Loading...</div>;
    }

    if (!blog) {
        return <div className='flex justify-center items-center h-screen'>Blog not found.</div>;
    }

    return (
        <div>
            <Appbar/>
            <h1 className='text-3xl font-bold'>{blog.title}</h1>
            <p className='mt-2'>{blog.description}</p>
            {blog.image && <img src={blog.image} alt={blog.title} className='mt-4' />}
        </div>
    );
};

export default Blog;
