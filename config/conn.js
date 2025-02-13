const mysql = require("mysql2/promise");
const fs = require("fs");
require("dotenv").config();

async function createConnection() {
    return mysql.createConnection({
        multipleStatements: true,
        connectionLimit: 150,
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        flags: ['+LOCAL_FILES'],
        infileStreamFactory: (fileName) => {
            return fs.createReadStream(fileName);
        }
    });
}

const connPromise = createConnection();
module.exports = connPromise;
