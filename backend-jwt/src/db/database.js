// db/database.js
import mysql from 'mysql2/promise';
import config from '../config.js';

export const connectorDB = async () => {
    return await mysql.createConnection({
        host: config.DB_HOST,
        user: config.DB_USER,
        password: config.DB_PASSWORD,
        database: config.DB_NAME,
    });
};
