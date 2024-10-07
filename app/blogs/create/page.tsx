"use client";

import Appbar from '@/components/Appbar';
import { useSession } from 'next-auth/react';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Link from 'next/link';
import { setBlog } from '@/server/actions/blogs';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

type BlogFormData = {
    title: string;
    description: string;
    imageLink?: string;
};

const BlogInput: React.FC = () => {
    const { data: session, status } = useSession();
    const { register, handleSubmit, formState: { errors } } = useForm<BlogFormData>();
    const router = useRouter()

    if (status === "unauthenticated") {
        return (
            <div className='flex justify-center items-center h-screen'>
                Not authenticated, Please <Link href={"/login"} className="text-blue-500 underline ml-1">sign in</Link>
            </div>
        );
    }


    const userId = session?.user.id;

    const onSubmit: SubmitHandler<BlogFormData> = async (data) => {

        const { title, description, imageLink } = data

        if (!imageLink) {
            const res = await setBlog({
                title,
                description,
                userId: userId as string
            })

            if (!res.success) return;

            toast({
                title: "Created succesfully!",
                duration: 4000
            })

            router.push("/blogs")
            return;

        }

        const res = await setBlog({
            title,
            description,
            image: imageLink,
            userId: userId as string
        })

        if (!res.success) return;

        toast({
            title: "Created succesfully!",
            duration: 4000
        })

        router.push("/blogs")
        return;


    };


    return (
        <div>
            <Appbar />
            <div className="h-screen grid grid-cols-1 lg:grid-cols-2">

                <div className="bg-zinc-900 text-white flex justify-center items-center">
                    <p className="text-xl font-medium p-6 text-center">
                        "Share your thoughts and stories with the world."
                    </p>
                </div>

                <div className="flex flex-col justify-center items-center p-6 bg-white">
                    <h2 className="text-lg font-semibold mb-4 text-black">Create Blog Post</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 w-full max-w-sm">

                        <input
                            id="title"
                            placeholder="Blog Title"
                            className="border border-zinc-300 p-2 rounded focus:outline-none focus:border-zinc-500"
                            {...register('title', { required: 'Title is required' })}
                        />
                        {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}

                        <textarea
                            id="description"
                            placeholder="Blog Description"
                            className="border border-zinc-300 p-2 rounded focus:outline-none focus:border-zinc-500 h-32 resize-none"
                            {...register('description', { required: 'Description is required' })}
                        />
                        {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}

                        <input
                            id="imageLink"
                            type="text"
                            placeholder="Image URL (Optional)"
                            className="border border-zinc-300 p-2 rounded focus:outline-none focus:border-zinc-500"
                            {...register('imageLink')}
                        />

                        <button type="submit" className="bg-black text-white py-2 rounded mt-4">Submit Blog</button>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default BlogInput;
