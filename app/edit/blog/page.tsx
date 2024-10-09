"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Appbar from "@/components/Appbar";
import { updateBlog, getBlogById } from "@/server/actions/blogs";
import { updateBlogTypes } from "@/server/types";
import { toast } from "@/hooks/use-toast";

const EditBlog = () => {
    const query = useSearchParams();
    const router = useRouter();
    const id = query.get("id") as string;
    const [blog, setBlog] = useState<updateBlogTypes | null>(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            if (!id) {
                toast({ title: "Blog ID is missing!" });
                setLoading(false);
                return;
            }

            try {
                const data = await getBlogById(id);
                if (data.success && data.blog) {
                    setBlog(data.blog);
                    setTitle(data.blog.title || "");
                    setDescription(data.blog.description || "");
                    setImage(data.blog.image || null);
                } else {
                    throw new Error("Blog not found");
                }
            } catch (error) {
                console.error("Error fetching blog:", error);
                toast({ title: "Failed to fetch blog" });
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await updateBlog({ id, title, description, image });
        if (result.success) {
            toast({
                title: "Edited successfully!",
                description: blog?.title,
            });

            router.push("/profile");
        } else {
            toast({
                title: "Edit failed!",
            });
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-zinc-100 text-zinc-900">
            <Appbar />
            <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold text-zinc-800 mb-8">Edit Blog</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block text-base font-medium text-zinc-700">Title</label>
                        <input
                            placeholder="Title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="mt-2 block w-full p-3 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-zinc-400"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-base font-medium text-zinc-700">Description</label>
                        <textarea
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="mt-2 block w-full p-3 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-zinc-400"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-base font-medium text-zinc-700">Image URL</label>
                        <input
                            placeholder="Image"
                            type="text"
                            value={image || ""}
                            onChange={(e) => setImage(e.target.value)}
                            className="mt-2 block w-full p-3 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-zinc-400"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-zinc-800 text-white p-3 rounded-md w-full text-lg hover:bg-zinc-700 transition-colors"
                    >
                        Update Blog
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditBlog;
