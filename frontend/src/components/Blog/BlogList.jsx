import { useBlogContext } from "../../hooks/useBlog";
import BlogItem from "./BlogItem";
import { useEffect } from "react";
import { fetchBlogs } from "../../services/api";

const BlogList = () => {
  const {blogs, dispatch} = useBlogContext();

  useEffect(() => {
    const getAllBlogs = async () => {
      const response = await fetchBlogs();
      dispatch({type: 'SET_BLOGS', payload: response.data.data})
    }
    getAllBlogs();
  }, [])

  return (
    <div className="flex gap-4 flex-wrap mt-4 md:p-2 items-start">
      {blogs && blogs.map((blog) => (
        <BlogItem key={blog._id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;