const connPromise = require("../config/conn");
const queryCreatePersonal = require("../functions/personal/createPersonal");
const fs = require("fs");
const path = require('path');

const controller = {};

controller.insertPersonal = async (req, res) => {
    try {
        const conn = await connPromise;

        const [rows] = await conn.query(queryCreatePersonal);
        if (!Array.isArray(rows)) {
            console.error("Respuesta inesperada con: ", rows);
            throw new Error("Formato de respuesta inesperado ");
        }

        const relativePath = '../res/personal_202502101232-0304.sql';
        const filePath = path.resolve(__dirname, relativePath);
        let queryInsertPersonal = fs.readFileSync(filePath, 'utf8');
        queryInsertPersonal = queryInsertPersonal.replace(/\bpublic\./g, 'dev_deppa.');
        if (!fs.existsSync(filePath)) {
            throw new Error(`Archivo no encontrado: ${filePath}`);
        }

        const [result] = await conn.query(queryInsertPersonal);
        if (!Array.isArray(result)) {
            console.error("Respuesta inesperada con: ", result);
            throw new Error("Formato de respuesta inesperado ");
        }

        res.json({
            error: null,
            results: result.length ? {
                "Usuarios insertados en tabla personal": result,
            } : null,
        });

        await conn.close();
    } catch (e) {
        console.error("Error al cargar usuarios a tabla personal ", e);
        res.status(500).json({
            msg: "Error al cargar usuarios a tabla personal",
            error: e.message || 'Error desconocido'
        });
    }
}

module.exports = controller;