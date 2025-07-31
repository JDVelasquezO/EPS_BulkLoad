import express from 'express';
import bulkLoadController from '../controller/BulkLoadController.js';
import userController from '../controller/UserController.js';
import roleController from '../controller/RoleController.js';
import personalController from '../controller/PersonalController.js';
import teacherController from '../controller/TeacherController.js';
import filesController from '../controller/FilesController.js';

const router = express.Router();

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

router.get('/migrateTeacher', teacherController.migrateTeacher);
router.get('/migrateFiles', filesController.migrateFiles);

export default router;