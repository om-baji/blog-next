    "use client";
    import { BlogComponentPage } from "@/components/BlogComps/BlogComponentPage";
    import { Suspense, FC } from "react";

    const Blog: FC = () => {
        return (
            <Suspense fallback={<div>Loading...</div>}>
                <BlogComponentPage />
            </Suspense>
        );
    };

    export { Blog };
