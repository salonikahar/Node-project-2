const bcrypt = require('bcrypt')
const adminModel = require('../models/adminModel')

module.exports.dashboard = (req,res)=>{
    // console.log('rich')
    return res.render('dashboard')
}

module.exports.viewAdmin = (req,res)=>{
    return res.render('viewAdmin');
}

module.exports.addAdmin = (req,res)=>{
    return res.render('addAdmin');
}

module.exports.insertData = async (req,res) =>{
    try{
        // console.log(req.body);
        // console.log(req.file);
        req.body.name = req.body.firstName+" "+req.body.lastName;
        // console.log(name);
        req.body.password = await bcrypt.hash(req.body.password, 10)
        // console.log(req.body.password);
        if (req.file){

            req.body.profile = adminModel.adminImage+"/"+req.file.filename;
        } 
        req.body.created_date = 
        
    }
    catch(err){
        console.log(err);
        return res.redirect('/admin/addAdmin');
    }
}