const conn = require("../config/conn");
const queryInsertUser = require("../functions/users/insertUser");
const queryInsertUserRol = require("../functions/users/insertUserHasRole");
const queryInsertAcademy = require("../functions/users/insertAcademyHasUser");
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

module.exports = controller;