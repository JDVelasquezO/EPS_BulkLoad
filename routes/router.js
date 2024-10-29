const express = require('express');
const router = express.Router();
const controller = require('../controller/UserController');

router.get('/', (req, res) => {
    res.json('It works');
});

router.get('/bulkLoadUser', controller.bulkLoadUsers);
router.get('/cleanData', controller.cleanUsers);
router.get('/insertUser', controller.insertUser);

module.exports = router;