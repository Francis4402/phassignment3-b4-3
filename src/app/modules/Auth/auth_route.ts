import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthController } from './auth.controller';
import { UserController } from '../User/user_controller';
import { UserValidation } from '../User/user_validation';


const router = express.Router();

router.post('/login', validateRequest(UserValidation.userValidationSchema), AuthController.loginUser)

router.post('/register', validateRequest(UserValidation.userValidationSchema), UserController.createUser)

export const AuthRoutes = router;