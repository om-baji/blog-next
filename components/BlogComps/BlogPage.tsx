'use client'

import Appbar from '@/components/Appbar';
import { Button } from "@/components/ui/button";
import { getBlog } from '@/server/actions/blogs';
import { getUser } from '@/server/actions/user';
import { blogTypes, userTypes } from '@/server/types';
import { Loader2 } from "lucide-react";
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export const BlogContent = ({ id } : {
    id : string
}) => {
    const { status } = useSession();
    const [blog, setBlog] = useState<blogTypes | null>(null);
    const [user, setUser] = useState<userTypes | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            if (id) {
                const data = await getBlog(id as string);

                if (!data.success) {
                    setBlog(null);
                } else {
                    setBlog(data.blog || null);
                }

                const userData = await getUser(data?.blog?.userId as string);

                if (!userData.success) {
                    setUser(null);
                } else {
                    setUser(userData.user as userTypes || null);
                }

                setLoading(false);
            }
        };

        getData();
    }, [id, status]);

    if (status === "unauthenticated") {
        return (
            <div className='flex justify-center items-center h-screen bg-zinc-100 text-neutral-700'>
                Not authenticated, Please <Link href={"/login"} className="text-neutral-500 underline ml-1">sign in</Link>
            </div>
        );
    }

    if (loading) {
        return (
            <div className='flex justify-center items-center h-screen bg-zinc-100 text-neutral-700'>
                <Button disabled className="flex items-center space-x-2 bg-neutral-500 text-zinc-50 px-6 py-3 rounded-lg">
                    <Loader2 className="h-6 w-6 animate-spin" />
                    <span>Loading...</span>
                </Button>
            </div>
        );
    }

    if (!blog) {
        return <div className='flex justify-center items-center h-screen bg-zinc-100 text-neutral-700'>Blog not found.</div>;
    }

    return (
        <div className="bg-zinc-100 text-neutral-700 min-h-screen">
            <Appbar />
            <div className="grid grid-cols-1 lg:grid-cols-[70%_30%]">
                <div className="p-6 lg:p-12 space-y-8">
                    <h1 className="text-4xl font-bold text-neutral-800">{blog.title}</h1>
                    <div className="flex flex-col lg:flex-row gap-3 text-neutral-500 text-sm lg:text-base">
                        <span>Posted on: {blog.createdAt?.toDateString()}</span>
                        <span>Last Modified: {blog.updatedAt?.toDateString()}</span>
                    </div>
                    {blog.image && (
                        <div className="w-full mb-6">
                            <img src={blog.image} alt="Blog" className="rounded-xl shadow-xl w-full object-cover" />
                        </div>
                    )}
                    <div className="text-lg text-neutral-600 leading-loose">
                        <p>{blog.description}</p>
                    </div>
                </div>

                <div className="p-6 lg:p-12 space-y-8 bg-neutral-200 rounded-l-lg h-full">
                    {user ? (
                        <div className="text-center space-y-4">
                            <span className='text-2xl font-semibold'>Author : </span>
                            {user.image ? (
                                <img src={user.image} alt={user.name} className="w-24 h-24 rounded-full mx-auto shadow-lg" />
                            ) : (
                                <div className="w-24 h-24 rounded-full bg-neutral-400 flex items-center justify-center mx-auto">
                                    <span className="text-3xl font-semibold text-neutral-700">{user.name?.charAt(0).toUpperCase()}</span>
                                </div>
                            )}
                            <h2 className="text-2xl font-semibold text-neutral-700">{user.name}</h2>
                            <p className="text-neutral-500">{user.email}</p>
                        </div>
                    ) : (
                        <p className="text-neutral-500">Author information not available.</p>
                    )}

                    <blockquote className="text-lg italic text-neutral-600 text-center">
                    &quot;Creativity is intelligence having fun.&quot;
                    </blockquote>

                    <div className="bg-gradient-to-r from-neutral-600 to-neutral-800 text-zinc-50 p-6 rounded-xl shadow-xl text-center">
                        <h3 className="text-xl font-bold">User Feedback!</h3>
                        <p className="text-base">Your valuable feedback will help us improve our application.</p>
                        <button className="mt-4 bg-zinc-50 text-neutral-900 px-4 py-2 rounded-lg">Learn More</button>
                    </div>
                </div>
            </div>
        </div>
    );
};


