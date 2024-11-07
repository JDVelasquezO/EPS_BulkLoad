const conn = require("../config/conn");
const queryUserBulk = require("../database/userBulk");
const queryCleanUser = require("../database/cleanData");
const queryInsertUser = require("../database/insertUser");
const queryInsertDependency = require("../database/insertUserHasRole");
const queryInsertAcademy = require("../database/insertAcademyHasUser");
const queryDeleteDataUser = require("../database/deleteData");
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
                results: "Usuarios cargados en tabla Temp"
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
                results: "Usuarios duplicados y celdas vacías eliminadas"
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
                results: "Usuarios insertados en tabla usuario"
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
                results: "Elimina tabla temporal, usuarios, roles y dependencias agregadas anteriormente"
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
                results: "idUsuario y idRol insertados correctamente en usuario_has_rol"
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
                results: "idUsuario y idUnidadAcademica insertados correctamente en unidad_academica_has_usuario"
            })
        });
    } catch (e) {
        console.log(e);
    }
}

module.exports = controller;