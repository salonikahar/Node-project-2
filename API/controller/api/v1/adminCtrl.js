const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const adminModel = require('../../../models/adminModel');

module.exports.addAdmin = async (req, res) => {
    try {
        const existingAdmin = await adminModel.findOne({ email: req.body.email });
        if (existingAdmin) {
            return res.status(401).json({ msg: 'Admin already exists', status: 'conflict' });
        }
         req.body.password = await bcrypt.hash(req.body.password, 10);

        const adminData = await adminModel.create(req.body);


        if (adminData) {
            return res.status(200).json({ 'msg': 'admin record inserted', status: 'success', data: adminData })
        } else {
            return res.status(400).json({ 'msg': 'somthing wrong', status: 'Rejected' })
        }
    } catch (err) {
        console.error("Login Error:", err);
        return res.status(400).json({ msg: 'Server error', status: 'failed' });
    }
}

module.exports.login = async(req,res) =>{
     try {
        let adminExsist = await adminModel.findOne({ email: req.body.email });

        if (adminExsist) {
            console.log("Entered password:", req.body.password);
                
            if (await bcrypt.compare(req.body.password, adminExsist.password)) {
                
                let token = await jwt.sign({ adminData: adminExsist }, 'STD', { expiresIn: '1h' });
                return res.status(200).json({ msg: "login successfully", status: 'success', token })
            } else {
                return res.status(400).json({ msg: 'Invalid password', status: 'failed' });
            }
        } else {
            return res.status(400).json({ msg: 'Invalid email', status: 'failed' });
        }

    } catch (err) {
        console.error("Login Error:", err);
        return res.status(400).json({ msg: 'Server error', status: 'failed' });
    }
}
