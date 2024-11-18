import { useEffect, useState } from "react";
import Profile from "../../components/Auth/Profile"
import { useAuthContext } from "../../hooks/useAuth";
import { deleteBlog, fetchBlogs } from "../../services/api";
import { Link } from "react-router-dom";
import { useBlogContext } from "../../hooks/useBlog";
import { formatDistanceToNow } from 'date-fns';

const ProfilePage = () => {
  const { user } = useAuthContext();
  const [blogs, setBlogs] = useState([]);
  const { dispatch } = useBlogContext();

  const handleDelete = async (id) => {
    const response = await deleteBlog(id, user.accessToken)
    dispatch({ type: 'REMOVE_BLOG', payload: { id: response.data.data._id } })
  }

  useEffect(() => {
    const getAllBlogs = async () => {
      const response = await fetchBlogs();
      setBlogs(response.data.data)
    }
    getAllBlogs();
  }, [handleDelete])

  return (
    <div className="md:flex items-start">
      <Profile />
      <div className="flex flex-col gap-4 md:w-[60%] md:h-[93.5vh] md:m-5">
        {blogs && blogs.map((blog) => (
          user.user._id === blog.postedBy._id && <div key={blog._id} className="p-2 border border-gray-500 bg-gray-50 rounded-xl hover:shadow-xl transition-shadow duration-300 mt-3 md:w-full md:mt-0">
            <h1>{blog.title}</h1>
            <hr className="border-t-1 border-gray-500 w-[70%]" />
            <p className="font-semibold mt-2">
              {blog.desc.length <= 30 ? blog.desc : blog.desc.slice(0, 30) + '.....'}
            </p>
            <p className="text-gray-500">posted {formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true })}</p>
            <div className="flex justify-between mt-1">
              <button className="hover:text-red-500 text-red-700 font-semibold" onClick={() => handleDelete(blog._id)}>Delete</button>
              <Link to={`/blog-read/${blog._id}`} className="text-blue-700 hover:text-blue-500 font-semibold">View</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProfilePage
