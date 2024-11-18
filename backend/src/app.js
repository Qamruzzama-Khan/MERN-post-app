import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Error } from "./middlewares/error.js";

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
})) 

app.use(express.json())
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

// routes import 
import blogRoutes from './routes/blog.route.js'
import userRoutes from './routes/user.route.js'

// routes declaration
app.use("/api/v1/blogs", blogRoutes)
app.use("/api/v1/auth", userRoutes)

// Middleware for Errors
app.use(Error);

export { app }