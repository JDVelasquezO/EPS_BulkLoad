import connPromise from '../config/conn.js';
import queryUserBulk from '../functions/bulkLoad/userBulk.js';
import queryCleanUser from '../functions/bulkLoad/cleanData.js';
import queryDeleteDataUser from '../functions/bulkLoad/deleteData.js';
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

        console.log(`Usuarios insertados en temporal: ${rows[rows.length -1].affectedRows}`);
        res.json({
            error: null,
            results: rows.length ? {
                "Usuarios insertados en temporal": rows[rows.length -1].affectedRows,
            } : null,
        });

        // await conn.close();
    } catch (e) {
        console.error("Error al cargar usuarios a tabla temporal ", e);
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

        console.log(`Usuarios insertados sin duplicacion: ${rows[2].affectedRows}`);
        console.log(`Usuarios con correo electronico generado: ${rows[6].affectedRows}`);
        res.json({
            error: null,
            results: rows.length ? {
                "Usuarios insertados sin duplicacion": rows[2].affectedRows,
                "Usuarios con correo electronico generado:": rows[6].affectedRows,
            } : null,
        });

        // await conn.close();
    } catch (e) {
        console.error("Error al limpiar usuarios ", e);
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

        console.log(`Usuarios eliminados: ${rows[rows.length -1].affectedRows}`);
        res.json({
            error: null,
            results: rows.length ? rows[rows.length -1 ]: null,
        });

        // await conn.close();
    } catch (e) {
        console.error("Error al eliminar datos ", e);
        res.status(500).json({
            error: e,
            msg: "Error al eliminar datos"
        });
    }
}

export default controller;