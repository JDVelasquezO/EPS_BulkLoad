const conn = require("../config/conn");
const queryInsertRoleByUnity = require("../functions/role/insertRoleByUnities");
const queryInsertEstadoMerito = require("../functions/role/insertEstadoMerito");
const queryDeleteRoleByUnity = require("../functions/role/deleteRoleByUnities");
const controller = {};

controller.insertRoleByAcademy = (req, res, next) => {
    let dependencies = JSON.parse(req.body.dependency);
    let role = JSON.parse(req.body.role);
    let mappedDependencies = dependencies.map(dependency => [dependency]);
    let dataReturn = {};

    try {
        // Primer query para insertar el rol
        conn.query(queryInsertRoleByUnity, [role, mappedDependencies], (err, data) => {
            if (err) {
                return res.json({ error: err });
            }

            dataReturn.roleData = data;

            try {
                // Segundo query para insertar estadoMerito
                conn.query(queryInsertEstadoMerito, [mappedDependencies], (err, data) => {
                    if (err) {
                        return res.json({ error: err });
                    }

                    dataReturn.estadoMerito = data;
                    res.json({
                        error: null,
                        results: dataReturn
                    });
                });
            } catch (e) {
                console.log(e);
                next(e);
            }
        });
    } catch (e) {
        console.log(e);
        next(e);
    }
};


controller.deleteRoleByAcademy = (req, res) => {
    let dependencies = JSON.parse(req.body.dependency);
    let role = JSON.parse(req.body.role);
    // console.log(dependencies, role);
    try {
        conn.query(queryDeleteRoleByUnity, [dependencies.map(
            dependency => [dependency]
        ), role], (err, data) => {
            res.json({
                error: err,
                results: `idAcademy ${dependencies} con idRol ${role} eliminados correctamente 
                en usuario_has_rol`
            })
        });
    } catch (e) {
        console.log(e);
    }
}

module.exports = controller;