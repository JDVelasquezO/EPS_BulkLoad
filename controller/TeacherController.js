const connPromise = require('../config/conn');
const queryMigrateTeacher = require('../functions/teacher/migrateTeacher');

const controller = {};

controller.migrateTeacher = async (req, res) => {
    try {
        const conn = await connPromise;
        const [rows] = await conn.query(queryMigrateTeacher);
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
        console.error("Error al migrar profesores ", e);
        res.status(500).json({
            error: e,
            msg: "Error al migrar profesores"
        });
    }
}

module.exports = controller;