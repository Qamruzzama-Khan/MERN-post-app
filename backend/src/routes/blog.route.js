import { Router } from 'express'
// import { requireAuth } from '../middleware/requireAuth.js';
import { createBlog, deleteBlog, getAllBlogs, getOneBlog, updateBlog } from '../controllers/blog.controller.js';
import { upload } from '../middlewares/multer.middleware.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

router.route('/get').get(getAllBlogs)

router.route('/getOne-blog/:id').get(getOneBlog)

// secured routes
router.route('/create').post(verifyJWT,
    createBlog
)

router.route('/update/:id').put(verifyJWT,
    upload.single('blogImage'),
    updateBlog
)

router.route('/delete/:id').delete(verifyJWT,deleteBlog)

export default router;