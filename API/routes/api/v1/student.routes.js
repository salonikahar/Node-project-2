const express = require('express')
const routes = express.Router();
const studentCtrl = require('../../../controller/api/v1/studentCtrl')

routes.post('/addStudent',studentCtrl.addStudent);
routes.get('/getStudent',studentCtrl.getStudent);
routes.delete('/deleteStudentData/:id',studentCtrl.deleteStudentData);
routes.put('/updateStudentData/:id',studentCtrl.updateStudentData)

module.exports = routes;