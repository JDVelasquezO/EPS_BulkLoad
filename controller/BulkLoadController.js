const connPromise = require("../config/conn");
const queryUserBulk = require("../functions/bulkLoad/userBulk");
const queryCleanUser = require("../functions/bulkLoad/cleanData");
const queryDeleteDataUser = require("../functions/bulkLoad/deleteData");
const controller = {};

controller.bulkLoadUsers = async (req, res) => {
    try {
        const conn = await connPromise;

        await conn.query("SET GLOBAL local_infile = 1;");

        const [rows] = await conn.query(queryUserBulk);
        console.log(rows);

        if (!Array.isArray(rows)) {
            console.error("Respuesta inesperada con: ", rows);
            throw new Error("Formato de respuesta inesperado ");
        }

        res.json({
            error: null,
            results: rows.length ? rows[rows.length -1] : null,
        });
    } catch (e) {
        console.log("Error al cargar usuarios a tabla temporal ", e);
        res.status(500).json({
            error: e,
            msg: "Error al cargar usuarios"
        });
    }
}

controller.cleanUsers = async (req, res) => {
    try {
        const conn = await connPromise;

        await conn.query(queryCleanUser, (err, data) => {
            res.json({
                error: err,
                results: data
            })
        })
    } catch (e) {
        console.log(e);
    }
}

controller.deleteDataUser = async (req, res) => {
    try {
        const conn = await connPromise;

        const [rows] = await conn.query(queryDeleteDataUser);
        console.log(rows);

        if (!Array.isArray(rows)) {
            console.error("Respuesta inesperada con: ", rows);
            throw new Error("Formato de respuesta inesperado ");
        }

        res.json({
            error: null,
            results: rows.length ? rows[rows.length -1 ] : null,
        });
    } catch (e) {
        console.log(e);
    }
}

module.exports = controller;