const conn = require("../config/conn");
const queryUserBulk = require("../database/userBulk");
const queryCleanUser = require("../database/cleanData");
const queryInsertUser = require("../database/insertUser");
const queryInsertDependency = require("../database/insertUserHasRole");
const queryInsertAcademy = require("../database/insertAcademyHasUser");
const queryInsertRoleByUnity = require("../database/insertRoleByUnities");
const queryInsertEstadoMerito = require("../database/insertEstadoMerito");
const queryDeleteDataUser = require("../database/deleteData");
const queryDeleteRoleByUnity = require("../database/deleteRoleByUnities");
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

controller.insertDependency = (req, res) => {
    let dependencies = JSON.parse(req.body.dependency);
    try {
        conn.query(queryInsertDependency, [dependencies.map(
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

controller.insertRoleByAcademy = (req, res) => {
    let dependencies = JSON.parse(req.body.dependency);
    let role = JSON.parse(req.body.role);
    let dataReturn = {};
    // console.log(dependencies, role);
    try {
        conn.query(queryInsertRoleByUnity, [role,
            dependencies.map(
                dependency => [dependency]
                )], (err, data) => {
                    if (err) console.log(err);
                    dataReturn = data;
            });

        conn.query(queryInsertEstadoMerito, [dependencies.map(
            dependency => [dependency]
            )], (err, data) => {
            dataReturn.estadoMerito = data;
            res.json({
                error: err,
                results: dataReturn
            })
        });
    } catch (e) {
        console.log(e);
    }
}

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