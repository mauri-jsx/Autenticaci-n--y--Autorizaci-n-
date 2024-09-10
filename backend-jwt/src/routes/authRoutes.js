import { Register, Login, Logout } from '../controllers/authControllers.js';
import { verifyToken } from '../middlewares/jwtMiddlewares.js';
import { Router } from 'express';

const router = Router();

router.post('/register', Register);
router.post('/login', Login);
router.post('/logout', Logout);
router.get('/protected', verifyToken, (req, res) => {
    res.status(200).json({ message: 'Acceso autorizado a la ruta protegida', userId: req.userId });
});

export { router };
