const conn = require("../config/conn");
const queryUserBulk = require("../database/userBulk");
const queryCleanUser = require("../database/cleanData");
const queryInsertUser = require("../database/insertUser");
const queryInsertDependency = require("../database/insertUserHasRole");
const queryDeleteDataUser = require("../database/deleteData");
const controller = {};

controller.bulkLoadUsers = (req, res) => {
    try {
        conn.query(queryUserBulk, (err, data) => {
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

module.exports = controller;