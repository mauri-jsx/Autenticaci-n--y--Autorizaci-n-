// controllers/authController.js
import { connectorDB } from '../db/database.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config.js';

export const Register = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Se requieren tanto el nombre de usuario como la contraseña' });
        }

        const db = await connectorDB();

        const [existingUser] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
        if (existingUser.length > 0) {
            return res.status(409).json({ message: 'El usuario ya existe' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);

        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ocurrió un error durante el registro' });
    }
};

export const Login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Se requieren tanto el nombre de usuario como la contraseña' });
        }

        const db = await connectorDB();

        const [user] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
        if (user.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const validPassword = await bcrypt.compare(password, user[0].password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }


        const token = jwt.sign({ id: user[0].id }, config.SECRET_KEY, { expiresIn: '5h' });

        res.cookie('authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 5 * 60 * 60 * 1000,
            path: '/',
            sameSite: 'Strict',
        });

        res.status(200).json({ message: 'Inicio de sesión exitoso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ocurrió un error durante el inicio de sesión' });
    }
};


export const Logout = (req, res) => {
    res.clearCookie('authToken', { path: '/' });
    res.status(200).json({ message: 'Sesión cerrada correctamente' });
};
