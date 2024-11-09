import { Suspense } from 'react'
import { EditBlog } from '@/components/EditBlogComps/EditPage'

const FinalEditBlog = () => {
    return (
        <Suspense
            fallback={
                <div>
                    Loading...
                </div>
            } >
            <EditBlog />
        </Suspense>
    )
}

export default FinalEditBlog
