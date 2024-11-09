"use client"
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { EditBlogContent } from "./EditBlogContent";

export const EditBlog = () => {
    const query = useSearchParams();
    const id = query.get("id") as string;

    if (!id) {
        return <div>Error: Missing blog ID.</div>;
    }

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <EditBlogContent id={id as string} />
        </Suspense>
    );
};
