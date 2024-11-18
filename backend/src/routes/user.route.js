import express, {Router} from "express"
import { signupUser, loginUser, updateUser, getOneUser } from "../controllers/user.controller.js"
import { upload } from '../middlewares/multer.middleware.js';
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// signup route
router.route('/signup').post(
    upload.single('profileImage'),
    signupUser
)

// signup route
router.route('/login').post(loginUser)

// secured routes
// update user
router.route('/update/:id').put(
    verifyJWT, 
    upload.single('profileImage'), 
    updateUser)

// get one user
router.route('/getOne-user/:id').put(verifyJWT, getOneUser)

export default router;