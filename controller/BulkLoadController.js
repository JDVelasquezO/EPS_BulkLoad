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
        // console.log(rows);

        if (!Array.isArray(rows)) {
            console.error("Respuesta inesperada con: ", rows);
            throw new Error("Formato de respuesta inesperado ");
        }

        res.json({
            error: null,
            results: rows.length ? {
                "Usuarios insertados en temporal": rows[rows.length -1].affectedRows,
            } : null,
        });
    } catch (e) {
        console.log("Error al cargar usuarios a tabla temporal ", e);
        res.status(500).json({
            error: e,
            msg: "Error al cargar usuarios a tabla temporal"
        });
    }
}

controller.cleanUsers = async (req, res) => {
    try {
        const conn = await connPromise;

        const [rows] = await conn.query(queryCleanUser);

        if (!Array.isArray(rows)) {
            console.error("Respuesta inesperada con: ", rows);
            throw new Error("Formato de respuesta inesperado ");
        }

        res.json({
            error: null,
            results: rows.length ? {
                "Usuarios insertados sin duplicacion": rows[2].affectedRows,
                "Usuarios con correo electronico generado:": rows[6].affectedRows,
            } : null,
        });
    } catch (e) {
        console.log("Error al limpiar usuarios ", e);
        res.status(500).json({
            error: e,
            msg: "Error al limpiar usuarios"
        });
    }
}

controller.deleteDataUser = async (req, res) => {
    try {
        const conn = await connPromise;

        const [rows] = await conn.query(queryDeleteDataUser);
        // console.log(rows);

        if (!Array.isArray(rows)) {
            console.error("Respuesta inesperada con: ", rows);
            throw new Error("Formato de respuesta inesperado ");
        }

        res.json({
            error: null,
            results: rows.length ? rows[rows.length -1 ]: null,
        });
    } catch (e) {
        console.log("Error al eliminar datos ", e);
        res.status(500).json({
            error: e,
            msg: "Error al eliminar datos"
        });
    }
}

module.exports = controller;