import mysql from 'mysql2/promise';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

function validateEnvVars() {
    const required = ["DB_HOST", "DB_USER", "DB_PASSWORD", "DB_NAME"];
    const missing = required.filter(v => !(v in process.env));
    if (missing.length) {
        throw new Error(`Faltan variables de entorno: ${missing.join(", ")}`);
    }
}

const connPromise = (async () => {
    try {
        validateEnvVars();

        const connection = await mysql.createConnection({
            multipleStatements: true,
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            flags: ['+LOCAL_FILES'],
            infileStreamFactory: (fileName) => fs.createReadStream(fileName),
        });

        console.log("Conexión MySQL establecida.");
        return connection;

    } catch (err) {
        console.error("Error al establecer la conexión MySQL:", err.message);
        throw err;
    }
})();

export default connPromise;