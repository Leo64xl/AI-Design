import rateLimit from 'express-rate-limit';

export const loginLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 10,
    message: 'Demasiados intentos de inicio de sesión, intenta de nuevo más tarde.',
    standardHeaders: true,
    legacyHeaders: false,
});