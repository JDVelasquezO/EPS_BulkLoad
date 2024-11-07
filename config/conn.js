const mysql = require("mysql2");
const fs = require("fs");
require("dotenv").config();

let conn = mysql.createConnection({
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

conn.connect(function (err) {
    if (err) {
        console.error(err);
        throw err;
    }
});

module.exports = conn;