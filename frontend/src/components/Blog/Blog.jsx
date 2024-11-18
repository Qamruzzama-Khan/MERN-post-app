import BlogList from "./BlogList";
import { useBlogContext } from "../../hooks/useBlog";

const Blog = () => {
  const { blogs } = useBlogContext();

  return (
    <div>
    {/* Blog List Section */}
    {blogs && (
        <BlogList />
    )}
  </div>  
  )
}

export default Blog
