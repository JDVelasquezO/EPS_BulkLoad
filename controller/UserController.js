const conn = require("../config/conn");
const queryUserBulk = require("../functions/userBulk");
const queryCleanUser = require("../functions/cleanData");
const queryInsertUser = require("../functions/insertUser");
const queryInsertUserRol = require("../functions/insertUserHasRole");
const queryInsertAcademy = require("../functions/insertAcademyHasUser");
const queryInsertRoleByUnity = require("../functions/insertRoleByUnities");
const queryInsertEstadoMerito = require("../functions/insertEstadoMerito");
const queryDeleteDataUser = require("../functions/deleteData");
const queryDeleteRoleByUnity = require("../functions/deleteRoleByUnities");
const controller = {};

controller.bulkLoadUsers = (req, res) => {
    try {
        conn.query("SET GLOBAL local_infile = 1;", (error) => {
            if (error) throw error;
        });

        conn.query(queryUserBulk, (err, data) => {
            if (err) console.log(err);
            res.json({
                error: err,
                results: data
            })
        })
    } catch (e) {
        console.log(e);
    }

}

controller.cleanUsers = (req, res) => {
    try {
        conn.query(queryCleanUser, (err, data) => {
            res.json({
                error: err,
                results: data
            })
        })
    } catch (e) {
        console.log(e);
    }
}

controller.insertUser = (req, res) => {
    try {
        conn.query(queryInsertUser, (err, data) => {
            res.json({
                error: err,
                results: data
            })
        })
    } catch (e) {
        console.log(e);
    }

}

controller.deleteDataUser = (req, res) => {
    try {
        conn.query(queryDeleteDataUser, (err, data) => {
            res.json({
                error: err,
                results: data
            })
        })
    } catch (e) {
        console.log(e);
    }
}

controller.queryInsertUserRol = (req, res) => {
    let dependencies = JSON.parse(req.body.dependency);
    try {
        conn.query(queryInsertUserRol, [dependencies.map(
            dependency => [dependency]
        )], (err, data) => {
            res.json({
                error: err,
                results: data
            })
        });
    } catch (e) {
        console.log(e);
    }
}

controller.insertAcademy = (req, res) => {
    let dependencies = JSON.parse(req.body.dependency);
    try {
        conn.query("SET GLOBAL local_infile = 1;", (error) => {
            if (error) throw error;
        });

        conn.query(queryInsertAcademy, [dependencies.map(
            dependency => [dependency]
        )], (err, data) => {
            if (err) console.log(err);
            res.json({
                error: err,
                results: data
            })
        });
    } catch (e) {
        console.log(e);
    }
}

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