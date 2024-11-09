    "use client";
    import { BlogComponentPage } from "@/components/BlogComps/BlogComponentPage";
    import { Suspense } from "react";

    const Blog = () => {
        return (
            <Suspense fallback={<div>Loading...</div>}>
                <BlogComponentPage />
            </Suspense>
        );
    };

    export default Blog;
