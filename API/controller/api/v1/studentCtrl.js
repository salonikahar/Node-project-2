const studentModel = require('../../../models/studentModel')

module.exports.addStudent = async (req, res) => {
    console.log(req.body);
    let studData = await studentModel.create(req.body);
    if (studData) {
        return res.status(200).json({ 'msg': 'student record inserted', status: 'success', data: studData })
    } else {
        return res.status(400).json({ 'msg': 'somthing wrong', status: 'Rejected' })
    }
};

module.exports.getStudent = async (req, res) => {
    let studentData = await studentModel.find();
    if (studentData) {
        return res.status(200).json({ 'msg': 'student records', data: studentData, 'status': 'success' })
    } else {
        return res.status(400).json({ 'msg': 'student records not found', 'status': 'rejected' })
    }
}

module.exports.deleteStudentData = async (req, res) => {
    try {
        let studentData = await studentModel.findById(req.params.id);
        if (studentData) {
            let deletedData = await studentModel.findByIdAndDelete(req.params.id);
            if (deletedData) {
                return res.status(200).json({'msg': 'Student record deleted successfully',
                    data: deletedData, 'status': 'success'
                });
            } else {
                return res.status(400).json({ 'msg': 'Failed to delete student record', 'status': 'failed' });
            }
        } else {
            return res.status(404).json({ 'msg': 'student records not found', 'status': 'failed' })
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: 'Server error', status: 'failed' });
    }
}

module.exports.updateStudentData = async(req,res) =>{
    try {
        let studentData = await studentModel.findById(req.params.id);
        if (studentData) {
            let updateStudentData = await studentModel.findByIdAndUpdate(req.params.id , req.body);
            if (updateStudentData) {
                return res.status(200).json({'msg': 'Student record updated successfully',
                    data: updateStudentData, 'status': 'success'
                });
            } else {
                return res.status(400).json({ 'msg': 'Failed to updated student record', 'status': 'failed' });
            }
        } else {
            return res.status(404).json({ 'msg': 'student records not found', 'status': 'failed' })
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: 'Server error', status: 'failed' });
    }
}
