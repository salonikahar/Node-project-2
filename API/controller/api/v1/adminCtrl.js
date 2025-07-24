const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const adminModel = require('../models/adminModel');

module.exports.login = async (req, res) => {
    try {
        const admin = await adminModel.findOne({ email: req.body.email });
        if (!admin) return res.status(401).json({ msg: 'Invalid admin' });

        const compare = await bcrypt.compare(req.body.password, admin.password);
        if (!compare) return res.status(401).json({ msg: 'Invalid password' });

        const token = jwt.sign(
            { adminData: admin, role: 'admin' },
            'STD',
            { expiresIn: '1h' }
        );

        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
};
