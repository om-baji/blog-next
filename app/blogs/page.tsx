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
    const [searchTerm, setSearchTerm] = useState("");
    const router = useRouter();
    
    useEffect(() => {
        const fetchBlogs = async () => {
            if (status === "authenticated" && session?.user?.id) {
                const data = await getBlogsAll();
                if (data?.success && data.blogs) {
                    setBlogs(data.blogs); 
                } else {
                    setBlogs([]); 
                }
                setLoading(false);
            }
        };

        fetchBlogs();
    }, [status, session?.user?.id]);

    const truncateDescription = (description: string) => {
        const words = description.split(' ');
        return words.length > 70 ? words.slice(0, 70).join(' ') + '...' : description;
    };

    const filteredBlogs = blogs.filter((blog) =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
            <div className="p-6 max-w-6xl mx-auto">
                <input
                    type="text"
                    placeholder="Search blogs"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {loading ? (
                    <div className="flex justify-center items-center h-screen">Loading blogs...</div>
                ) : filteredBlogs.length > 0 ? (
                    filteredBlogs.map((blog) => (
                        <div 
                            onClick={() => router.push(`/blog?id=${blog.id}`)}
                            key={blog.id} 
                            className="p-6 mb-6 bg-white shadow-md hover:shadow-lg rounded-lg transition-shadow duration-300 cursor-pointer"
                        >
                            <h3 className="text-2xl font-semibold mb-3">{blog.title}</h3>
                            <p className="text-gray-700 text-lg">
                                {truncateDescription(blog.description)}
                            </p>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-gray-600">No blogs available</div>
                )}
                
                <Link href={"/blogs/create"}
                    className='fixed bottom-10 right-10 p-4 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-all transform hover:scale-110'>
                    + Create
                </Link>
            </div>
        </div>
    );
};

export default BlogPage;
