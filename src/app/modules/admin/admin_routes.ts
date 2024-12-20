import express from 'express';
import { AdminController } from './admin_controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { BlogValidation } from '../blogs/blog_validation';

const router = express.Router();

router.patch('/users/:id/block', auth(USER_ROLE.user), AdminController.updateUserBlocked);

router.delete('/blogs/:id', auth(USER_ROLE.user), validateRequest(BlogValidation.blogValidationSchema), AdminController.deleteBlog);

export const AdminRoutes = router;