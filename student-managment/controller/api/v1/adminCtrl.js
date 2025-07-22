const { stat } = require('fs');
const adminModel = require('../../../model/adminModel');

module.exports.addAdmin = async (req, res) => {
    try {
        // console.log(req.body);
        let adminData = await adminModel.create(req.body);
        if(adminData){
            return res.status(200).json({ 'msg':'Admin Added', status :'success' , data : adminData})
        }else{
            return res.status(400).json({ 'msg': 'somthing wrong', status: 'Rejected' })  
        }

    } catch {
        return res.status(400).json({ 'msg': 'somthing wrong', status: 'Rejected' })
    }
}

module.exports.getAdmin = async (req,res) =>{
    try{
        let adminData = await adminModel.find();
        if(adminData){
            return res.status(200).json({
                'msg':'admin Record' , data : adminData , 'status' : 'success'
            })
        }else{
            return res.status(400).json({ 'msg': 'admin records not found', 'status': 'rejected' })
        }
    }catch{
       return res.status(400).json({ 'msg': 'somthing wrong', status: 'Rejected' }) 
    }
}