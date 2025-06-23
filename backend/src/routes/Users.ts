import express from 'express';
import { 
    getUsers, 
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from '../controllers/Users';
import { verifyUser } from '../middlewares/Authentication';
import { RequestHandler } from 'express';

const router = express.Router();

// asyncHandler tipado correctamente
function asyncHandler(fn: (...args: any[]) => Promise<any>): RequestHandler {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}

// Se puede usar asyncHandler para middlewares async y controladores async
router.get('/users', asyncHandler(verifyUser), asyncHandler(getUsers));
router.get('/users/:id', asyncHandler(verifyUser), asyncHandler(getUserById));
router.post('/users', asyncHandler(createUser));
router.put('/users/:id', asyncHandler(verifyUser), asyncHandler(updateUser));
router.delete('/users/:id', asyncHandler(verifyUser), asyncHandler(deleteUser));

export default router;