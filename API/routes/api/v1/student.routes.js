const express = require('express')
const routes = express.Router();
const studentCtrl = require('../../../controller/api/v1/studentCtrl')
const studentModel = require("../../../models/studentModel")
const passport = require('passport')

const jwtAuth = passport.authenticate('faculty-jwt', { session: false });

routes.post('/addStudent', jwtAuth, studentModel.uploadStudentImg, studentCtrl.addStudent);
routes.get('/getStudent', jwtAuth , studentCtrl.getStudent);

routes.get('/failedLogin', async (req, res) => {
    return res.status(404).json({ msg: "try to login for faculty ", status: "failed" })
})

routes.delete('/deleteStudentData/:id', studentCtrl.deleteStudentData);
routes.put('/updateStudentData/:id', studentCtrl.updateStudentData)

module.exports = routes;