import express from 'express';
import { Register, Login, Session, Logout } from '../controllers/auth.controllers.js';

const router = express.Router();

router.post('/register', Register);
router.post('/login', Login);
router.get('/session', Session);
router.post('/logout', Logout);

export { router };
