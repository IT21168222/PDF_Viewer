import express from 'express';
import { check } from 'express-validator';
import { registerUser, loginUser, refreshToken, logoutUser } from '../controllers/auth.controller.js';
import auth from '../middlewares/authMiddleware.js';

const userRouter = express.Router();


// Validation middleware
const validateUserRegistration = [
    check('username').isLength({ min: 5 }).withMessage('Username must be at least 5 characters long'),
    check('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
];

// Register endpoint
userRouter.post('/register', validateUserRegistration, registerUser);

// Login endpoint
userRouter.post('/login', loginUser);

// Token refresh endpoint
userRouter.post('/token', refreshToken);

// Logout endpoint
userRouter.post('/logout', logoutUser);

userRouter.get('/protected', auth, (req, res) => {
    res.send('This is a protected route');
});



export default userRouter;