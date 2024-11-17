const conn = require("../config/conn");
const queryInsertUser = require("../functions/users/insertUser");
const queryInsertUserRol = require("../functions/users/insertUserHasRole");
const queryInsertAcademy = require("../functions/users/insertAcademyHasUser");
const queryInsertUserWithRole = require("../functions/users/insertUserWithRole");
const queryInsertEstadoMerito = require("../functions/role/insertEstadoMerito");
const queryInsertMeritoAndGetDependency = require("../functions/role/insertMeritoAndGetDependency");
const controller = {};

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

controller.insertAcademy = (req, res, next) => {
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
        next(); 
    }
}

controller.insertUserWithRole = (req, res, next) => {
    let users = JSON.parse(req.body.users);
    let role = JSON.parse(req.body.role);
    let mappedUsers = users.map(user => [user]);
    let dataReturn = {};

    try {
        conn.query(queryInsertUserWithRole, [role, mappedUsers], (err, data) => {
            if (err) {
                return res.json({ error: err });
            }

            dataReturn.roleData = data;

            try {
                // Segundo query para insertar estadoMerito
                conn.query(queryInsertMeritoAndGetDependency, [mappedUsers], (err, data) => {
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

module.exports = controller;