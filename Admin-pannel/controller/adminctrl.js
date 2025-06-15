const bcrypt = require('bcrypt')
const adminModel = require('../models/adminModel')
const moment = require('moment')
const path = require('path')
const fs = require('fs')
const { log } = require('console')

module.exports.dashboard = (req, res) => {
    // console.log('rich')
    return res.render('dashboard')
}

module.exports.viewAdmin = async (req, res) => {

    let adminData = await adminModel.find();
    // console.log(adminData);

    return res.render('viewAdmin', { adminData });
}

module.exports.addAdmin = (req, res) => {
    return res.render('addAdmin');
}

module.exports.insertData = async (req, res) => {
    try {
        // console.log(req.body);
        // console.log(req.file);
        req.body.name = req.body.firstName + " " + req.body.lastName;
        // console.log(name);
        req.body.password = await bcrypt.hash(req.body.password, 10)
        // console.log(req.body.password);
        if (req.file) {

            req.body.profile = adminModel.adminImage + "/" + req.file.filename;
        }
        req.body.created_date = moment().format('DD/MM/YYYY,h:mm:ss a');
        req.body.updated_date = moment().format('DD/MM/YYYY,h:mm:ss a');
        // console.log(req.body.created_date);

        let adminData = await adminModel.create(req.body);

        if (adminData) {
            console.log('Data success');
        } else {
            console.log('somthing Wrong');
        }
        return res.redirect('/admin/addAdmin')
    }
    catch (err) {
        console.log(err);
        return res.redirect('/admin/addAdmin');
    }
}

module.exports.updateAdminDetails = async (req, res) => {
    try {
        // console.log(req.params.id);   
        let adminId = req.params.id;
        let singleAdmin = await adminModel.findById(adminId)
        if (singleAdmin) {
            return res.render('updateAdmin', { singleAdmin })
        } else {
            console.log('record not found.');
            return res.redirect('/admin/viewAdmin')
        }
    } catch (err) {
        console.log(err);
        return res.redirect('/admin/viewAdmin')
    }
}

module.exports.editData = async (req, res) => {
    try {
        // console.log(req.file);
        // console.log(req.body);
        // console.log(req.params.id);
        let oldData = await adminModel.findById(req.params.id)
        if (oldData) {
            if (req.file) {
                try {
                    var imagePath = path.join(__dirname, '..', oldData.profile);
                    await fs.unlinkSync(imagePath);
                } catch (err) {
                    console.log('old image not found');
                }
                req.body.profile = adminModel.adminImage + '/' + req.file.filename;
            }
            let editAdminData = await adminModel.findByIdAndUpdate(req.params.id, req.body);
            if (editAdminData) {
                console.log('admin data updated');
            } else {
                console.log('data not updated');
            }
            return res.redirect('/admin/viewAdmin')
        } else {
            console.log("record not found");
            return res.redirect('/admin/viewAdmin')
        }

    } catch (err) {
        console.log(err);
        return res.redirect('/admin/viewAdmin')
    }
}

module.exports.deleteAdminDetails = async (req, res) => {
    try {

        let id = req.query.adminId;
        let oldAdminData = await adminModel.findById(id);

        if (oldAdminData) {
            try {
                var imgPath = path.join(__dirname, '..', oldAdminData.profile);
                await fs.unlinkSync(imgPath)
            } catch {
                console.log('image not found');
                // return res.redirect('/admin/viewAdmin');
            }

            let deleteAdmin = await adminModel.findByIdAndDelete(oldAdminData);
            if (deleteAdmin) {
                console.log('Delete Success');
            }
            else {
                console.log('not Deleted');
            }

            return res.redirect('/admin/viewAdmin');
        } else {
            console.log('Data not found');
            return res.redirect('/admin/viewAdmin');
        }

    } catch (err) {
        console.log(err);
        return res.redirect('/admin/viewAdmin');
    }
}

module.exports.inactive = async (req, res) => {
    try {
        id = req.params.id;
        // console.log(id);

        let oldData = await adminModel.findById(id);


        if (oldData) {
            let updateStatus = await adminModel.findByIdAndUpdate(id, { status: !oldData.status })
            if (updateStatus) {
                console.log('updated');
            } else {
                console.log('not updated');
            }
        } else {
            console.log('not found');
        }
        return res.redirect('/admin/viewAdmin');

    } catch (err) {
        console.log(err);
        return res.redirect('/admin/viewAdmin');
    }
}

module.exports.searchAdmin = async (req, res) => {
    try {
        // console.log(req.query);

        let search = ''
        if (req.query && req.query.searchAdmin) {
            search = req.query.searchAdmin;
            // console.log(search);
        }

        let adminData = [];
        if (search !== '') {
            adminData = await adminModel.find({
                $or: [
                    { name: { $regex: search, $options: 'i' }},
                    { email: { $regex: search, $options: 'i' }},
                    { phone: { $regex: search}}
                ]
            });
        } else {
            adminData = await adminModel.find(); // show all admins if no search
        }
        return res.render('viewAdmin', { adminData })

    } catch (err) {
        console.log(err);
        return res.redirect('/admin/viewAdmin');
    }
}