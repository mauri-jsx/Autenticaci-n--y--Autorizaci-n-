import { connectorDB } from "../db/database.js";
import bcrypt from 'bcryptjs';

export const Register = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: 'Username y password es requerido' });
        }
        const db = await connectorDB();
        const [existingUser] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
        if (existingUser.length > 0) {
            return res.status(409).json({ message: 'El usuario ya existe' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        await db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);
        res.status(201).json({ message: 'el usario fue creado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

export const Login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: 'El nombre de usuario y la contraseña son obligatorios' });
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
        res.status(200).json({ message: 'Inicio de sesión exitoso', user: { username: user[0].username } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ocurrió un error durante el inicio de sesión' });
    }
};
