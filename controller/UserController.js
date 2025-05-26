const connPromise = require("../config/conn");
const queryInsertUser = require("../functions/users/insertUser");
const queryInsertUserRol = require("../functions/users/insertUserHasRole");
const queryInsertAcademy = require("../functions/users/insertAcademyHasUser");
const queryInsertUserWithRole = require("../functions/users/insertUserWithRole");
// const queryInsertEstadoMerito = require("../functions/role/insertEstadoMerito");
const queryInsertMeritoAndGetDependency = require("../functions/role/insertMeritoAndGetDependency");
const controller = {};

controller.insertUser = async (req, res) => {
    try {
        const conn = await connPromise;

        const [rows] = await conn.query(queryInsertUser);

        if (!Array.isArray(rows)) {
            console.error("Respuesta inesperada con: ", rows);
            throw new Error("Formato de respuesta inesperado ");
        }

        console.log(`Usuarios insertados en tabla usuarios: ${rows[rows.length -1].affectedRows}`);
        res.json({
            error: null,
            results: rows.length ? {
                "Usuarios insertados en tabla usuarios": rows[rows.length -1].affectedRows,
            } : null,
        });

        // await conn.close();
    } catch (e) {
        console.error("Error al cargar usuarios a tabla usuarios ", e);
        res.status(500).json({
            msg: "Error al cargar usuarios a tabla usuarios",
            error: e
        });
    }

}

controller.queryInsertUserRol = async (req, res) => {
    try {
        if (!req.body.dependency) {
            return res.status(400).json({ error: "El campo 'dependency' es obligatorio." });
        }

        let dependencies;
        try {
            dependencies = JSON.parse(req.body.dependency);
            if (!Array.isArray(dependencies) || dependencies.length === 0) {
                return res.status(400).json({ error: "El campo 'dependency' debe ser un array no vacío." });
            }
        } catch (e) {
            return res.status(400).json({ error: "Formato JSON inválido en 'dependency'." });
        }

        const conn = await connPromise;
        const values = dependencies.map(dependency => [dependency]);
        const [rows] = await conn.query(queryInsertUserRol, [values]);

        console.log(rows[1]);
        const affectedRows = rows[1].affectedRows;

        console.log(`Usuarios insertados en tabla usuario_has_rol: ${affectedRows}`);
        res.json({
            error: null,
            results: {
                "Registros insertados": affectedRows
            }
        });
    } catch (e) {
        console.error("Error al cargar usuarios a tabla usuario_has_rol ", e);
        res.status(500).json({
            msg: "Error al cargar usuarios a tabla usuario_has_rol",
            error: e
        });
    }
}

controller.insertAcademy = async (req, res, next) => {
    try {
        let dependencies = JSON.parse(req.body.dependency);

        const conn = await connPromise;
        await conn.query("SET GLOBAL local_infile = 1;");

        const [rows] = await conn.query(queryInsertAcademy, [dependencies.map(
            dependency => [dependency]
        )]);

        if (!Array.isArray(rows)) {
            console.error("Respuesta inesperada con: ", rows);
            throw new Error("Formato de respuesta inesperado ");
        }

        console.log(`Usuarios insertados en tabla unidad_academica_has_usuario: ${rows[rows.length - 1].affectedRows}`);
        res.json({
            error: null,
            results: rows.length ? {
                "Usuarios insertados en tabla unidad_academica_has_usuario": rows[rows.length - 1].affectedRows,
            } : null,
        });
    } catch (e) {
        console.error("Error al cargar usuarios a tabla unidad_academica_has_usuario ", e);
        res.status(500).json({
            msg: "Error al cargar usuarios a unidad_academica_has_usuario",
            error: e
        });
        next(e);
    }
}

controller.insertUserWithRole = async (req, res, next) => {
    try {
        if (!req.body.users || !req.body.role) {
            return res.status(400).json({ error: "Los campos 'users' y 'role' son obligatorios." });
        }

        let users, role;
        try {
            users = JSON.parse(req.body.users);
            role = JSON.parse(req.body.role);

            if (!Array.isArray(users) || users.length === 0) {
                return res.status(400).json({ error: "El campo 'users' debe ser un array no vacío." });
            }
        } catch (e) {
            return res.status(400).json({ error: "Formato JSON inválido en 'users' o 'role'." });
        }

        const conn = await connPromise;

        const mappedUsers = users.map(user => [user]);
        const [roleData] = await conn.query(queryInsertUserWithRole, [role, mappedUsers]);
        const [estadoMerito] = await conn.query(queryInsertMeritoAndGetDependency, [mappedUsers]);

        console.log(`Usuarios insertados en tabla usuario_has_rol: ${roleData.affectedRows}`);
        console.log(`Usuarios insertados en tabla estado_merito: ${estadoMerito.affectedRows}`);
        res.json({
            error: null,
            results: {
                roleData,
                estadoMerito
            }
        });
    } catch (e) {
        console.error("Error en insertUserWithRole:", e);
        res.status(500).json({
            msg: "Error al insertar usuario con rol y estado de mérito",
            error: e.message || "Error desconocido"
        });
        next(e);
    }
};

module.exports = controller;