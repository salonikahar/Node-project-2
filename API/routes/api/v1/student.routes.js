const express = require('express')
const routes = express.Router();
const studentCtrl = require('../../../controller/api/v1/studentCtrl')
const studentModel = require("../../../models/studentModel")
const passport = require('passport')
const multer = require('multer')
const {storage} = require('../../../config/storage')
const upload = multer({storage})


routes.post('/addStudent', passport.authenticate('jwt', { failureRedirect: 'api/student/getStudent/failedLogin' }), studentModel.uploadStudentImg, studentCtrl.addStudent);
routes.get('/getStudent', passport.authenticate('jwt', { failureRedirect: 'api/student/getStudent/failedLogin' }), studentCtrl.getStudent);

routes.get('/failedLogin', async (req, res) => {
    return res.status(404).json({ msg: "try to login for faculty ", status: "failed" })
})

routes.delete('/deleteStudentData/:id', studentCtrl.deleteStudentData);
routes.put('/updateStudentData/:id', studentCtrl.updateStudentData)

module.exports = routes;