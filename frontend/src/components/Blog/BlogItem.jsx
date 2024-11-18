import { useAuthContext } from "../../hooks/useAuth";
import { Link } from "react-router-dom"
import { formatDistanceToNow } from 'date-fns';

const BlogItem = ({ blog }) => {
    const { user } = useAuthContext();

    return (
        <div className="border border-gray-500 w-full md:w-[40%] p-4 rounded-xl bg-gray-50 hover:shadow-xl transition-shadow duration-300 md:mx-auto h-28">

            {/* User and Profile Image */}
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors duration-200">{blog.title}</h1>
                <div className="flex items-center gap-1">
                    <div className="h-8 w-8 flex justify-center items-center rounded-full border-2 border-gray-500 overflow-hidden">
                        <img
                            src={blog.postedBy?.profileImage.imageUrl}
                            alt="profile-img"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <span className="text-md font-semibold text-gray-700">
                        {user?.user?._id === blog.postedBy?._id ? "You" : blog.postedBy?.username}
                    </span>
                </div>
            </div>
            <div className="flex justify-between items-center mt-2 flex-wrap">
                <p className="font-semibold">
                    {blog.desc.length <= 20 ? blog.desc : blog.desc.slice(0, 20) + '.....'}
                </p>

                {blog.desc.length > 20 && <Link
                    to={`/blog-read/${blog._id}`}
                    className=" text-blue-600 font-semibold text-md"
                >
                    Learn More
                </Link>}
            </div>
            <p className="text-gray-500">posted {formatDistanceToNow(new Date(blog.createdAt), {addSuffix: true})}</p>
        </div>
    );
};

export default BlogItem;