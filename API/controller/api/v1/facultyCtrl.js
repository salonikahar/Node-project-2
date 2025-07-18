const bcrypt = require('bcrypt')
let facultyModel = require('../../../models/facultyModel');
const jwt = require('jsonwebtoken')

module.exports.registration = async (req, res) => {
    try {
        // console.log(req.body);
        let facultyExsist = await facultyModel.findOne({ email: req.body.email })
        if (!facultyExsist) {
            if (req.body.password == req.body.confrimPassword) {

                req.body.password = await bcrypt.hash(req.body.password, 10);

                let facultyRegister = await facultyModel.create(req.body);
                if (facultyRegister) {
                    return res.status(201).json({
                        'msg': 'faculty register',
                        status: 'success'

                    })
                } else {
                    return res.status(404).json({
                        'msg': 'somthing wrong',
                        status: 'success'

                    })
                }
            } else {
                return res.status(201).json({
                    'msg': 'password not match',
                    status: 'success'

                })
            }
        } else {
            return res.status(201).json({
                'msg': 'faculty already exsist',
                status: 'success'

            })
        }

    } catch {
        return res.status(400).json({
            'msg': 'server error',
            status: 'failed'

        })
    }
}

module.exports.login = async (req, res) => {
    try {
        let facultyExsist = await facultyModel.findOne({ email: req.body.email });

        if (facultyExsist) {
            console.log("Entered password:", req.body.password);
                
            if (await bcrypt.compare(req.body.password, facultyExsist.password)) {
                

                let token = await jwt.sign({ facultyData: facultyExsist }, 'STD', { expiresIn: '1h' });
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
