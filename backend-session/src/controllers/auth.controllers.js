
import { connectorDB } from '../db/database.js';
import bcrypt from 'bcryptjs';

// Registrar un nuevo usuario
export const Register = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Se requieren tanto el nombre de usuario como la contraseña' });
        }

        const db = await connectorDB();

        // Verificar si el usuario ya existe
        const [existingUser] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
        if (existingUser.length > 0) {
            return res.status(409).json({ message: 'El usuario ya existe' });
        }

        // Encriptar la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insertar el nuevo usuario en la base de datos
        await db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);

        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ocurrió un error durante el registro' });
    }
};

// Iniciar sesión de un usuario
export const Login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Se requieren tanto el nombre de usuario como la contraseña' });
        }

        const db = await connectorDB();

        // Verificar si el usuario existe
        const [user] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
        if (user.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Verificar la contraseña
        const validPassword = await bcrypt.compare(password, user[0].password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        // Guardar el usuario en la sesión
        req.session.user = { id: user[0].id, username: user[0].username };
        res.status(200).json({ message: 'Inicio de sesión exitoso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ocurrió un error durante el inicio de sesión' });
    }
};

// Verificar si la sesión está activa
export const Session = (req, res) => {
    if (req.session.user) {
        res.status(200).json({ message: 'Sesión activa', user: req.session.user });
    } else {
        res.status(401).json({ message: 'No hay una sesión activa' });
    }
};

// Cerrar sesión de un usuario
export const Logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Error al cerrar la sesión' });
        }
        res.status(200).json({ message: 'Sesión cerrada correctamente' });
    });
};
