const conn = require("../config/conn");
const queryUserBulk = require("../database/UserBulk");
const queryCleanUser = require("../database/CleanData");
const controller = {};

controller.bulkLoadUsers = (req, res) => {
    conn.query(queryUserBulk, (err, data) => {
        res.json({
            error: err,
            results: data
        })
    })
}

controller.cleanUsers = (req, res) => {
    conn.query(queryCleanUser, (err, data) => {
        res.json({
            error: err,
            results: data
        })
    })
}

module.exports = controller;