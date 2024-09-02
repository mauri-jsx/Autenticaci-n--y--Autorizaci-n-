import { Router } from "express";

const router = Router();

import { Register, Login } from "../controllers/auth.controllers.js";

router.post('/register', Register);
router.post('/login', Login);


export { router }