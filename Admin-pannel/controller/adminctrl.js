const bcrypt = require('bcrypt')
const adminModel = require('../models/adminModel')
const moment = require('moment')
const path = require('path')
const fs = require('fs')
const { log } = require('console')
const nodemailer = require('nodemailer')
const { send } = require('process')


//log-in start

module.exports.login = async (req, res) => {
    try {
        return res.render('login')
    } catch (err) {
        console.log(err);
        return res.redirect('/admin/login');
    }
}

module.exports.adminLogin = async (req, res) => {
    try {
        // console.log(req.body);
        let check = await adminModel.find({ 'email': req.body.email }).countDocuments();
        if (check == 1) {
            let getAdminData = await adminModel.findOne({ email: req.body.email });
            // console.log(getAdminData);
            if (await bcrypt.compare(req.body.password, getAdminData.password)) {
                // console.log(getAdminData);
                // console.log('logIn sucess');

                res.cookie('admin', getAdminData);
                return res.redirect('/admin/dashboard');

            }
            else {
                console.log('Invalid Password');
                return res.redirect('/admin/')
            }
        } else {
            console.log('invalid email');
            return res.redirect('/admin/')
        }

    } catch (err) {
        console.log(err);
        return res.redirect('/admin/')
    }
}

//log-in end

// log-out start

module.exports.logOut = (req, res) => {
    try {
        res.clearCookie('admin');
        console.log('logout suc');
        return res.redirect('/admin/');
    } catch (err) {
        console.log('logout fail');

        console.log(err);
        res.redirect('/admin/dashboard')
    }
}

// log-out end

module.exports.dashboard = (req, res) => {
    if (req.cookies.admin !== undefined) {
        return res.render('dashboard', { adminData: req.cookies.admin });
    } else {
        return res.redirect('/admin/');
    }
};


module.exports.viewAdmin = async (req, res) => {
    let page = 0;

    if (req.query.page) {
        page = req.query.page;
    }

    let search = '';
    if (req.query.searchAdmin) {
        search = req.query.searchAdmin;
    }



    let perPage = 3;
    let adminList = await adminModel.find({
        name: { $regex: search, $options: 'i' }
    }).skip(perPage * page).limit(perPage);

    let countAllAdminData = await adminModel.find({
        name: { $regex: search, $options: 'i' }
    }).countDocuments();
    let totalPage = Math.ceil(countAllAdminData / perPage);

    if (req.cookies.admin !== undefined) {
        return res.render('viewAdmin', { adminList, totalPage, search, page, adminData: req.cookies.admin });
    } else {
        console.log('err');

        return res.redirect('/admin/')
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

        let page = 0;
        let perPage = 3;

        let adminData = [];
        if (search !== '') {
            adminData = await adminModel.find({
                $or: [
                    { name: { $regex: search, $options: 'i' } },
                    { email: { $regex: search, $options: 'i' } },
                    { phone: { $regex: search } }
                ]
            }).skip(perPage * page).limit(perPage);

        } else {
            adminData = await adminModel.find(); // show all admins if no search
        }
        return res.render('viewAdmin', { adminData })

    } catch (err) {
        console.log(err);
        return res.redirect('/admin/viewAdmin');
    }
}

module.exports.addAdmin = (req, res) => {
    if (req.cookies.admin !== undefined) {
        return res.render('addAdmin', { adminData: req.cookies.admin });
    } else {
        return res.redirect('/admin/')
    }
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
            // console.log('Data success');
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
            return res.render('updateAdmin', { singleAdmin, adminData: req.cookies.admin })
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
                // console.log('admin data updated');
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
                // console.log('Delete Success');
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
                // console.log('updated');
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

// password-start

module.exports.changePass = async (req, res) => {
    try {
        return res.render('changePass', { adminData: req.cookies.admin })
    } catch (err) {
        console.log(err);
        return res.redirect('/admin/dashboard');
    }
}

module.exports.changeAdminPass = async (req, res) => {
    try {
        // console.log(req.body);
        let adminData = req.cookies.admin;
        // console.log(adminData);
        if (await bcrypt.compare(req.body.oldpass, adminData.password)) {
            if (req.body.newpass !== req.body.oldpass) {
                if (req.body.newpass === req.body.confrimpass) {
                    let newPassEncrypt = await bcrypt.hash(req.body.newpass, 10);
                    let updateAdminPass = await adminModel.findByIdAndUpdate(adminData._id, { password: newPassEncrypt });
                    if (updateAdminPass) {
                        res.clearCookie('admin');
                        return res.redirect('/admin/');
                    } else {
                        console.log('somthing wrong');

                    }
                } else {
                    console.log("please reEnter Confrim Password");

                }
            } else {
                console.log('new password is same as old');

            }
        } else {
            console.log('password id not match');

        }
        return res.redirect('/admin/changePass');

    } catch (err) {
        console.log(err);
        return res.redirect('/admin/changePass');
    }
}
// password-end changeAdminPass

//fotgot pass start

module.exports.checkMail = async (req, res) => {
    try {
        return res.render('forgot-password/checkMail')
    } catch (err) {
        console.log(err);
        return res.redirect('/admin/')

    }
}

function genrateOTP() {
    let otp = Math.round(Math.random() * 1000000).toString();

    if (otp.length == 6) {
        return newOTP = otp;
    } else {
        genrateOTP();
    }
}

async function sendOtp(email, res) {
    let checkEmail = await adminModel.findOne({ email: email });

    if (!checkEmail) {
        console.log('email not found');
        return { success: false, message: 'Email not registered' };
    }

    let otp = genrateOTP();
    res.cookie('otp', otp)
    res.cookie('email', email)

    // console.log(req.body.email);
    // console.log('email right'); 
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: '7018salonikahar@gmail.com',
            pass: "sphalbrvbofywepp",
        },
    });
    try {
        const info = await transporter.sendMail({
            from: '7018salonikahar@gmail.com',
            to: email,
            subject: "Your OTP is here...",
            text: "OTP", // plain‑text body
            html: `<b>OTP : ${otp}</b>`, // HTML body
        });
        return { success: true };
    } catch (err) {
        console.error('sendOtp error:', err);
        return { success: false, message: err.message };
    }
}



module.exports.sendOtp = async (req, res) => {
        try {
            let response = await sendOtp(req.body.email, res);

            if (response.success) {
                return res.redirect('/admin/otpPage');
            } else {
                console.log(response.false);
                return res.redirect('/admin/checkMail');
            }

        } catch (err) {
            console.log(err);
            return res.redirect('/admin/')

        }
    }

    // 

    module.exports.ResendOtp = async (req, res) => {
        try {
            const email = req.cookies.email;
            if (!email) return res.redirect('/admin/');

            const response = await sendOtp(email, res);
            if (response.success) {
                return res.redirect('/admin/otpPage');
            }
            console.error('OTP send failed:', response.message);
            return res.redirect('/admin/checkMail');

        } catch (err) {
            console.error('ResendOtp catch:', err);
            return res.redirect('/admin/');
        }
    }


    module.exports.otpPage = (req, res) => {
        try {
            return res.render('forgot-password/otpPage');
        } catch (err) {
            console.log('can not genrate otp page');
            return res.redirect('/admin/checkMail')
        }
    }

//fotgot pass end