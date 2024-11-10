const conn = require("../config/conn");
const queryUserBulk = require("../functions/bulkLoad/userBulk");
const queryCleanUser = require("../functions/bulkLoad/cleanData");
const queryDeleteDataUser = require("../functions/bulkLoad/deleteData");
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

module.exports = controller;