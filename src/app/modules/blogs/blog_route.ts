import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BlogValidation } from './blog_validation';
import { BlogController } from './blog_controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.post('/', auth(USER_ROLE.user && USER_ROLE.admin), validateRequest(BlogValidation.blogValidationSchema), BlogController.createBlogs);

router.get('/', auth(USER_ROLE.user && USER_ROLE.admin), validateRequest(BlogValidation.blogValidationSchema), BlogController.getAllBlogs);

router.patch('/:id', auth(USER_ROLE.admin), validateRequest(BlogValidation.blogValidationSchema), BlogController.updateBlog);

router.delete('/:id', auth(USER_ROLE.user && USER_ROLE.admin), validateRequest(BlogValidation.blogValidationSchema), BlogController.deleteBlog);

export const BlogRoutes = router;