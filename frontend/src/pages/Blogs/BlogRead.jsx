import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { fetchOneBlog, deleteBlog, updateBlog } from "../../services/api";
import { useAuthContext } from "../../hooks/useAuth";
import { useBlogContext } from "../../hooks/useBlog";
import { useFormContext } from "../../hooks/useForm";
import BlogForm from "../../components/Blog/BlogForm";

const BlogRead = () => {
  const { id } = useParams();
  const { dispatch } = useBlogContext();
  const { user } = useAuthContext();
  const [blog, setBlog] = useState({})
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { setForm } = useFormContext();
  const { formDiv, setFormDiv } = useFormContext();

  const handleEdit = async (id) => {
    setFormDiv(true)
    setForm(blog)
  }

  const handleUpdateBlog = async (id, formData) => {
    try {
      const response = await updateBlog(id, formData, user.accessToken);
      dispatch({ type: 'UPDATE_BLOG', payload: { id: response.data.data._id, data: response.data.data } })
    } catch (error) {
      console.error("Error creating blog: ", error);
    }
  }

  const handleDelete = async (id) => {
    const response = await deleteBlog(id, user.accessToken)
    dispatch({ type: 'REMOVE_BLOG', payload: { id: response.data.data._id } })
    navigate(-1)
  }

  const handleBack = (e) => {
    e.preventDefault();
    navigate(-1)
    setFormDiv(false)
  }

  useEffect(() => {
    const getOneBlog = async () => {
      try {
        const response = await fetchOneBlog(id);
        setBlog(response.data.data); // Set the blog data
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false); // Data fetching is complete
      }
    };
    getOneBlog();
  }, [id, handleUpdateBlog]); // Make sure to re-fetch when `id` changes and handleUpdateBlog function call

  if (loading) {
    return (
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-700">Loading...</h2>
      </div>
    );
  }

  // If the blog is still not loaded or data is incomplete, handle it gracefully
  if (!blog || !blog.postedBy) {
    return (
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-700">Blog not found</h2>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-xl">
      {/* Profile Image and Blog Title */}
      <div className="flex flex-col items-center mb-6">
        <div className="h-24 w-24 mb-4 flex justify-center items-center rounded-full overflow-hidden border-4 border-gray-300">
          <img
            src={blog.postedBy.profileImage.imageUrl}
            alt="profile-img"
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="font-bold text-4xl text-gray-900 font-mono text-center">{blog.title}</h1>
      </div>

      {/* Blog Description */}
      <p className="text-justify text-xl text-gray-700 mt-2 mb-6 leading-relaxed">{blog.desc}</p>

      {user?.user._id === blog.postedBy._id && <div className="flex justify-between">

        <button className="bg-blue-500 text-white font-semibold px-3 rounded hover:bg-blue-600" onClick={() => handleEdit(blog._id)}>Edit</button>

        <button className="bg-red-500 text-white font-semibold px-3 rounded hover:bg-red-600" onClick={() => handleDelete(blog._id)}>Delete</button>
      </div>}

      {/* Back Button */}
      <button onClick={handleBack} className="flex items-center text-blue-700 hover:text-blue-500 transition duration-200 font-semibold text-lg mt-2">
        Back
      </button>

      {/* Blog Form Section */}
      {formDiv && (
        <div className="mt-10">
          <BlogForm onSubmitBlog={{ handleUpdateBlog }} />
        </div>
      )}
    </div>

  )
}

export default BlogRead
