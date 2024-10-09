"use client";

import React, { useEffect, useState } from 'react';
import { getUser } from '@/server/actions/user';
import { blogTypes, userTypes } from '@/server/types';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { getBlogsByUser } from '@/server/actions/blogs';
import Appbar from '@/components/Appbar';

const Profile = () => {
    const [user, setUser] = useState<userTypes | null>(null);
    const [blogs, setBlogs] = useState<blogTypes[] | null>(null);
    const [loading, setLoading] = useState(true);
    const { data: session, status } = useSession();

    const userId = session?.user.id;

    useEffect(() => {
        const getData = async () => {
            try {
                if (!userId) return;

                const res = await getUser(userId);
                const blogRes = await getBlogsByUser(userId);

                if (res?.success) {
                    setUser(res.user as userTypes || null);
                }

                if (blogRes?.success) {
                    setBlogs(blogRes.blogs || null);
                }
            } catch (error) {
                console.error("Error fetching data", error);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            getData();
        }
    }, [userId]);

    if (loading || status === "loading") {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (status === "unauthenticated") {
        return (
            <div className="flex justify-center items-center h-screen">
                Not authenticated, Please <Link href="/login" className="text-blue-500 underline ml-1">sign in</Link>
            </div>
        );
    }

    return (
        <div>
            <Appbar />
            <div className="max-w-4xl mx-auto mt-10 p-6 bg-zinc-50 rounded-lg shadow-md text-neutral-900">
                <div className="flex items-center space-x-4">
                    {user?.image ? (
                        <img
                            src={user.image}
                            alt={`${user.name}'s profile picture`}
                            width={80}
                            height={80}
                            className="rounded-full"
                        />
                    ) : (
                        <div className='flex justify-center items-center rounded-full bg-zinc-300 h-[80px] w-[80px]'>
                            <span>{user?.name[0].toUpperCase()}</span>
                        </div>
                    )}
                    <div>
                        <h1 className="text-3xl font-semibold text-neutral-800">{user?.name}</h1>
                        <p className="text-neutral-600">{user?.email}</p>
                    </div>
                </div>
                <div className='flex justify-end'>
                    <Link href="/edit/blog" className="bg-green-500 text-white p-2 rounded-md text-sm">
                        Edit Profile
                    </Link>
                </div>
                <div className="mt-8">
                    <h2 className="text-2xl font-semibold text-neutral-800">Your Blogs</h2>
                    {blogs && blogs.length > 0 ? (
                        <ul className="mt-4 space-y-4">
                            {blogs.map((blog) => (
                                <li key={blog.id} className="border-b pb-2 border-neutral-300 flex justify-between items-center">
                                    <Link href={`/blog?id=${blog.id}`} className="text-lg font-semibold text-neutral-700 hover:underline">
                                        {blog.title}
                                    </Link>
                                    <Link href={`/edit/blog?id=${blog.id}`} className="bg-blue-500 text-white p-1 rounded text-xs">
                                        Edit
                                    </Link>
                                    <p className="text-sm text-neutral-500">Published on {new Date(blog.createdAt?.toDateString() || "N/A").toLocaleDateString()}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="mt-4 text-neutral-500">You haven&apos;t posted any blogs yet.</p>
                    )}
                </div>
            </div>
        </div>

    );
};

export default Profile;
