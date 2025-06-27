import express from 'express';
import { Login, 
        Logout, 
        Me 
} from '../controllers/Authentication';
import { loginLimiter } from '../middlewares/LoginLimiter'

const router = express.Router();

// Rutas de autenticación
router.get('/me', (req, res, next) => {
    Me(req, res).catch(next);
});

router.post('/login', loginLimiter, (req, res, next) => {
    Login(req, res).catch(next);
});

router.delete('/logout', (req, res, next) => {
    Logout(req, res).catch(next);
});

export default router;