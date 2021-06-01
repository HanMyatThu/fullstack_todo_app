import {
    Register,
    userLogin,
    userLogout,
    checkUserExists,
    refreshToken
} from '../controllers/UserController';
import express from 'express';
import authMiddleware from '../middleware/auth';

const router = express.Router();


//public routes
router.post('/auth/checkUser', checkUserExists);

router.post('/auth/register', Register);

router.post('/auth/login', userLogin);

router.post('/auth/logout', userLogout);

//private routes
router.post('/auth/refreshToken',authMiddleware, refreshToken);

export default router;