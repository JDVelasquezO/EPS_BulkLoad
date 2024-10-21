const conn = require("../config/conn");
const queryUserBulk = require("../database/UserBulk");
const controller = {};

controller.bulkLoadUsers = (req, res) => {
    conn.query(queryUserBulk, (err, data) => {
        res.json({
            error: err,
            results: data
        })
    })
}

module.exports = controller;