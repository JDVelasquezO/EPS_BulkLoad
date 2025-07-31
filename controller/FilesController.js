import connPromise from '../config/conn.js';
import queryMigrateFiles from '../functions/files/migrateFiles.js';

const controller = {};

controller.migrateFiles = async (req, res) => {
    try {
        const conn = await connPromise;
        const [rows] = await conn.query(queryMigrateFiles);
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
        console.error("Error al migrar expedientes ", e);
        res.status(500).json({
            error: e,
            msg: "Error al migrar expedientes"
        });
    }
}

export default controller;