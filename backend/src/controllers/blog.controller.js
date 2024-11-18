import { asyncHandler } from "../utils/asyncHandler.js"
import { Blog } from "../models/blog.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { deleteCloudinary, uploadCloudinary } from "../utils/cloudinary.js";

// get all blogs
const getAllBlogs = asyncHandler(
    async (req, res) => {
        const blogs = await Blog.find({})
            .populate('postedBy', 'username email profileImage')
            .sort({ createdAt: -1 })
        return res.status(201).json(
            new ApiResponse(200, blogs)
        )
    }
)

// get one blog
const getOneBlog = asyncHandler(
    async (req, res) => {
        const id = req.params.id;

            const blog = await Blog.findById(id).populate('postedBy', 'username email profileImage');
            
            if (!blog) {
                throw new ApiError(404, "Blog not found");
            }

            return res.status(200).json(new ApiResponse(200, blog, "success"));
    }
)

// create blog
const createBlog = asyncHandler(
    async (req, res) => {
        const { title, desc } = req.body
        const userId = req.user._id;

        if (!(title || desc)) {
            throw new ApiError(400, "All fields are required")
        }

        const blog = await Blog.create({
            title,
            desc,
            postedBy: userId
        })

        const newBlog = await Blog.findById(blog._id).populate('postedBy', 'username email profileImage')

        return res.status(201).json(
            new ApiResponse(200, newBlog, "Blog created successfully")
        )
    }
)

// update blog
const updateBlog = asyncHandler(
    async (req, res) => {
        const id = req.params.id;
        const { title, desc } = req.body;

        // Validate input
        if (!title && !desc) {
            throw new ApiError(400, "At least one of title or desc is required");
        }

        const updatedFields = {};
        if (title) updatedFields.title = title;
        if (desc) updatedFields.desc = desc;

        const blog = await Blog.findById(id);
        if (!blog) {
            throw new ApiError(404, "Blog not found");
        }

        const updatedBlog = await Blog.findByIdAndUpdate(id, { $set: updatedFields }, { new: true }).populate('postedBy', 'username email profileImage');

        return res.status(200).json(new ApiResponse(200, updatedBlog, "Blog updated successfully"));
    }
)

// delete blog
const deleteBlog = asyncHandler(
    async (req, res) => {
        const id = req.params.id

        // Find the blog by ID and Delete
        const blog = await Blog.findByIdAndDelete(id)

        // Check if the blog exists
        if (!blog) {
            throw new ApiError(404, "blog not found")
        }
        
        return res
            .status(200)
            .json(
                new ApiResponse(200, blog, "Blog deleted successfully")
            )
    }
)

export { getAllBlogs, createBlog, updateBlog, deleteBlog, getOneBlog }
