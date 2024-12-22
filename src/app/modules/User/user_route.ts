import express from 'express';
import { UserController } from './user_controller';
import { UserValidation } from './user_validation';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from './user.constant';
import auth from '../../middlewares/auth';


const router = express.Router();

router.get('/', auth([USER_ROLE.admin]), validateRequest(UserValidation.userValidationSchema), UserController.getUsers);

export const UserRoutes = router;