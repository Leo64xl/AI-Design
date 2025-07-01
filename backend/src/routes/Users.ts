import express from 'express';
import { 
    getUsers, 
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from '../controllers/users/Users';
import { verifyUser } from '../middlewares/auth/Authentication';
import { registerLimiter } from '../middlewares/limiters/RegisterLimiter';
import { RequestHandler } from 'express';

const router = express.Router();

function asyncHandler(fn: (...args: any[]) => Promise<any>): RequestHandler {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}

router.post('/users', registerLimiter, asyncHandler(createUser));
router.get('/users', asyncHandler(verifyUser), asyncHandler(getUsers));
router.get('/users/:id', asyncHandler(verifyUser), asyncHandler(getUserById));
router.put('/users/:id', asyncHandler(verifyUser), asyncHandler(updateUser));
router.delete('/users/:id', asyncHandler(verifyUser), asyncHandler(deleteUser));

export default router;