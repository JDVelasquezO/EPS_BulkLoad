const connPromise = require("../config/conn");
const queryInsertRoleByUnity = require("../functions/role/insertRoleByUnities");
const queryInsertEstadoMerito = require("../functions/role/insertEstadoMerito");
const queryDeleteRoleByUnity = require("../functions/role/deleteRoleByUnities");
const {validateAndParseBody} = require("../methods/validateAndParseBody");
const controller = {};

controller.insertRoleByAcademy = async (req, res, next) => {
    try {
        if (!req.body.dependency || !req.body.role) {
            return res.status(400).json({ error: "Los campos 'dependency' y 'role' son obligatorios." });
        }

        let dependencies, role;

        try {
            dependencies = JSON.parse(req.body.dependency);
            role = JSON.parse(req.body.role);

            if (!Array.isArray(dependencies) || dependencies.length === 0) {
                return res.status(400).json({ error: "El campo 'dependency' debe ser un array no vacío." });
            }
        } catch (e) {
            return res.status(400).json({ error: "Formato JSON inválido en 'dependency' o 'role'." });
        }

        const conn = await connPromise;
        let mappedDependencies = dependencies.map(dependency => [dependency]);

        // Primer query para insertar el rol
        const [roleData] = await conn.query(queryInsertRoleByUnity, [role, mappedDependencies]);

        // Segundo query para insertar estadoMerito
        const [estadoMerito] = await conn.query(queryInsertEstadoMerito, [mappedDependencies]);

        console.log(`idAcademy ${dependencies.join(", ")} con idRol ${role} insertados correctamente en usuario_has_rol`);
        console.log(`idAcademy ${dependencies.join(", ")} con idRol ${role} insertados correctamente en estado_merito`);
        res.json({
            error: null,
            results: {
                roleData,
                estadoMerito
            }
        });
    } catch (e) {
        console.error("Error en insertRoleByAcademy:", e);
        res.status(500).json({
            msg: "Error al insertar rol y estado de mérito",
            error: e.message || "Error desconocido"
        });
        next(e);
    }
};

controller.deleteRoleByAcademy = async (req, res) => {
    const parsedData = validateAndParseBody(req, res, ["dependency", "role"]);
    if (!parsedData) return; // Si hubo un error, la respuesta ya se envió.
    const { dependencies, role } = parsedData;

    try {
        const conn = await connPromise;
        const mappedDependencies = dependencies.map(dep => [dep]);

        const [rows] = await conn.query(queryDeleteRoleByUnity, [mappedDependencies, role]);

        console.log(`idAcademy ${dependencies.join(", ")} con idRol ${role} eliminados correctamente en usuario_has_rol`);
        res.json({
            error: null,
            results: `idAcademy ${dependencies.join(", ")} con idRol ${role} eliminados correctamente en usuario_has_rol`,
            affectedRows: rows.affectedRows
        });
    } catch (e) {
        console.error("Error en deleteRoleByAcademy:", e);
        res.status(500).json({
            msg: "Error al eliminar rol por academia",
            error: e.message || "Error desconocido"
        });
    }
}

module.exports = controller;