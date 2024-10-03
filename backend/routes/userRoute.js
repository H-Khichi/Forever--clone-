import express from 'express';
import { loginUser, signupUser, adminLogin } from '../controllers/userController.js';

const userRoutes = express.Router();

userRoutes.post('/login', loginUser);
userRoutes.post('/signup', signupUser);
userRoutes.post('/admin', adminLogin);

export default userRoutes;
