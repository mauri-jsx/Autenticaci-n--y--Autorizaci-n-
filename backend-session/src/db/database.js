import mysql from 'mysql2/promise';

const connectorDB = async () => {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'db_system'
        })
        console.log('Conectado a la base de datos');
        return connection;
        re
    } catch (error) {
        console.log("Error al conectar a la base de datos", error);
        throw error;
    }
}

export { connectorDB }