const express = require('express');
const router = express.Router();
const bulkLoadController = require('../controller/BulkLoadController');
const userController = require('../controller/UserController');
const roleController = require('../controller/RoleController');
const personalController = require('../controller/PersonalController');

router.get('/', (req, res) => {
    res.json('It works');
});

router.get('/bulkLoadUser', bulkLoadController.bulkLoadUsers);
router.get('/cleanData', bulkLoadController.cleanUsers);
router.get('/deleteDataUser', bulkLoadController.deleteDataUser);
router.get('/insertUser', userController.insertUser);
router.post('/insertAcademy', userController.insertAcademy);
router.post('/insertUserRol', userController.queryInsertUserRol);
router.post('/insertRoleByAcademy', roleController.insertRoleByAcademy);
router.post('/deleteRoleByAcademy', roleController.deleteRoleByAcademy);
router.post('/insertUserWithRole', userController.insertUserWithRole);

router.get('/insertPersonal', personalController.insertPersonal);
router.put('/updatePersonal', personalController.updatePersonal);

module.exports = router;