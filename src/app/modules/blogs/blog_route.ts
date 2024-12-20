import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BlogValidation } from './blog_validation';
import { BlogController } from './blog_controller';

const router = express.Router();

router.post('/', validateRequest(BlogValidation.blogValidationSchema), BlogController.createBlogs);

router.get('/', validateRequest(BlogValidation.blogValidationSchema), BlogController.getAllBlogs);

router.patch('/:id', validateRequest(BlogValidation.blogValidationSchema), BlogController.updateBlog);

router.delete('/:id', validateRequest(BlogValidation.blogValidationSchema), BlogController.deleteBlog);

export const BlogRoutes = router;