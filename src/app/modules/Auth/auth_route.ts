import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth_validation';
import { AuthController } from './auth.controller';
import { UserController } from '../User/user_controller';


const router = express.Router();

router.post('/login', validateRequest(AuthValidation.loginValidationSchema), AuthController.loginUser)

router.post('/register', validateRequest(AuthValidation.registerVlidationSchema), UserController.createUser)

export const AuthRoutes = router;