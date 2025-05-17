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

        console.log(`Usuarios insertados en tabla personal: ${result.length}`);
        res.json({
            error: null,
            results: result.length ? {
                "Usuarios insertados en tabla personal": result,
            } : null,
        });
        // await conn.close();
    } catch (e) {
        console.error("Error al cargar usuarios a tabla personal ", e);
        res.status(500).json({
            msg: "Error al cargar usuarios a tabla personal",
            error: e.message || 'Error desconocido'
        });
    }
}

controller.updatePersonal = async (req, res) => {
    try {
        const conn = await connPromise;

        let personal =  req.body.personal || null;
        let sexo = req.body.sexo || null;
        let email = req.body.email || null;

        if (!personal) {
            return res.status(400).json({ error: "El campo 'personal' es obligatorio." });
        }

        let updates = [];
        let values = [];

        if (sexo) {
            updates.push("sexo = ?");
            values.push(sexo);
        }
        if (email) {
            updates.push("email = ?");
            values.push(email);
        }

        if (updates.length === 0) {
            return res.status(400).json({ error: "Debe proporcionar al menos un campo para actualizar." });
        }

        values.push(personal);
        const query = `UPDATE personal SET ${updates.join(", ")} WHERE registro_personal = ?;`;
        const [rows] = await conn.query(query, values);

        console.log(`Usuarios actualizados en tabla personal: ${rows.affectedRows}`);
        res.json({
            error: null,
            results: {
                "Usuarios actualizados en tabla personal": rows.affectedRows
            },
        });
    } catch (e) {
        console.error("Respuesta inesperada con: ", e);
        res.status(500).json({
            msg: "Error al actualizar usuarios a tabla personal",
            error: e.message || 'Error desconocido'
        });
    }
}

module.exports = controller;