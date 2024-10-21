const mysql = require("mysql");

let conn = mysql.createConnection({
    multipleStatements: true,
    connectionLimit: 150,
    host: "localhost",
    user: "root",
    password: null,
    database: "dev_deppa",
});

conn.connect(function (err) {
    if (err) {
        console.error(err);
        throw err;
    }
});

module.exports = conn;