import { createBlog } from '../../services/api';
import { useBlogContext } from '../../hooks/useBlog';
import { useAuthContext } from '../../hooks/useAuth';
import Blog from '../../components/Blog/Blog';
import { useFormContext } from '../../hooks/useForm';
import BlogForm from '../../components/Blog/BlogForm';
import { useState } from 'react';

const Home = () => {
    const { formDiv, setFormDiv } = useFormContext();
    const { dispatch } = useBlogContext();
    const { user } = useAuthContext();
    const [createBtn, setCreateBtn] = useState(true);
    const [uploading, seUploading] = useState(false);

    const handleCreateBtn = (e) => {
        e.preventDefault();
        setCreateBtn(false)
        setFormDiv(!formDiv)
    }

    const handleCreateBlog = async (formData) => {
        seUploading(true)
        try {
            const response = await createBlog(formData, user.accessToken);
            dispatch({ type: 'ADD_BLOG', payload: response.data.data })
            setFormDiv(false)
            seUploading(false)
            setCreateBtn(true)
        } catch (error) {
            console.error("Error creating blog: ", error);
        }
    }

    return (
        <div className='mx-auto p-6'>
            {/* Create Post Section */}
            {!formDiv && <button
                className="bg-blue-950 text-white py-2 rounded-lg shadow-md hover:bg-blue-800 transition duration-200 ease-in-out transform hover:scale-105 w-full md:w-32 font-semibold mx-auto"
                onClick={handleCreateBtn}
            >
                Create Post
            </button>}

            {uploading && <div>uploading...</div>}

            {formDiv && (
                <div className="mt-10">
                    <BlogForm onSubmitBlog={{ handleCreateBlog }} />
                </div>
            )}

            <Blog />
        </div>
    )
}

export default Home
