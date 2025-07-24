const studentModel = require('../../../models/studentModel')
//add express-validtor and cloudinary and swagger-ui-express
module.exports.addStudent = async (req, res) => {

    console.log(req.file);
    console.log(req.body);
    
    
    if (req.file) {
        req.body.image = studentModel.imagePath + '/' + req.file.filename;
    }

    let studData = await studentModel.create(req.body);
    if (studData) {
        return res.status(200).json({ 'msg': 'student record inserted', status: 'success', data: studData })
    } else {
        return res.status(400).json({ 'msg': 'somthing wrong', status: 'Rejected' })
    }
};

module.exports.getStudent = async (req, res) => {

    //pagination
    let page = 0;
    if(req.query.page){
        page = req.query.page
    }
    let perPage=2;

    // seraching
    let search = '';
    if (req.query.search) {
        search = req.query.search
    }
    let studentData = await studentModel.find({
        $or: [
            { name: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } }
        ]
    }).skip(page*perPage).limit(perPage);

    let totalRecord = await studentModel.find().countDocuments();
    let totalPage =  Math.ceil(totalRecord/perPage);
    if (studentData) {
        return res.status(200).json({ 'msg': 'student records', data: studentData, 'status': 'success' , currentPage : page , TotalPage : totalPage})
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
                return res.status(200).json({
                    'msg': 'Student record deleted successfully',
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

module.exports.updateStudentData = async (req, res) => {
    try {
        let studentData = await studentModel.findById(req.params.id);
        if (studentData) {
            let updateStudentData = await studentModel.findByIdAndUpdate(req.params.id, req.body);
            if (updateStudentData) {
                return res.status(200).json({
                    'msg': 'Student record updated successfully',
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
