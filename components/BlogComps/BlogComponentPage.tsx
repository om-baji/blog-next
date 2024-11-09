import { useSearchParams } from "next/navigation";
import { BlogContent } from "./BlogPage";

export const BlogComponentPage = () => {
    const params = useSearchParams();
    const id = params.get("id");

    if (!id) {
        return <div>Error: Missing blog ID.</div>;
    }

    return (
        <>
            <BlogContent id={id as string} />
        </>
    );
};

